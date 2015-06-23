LitGenius.Views.AboutView = Backbone.View.extend({
  template: JST['static/about'],

  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  }
});
