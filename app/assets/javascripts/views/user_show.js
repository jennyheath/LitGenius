LitGenius.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    LitGenius.Collections.users.getOrFetch(this.model.id, { parse: true });
  },

  events: {
    "mouseover .new-paper-link": "blueCross",
    "mouseleave .new-paper-link": "blackCross"
  },

  blueCross: function () {
    document.getElementById("newPaper").src="assets/blue_cross.png";
  },

  blackCross: function () {
    document.getElementById("newPaper").src="assets/cross.png";
  },

  render: function () {
    var content = this.template({
      user: this.model,
      activities: this.model.get('activities')
    });

    this.$el.html(content);
    $('.timeago').timeago();
    return this;
  }
});
