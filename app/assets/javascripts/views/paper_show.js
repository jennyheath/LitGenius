LitGenius.Views.PaperShow = Backbone.CompositeView.extend({
  template: JST['papers/show'],

  events: {
    "mouseup .paper-body": "addAnnotationForm",
    "mouseup .annotation-pane": "clearAnnotationPane",
    "mouseup .paper-comment-form": "clearAnnotationPane",
    "click .annotation-tag": "addAnnotationShow",
    "submit .paper-comment-form": "submitComment",
    "click .delete-paper": "destroyPaper"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.annotations(), 'add', this.addAnnotationTags);
    this.listenTo(this.model.annotations(), 'remove', this.render);
    this.listenTo(this.model.comments(), 'add', this.addCommentView);
  },

  addAnnotationForm: function (event) {
    this.$('.annotation-pane').html("");
    if (window.getSelection().toString().length === 0) {
      if (this.highlightSpan) {
        var text = $('span').text();
        $('span').replaceWith(text);
      }
      return;
    }
    var collection = this.model.annotations();
    var annotation = new LitGenius.Models.Annotation();

    var selection = this.selectionHTML(document.getElementsByClassName('paper-body')[0]);
    var startIndex = selection.offsets.start;
    var endIndex = selection.offsets.end;

    this.annotation_overlaps = false;
    this.overlappingAnnotation(startIndex, endIndex);
    if (this.annotation_overlaps === true) {
      var noAnnotation = new LitGenius.Views.NoAnnotation();
      this.$('.annotation-pane').html(noAnnotation.render().$el);
      return;
    }

    var highlight = window.getSelection();
    this.highlightRange = highlight.getRangeAt(0);
    this.highlightSpan = document.createElement("span");
    this.highlightRange.surroundContents(this.highlightSpan);
    this.highlightSpan.style.backgroundColor = "#91E4D4";

    var subView = new LitGenius.Views.AnnotationForm({
      collection: collection,
      model: annotation,
      paper: this.model,
      startIndex: startIndex,
      endIndex: endIndex
    });
    this.addSubview('.annotation-pane', subView);
  },

  addAnnotationShow: function (event) {
    this.$('.annotation-pane').html("");

    var annotationId = $(event.target).data('id');
    var annotation = this.model.annotations().getOrFetch(annotationId);

    var subView = new LitGenius.Views.AnnotationShow({
      model: annotation
    });

    this.addSubview('.annotation-pane', subView);
  },

  addAnnotationTags: function () {
    var annotations = this.model.annotations();
    if (annotations.length === 0) {
      return;
    }

    var paperText = this.$('.paper-body').text();
    this.$('.paper-body').html("");
    var paperElement = this.$('.paper-body');
    var breakText = 0;

    annotations = annotations.sortBy('start_index');
    annotations.map(function (annotation) {
      var s = annotation.get('start_index');
      var e = annotation.get('end_index');

      var appendText = paperText.slice(breakText, s);
      var tagText = paperText.slice(s, e);
      var appendATag = $("<a />", {
        class : "annotation-tag",
        text : tagText
      }).data('id', annotation.id);

      paperElement.append(appendText);
      paperElement.append(appendATag);
      breakText = e;
    });

    var lastTag = annotations[annotations.length - 1].get('end_index');
    var endText = paperText.slice(lastTag);
    paperElement.append(endText);
  },

  addCommentView: function (model) {
    var comment = this.model.comments().getOrFetch(model.id);
    var subView = new LitGenius.Views.CommentShow({
      model: comment
    });

    this.addSubview('.paper-comment-list', subView);
  },

  clearAnnotationPane: function (event) {
    if (event.target.className === "annotation-pane col-full-height") {
      this.$('.annotation-pane').html("");
    }

    if (this.highlightSpan) {
      if (event.target.className === "annotation-button" ||
          event.target.className === "annotation-form-body" ||
          event.target.className === "submit-annotation") {
        return;
      }
      var text = $('span').text();
      $('span').replaceWith(text);
    }
  },

  destroyPaper: function (event) {
    event.preventDefault();
    var answer = confirm("Are you sure you want to remove this paper? (all of its annotations and comments will be lost)");
    if (answer === true) {
      var view = this;

      this.model.destroy({
        success: function () {
          view.remove();
          Backbone.history.navigate("#", { trigger: true });
        }
      });
    }
  },

  overlappingAnnotation: function (startIndex, endIndex) {
    var annotations = this.model.annotations();

    annotations.each(function (annotation) {
      var compareStart = annotation.get('start_index');
      var compareEnd = annotation.get('end_index');

      if (startIndex >= compareStart && startIndex <= compareEnd) {
        this.annotation_overlaps = true;
      } else if (endIndex >= compareStart && endIndex <= compareEnd) {
        this.annotation_overlaps = true;
      } else if (startIndex <= compareStart && endIndex >= compareEnd) {
        this.annotation_overlaps = true;
      }
    }.bind(this));
  },

  render: function () {
    this.newComment = new LitGenius.Models.Comment();
    var content = this.template({
      paper: this.model,
      comment: this.newComment
    });

    this.$el.html(content);
    this.attachSubviews();
    this.addAnnotationTags();

    if (this.model.comments().length === 0) {
      $('.paper-comment-list').append($('<h6>').text("This paper has no comments."));
    }
    $('[data-toggle="tooltip"]').tooltip();
    return this;
  },

  selectionHTML: function (container) {
    var selection = rangy.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        return {
            offsets: range.toCharacterRange(container),
            html: range.toHtml()
        };
    }
    return null;
  },

  submitComment: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    this.newComment.set(attrs.comment);
    this.newComment.save({}, {
      success: function () {
        this.model.comments().add(this.newComment);
        this.$('.paper-comment-form').val('');
        this.render();
        this.$('.annotation-pane').html("");
      }.bind(this)
    });
  }
});
