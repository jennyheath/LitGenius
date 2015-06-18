LitGenius.Views.HomeSubView = Backbone.View.extend({
  template: JST['root/home_subview'],

  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  }
});
