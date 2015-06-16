LitGenius.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    LitGenius.Collections.users.getOrFetch(this.model.id, { parse: true });
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
