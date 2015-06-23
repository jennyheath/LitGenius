LitGenius.Views.ContactView = Backbone.View.extend({
  template: JST['static/contact'],

  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  }
});
