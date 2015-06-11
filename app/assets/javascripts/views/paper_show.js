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
    var annotation = new LitGenius.Models.Annotation();
    var selection = window.getSelection();
    if (selection.toString() === "") {
      this.$('.annotation-pane').html("");
      return;
    }
    var subView = new LitGenius.Views.AnnotationForm({
      model: annotation,
      paper: this.model,
      selection: selection
    });
    this.addSubview('.annotation-pane', subView);
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
    return this;
  }
});
