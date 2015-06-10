LitGenius.Views.HomeShow = Backbone.View.extend({
  template: JST['root/home'],

  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  }
});
