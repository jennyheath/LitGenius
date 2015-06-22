LitGenius.Views.Footer = Backbone.View.extend({
  template: JST['footer'],

  events: {
    "click .sign-out": "signOut"
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  signOut: function () {
    $.ajax({
      url: "/session",
      method: "delete",
    });
    window.location.replace('session/new');
  }
});
