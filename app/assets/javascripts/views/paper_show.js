LitGenius.Views.PaperShow = Backbone.CompositeView.extend({
  template: JST['papers/show'],

  events: {
    "mouseup .paper-body": "addAnnotationForm",
    "mouseup .annotation-pane": "clearAnnotationPane"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  addAnnotationForm: function (event) {
    var collection = LitGenius.Collections.annotations;
    var annotation = new LitGenius.Models.Annotation();

    var selection = window.getSelection();
    var startIndex = selection.baseOffset; // TODO: fix this?
    var endIndex = selection.extentOffset; // TODO: fix this?

    if (selection.toString() === "") {
      this.$('.annotation-pane').html("");
      return;
    }
    var subView = new LitGenius.Views.AnnotationForm({
      collection: collection,
      model: annotation,
      paper: this.model,
      startIndex: startIndex,
      endIndex: endIndex,
      paperView: this
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
    var breakText = 5; // TODO: fix this?

    annotations = annotations.sortBy('start_index');
    annotations.map(function (annotation) {
      var s = annotation.get('start_index');
      var e = annotation.get('end_index');

      var appendText = paperText.slice(breakText, s);
      var tagText = paperText.slice(s, e);
      var appendATag = $("<a />", {
        id : "annotation-tag",
        href: "#",
        text : tagText
      });

      paperElement.append(appendText);
      paperElement.append(appendATag);
      breakText = e;
    });

    var lastTag = annotations[annotations.length - 1].get('end_index');
    var endText = paperText.slice(lastTag);
    paperElement.append(endText);
  },

  clearAnnotationPane: function (event) {
    if (event.target.className !== "annotation-button") {
      if (event.target.parentElement.className !== "annotation-form") {
        if (event.target.parentElement.parentElement.className !== "annotation-form")
          this.$('.annotation-pane').html("");
      }
    }
  },

  render: function () {
    var content = this.template({
      paper: this.model
    });

    this.$el.html(content);
    this.attachSubviews();

    this.addAnnotationTags();
    return this;
  }
});
