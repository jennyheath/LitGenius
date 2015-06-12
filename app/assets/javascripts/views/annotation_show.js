LitGenius.Views.AnnotationShow = Backbone.View.extend({
  template: JST['annotations/show'],

  render: function () {
    var content = this.template({
      annotation: this.model
    });

    this.$el.html(content);
    return this;
  }
});
