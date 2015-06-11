LitGenius.Views.AnnotationForm = Backbone.View.extend({
  template: JST['annotations/form'],

  buttonTemplate: JST['annotations/button'],

  events: {
    "click .annotation-button": "showForm",
    "submit form": "submit"
  },

  initialize: function (options) {
    this.buttonState = false;
    this.paper = options.paper;
    this.selection = options.selection;
  },

  showForm: function () {
    this.buttonState = true;
    this.render();
  },

  render: function () {
    var content;
    if (this.buttonState) {
      content = this.template({
        annotation: this.model,
        paper: this.paper,
        selection: this.selection
      });
    } else {
      content = this.buttonTemplate();
    }

    this.$el.html(content);
    return this;
  }
});
