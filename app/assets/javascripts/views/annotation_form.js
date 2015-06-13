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
    this.startIndex = options.startIndex;
    this.endIndex = options.endIndex;
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
        startIndex: this.startIndex,
        endIndex: this.endIndex
      });
    } else {
      content = this.buttonTemplate();
    }

    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    // TODO: call function that checks for overlap of annotations
    this.model.set(attrs.annotation);
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model);
        // this.model.fetch();
        $('.annotation-pane').html("");
      }.bind(this),
      error: function (model, response) {
        this.$el.append(response.responseText);
      }.bind(this)
    });
  }
});
