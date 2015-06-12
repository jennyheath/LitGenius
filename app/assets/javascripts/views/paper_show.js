LitGenius.Views.PaperShow = Backbone.CompositeView.extend({
  template: JST['papers/show'],

  events: {
    "mouseup .paper-body": "addAnnotationForm",
    "mouseup .annotation-pane": "clearAnnotationPane",
    "click .annotation-tag": "addAnnotationShow",
    "submit .paper-comment-form": "submitComment"
  },

  initialize: function () {
    this.comments = this.model.comments();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.annotations(), 'add', this.addAnnotationTags);
    this.listenTo(this.comments, 'add', this.addCommentView);
  },

  addAnnotationForm: function (event) {
    this.$('.annotation-pane').html("");
    if (window.getSelection().toString().length === 0) {
      return;
    }
    var collection = this.model.annotations();
    var annotation = new LitGenius.Models.Annotation();

    var selection = this.selectionHTML();
    var startIndex = selection.offsets.start - 7;
    var endIndex = selection.offsets.end - 7;
    // debugger;

    if (selection.toString() === "") {
      this.$('.annotation-pane').html("");
      return;
    }
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

  selectionHTML: function (container) {
    // debugger;
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
    var comment = this.comments.getOrFetch(model.id);
    var subView = new LitGenius.Views.CommentShow({
      model: comment
    });

    this.addSubview('.paper-comment-list', subView);
  },

  clearAnnotationPane: function (event) {
    if (event.target.className === "annotation-pane") {
      this.$('.annotation-pane').html("");
    }
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
    return this;
  },

  submitComment: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    this.newComment.set(attrs.comment);
    this.newComment.save({}, {
      success: function () {
        this.comments.add(this.newComment);
        this.$('.paper-comment-form').val('');
        this.render();
      }.bind(this)
    });
  }
});
