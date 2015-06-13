LitGenius.Views.NoAnnotation = Backbone.View.extend({
  template: JST['annotations/no_annotation'],

  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  }
});
