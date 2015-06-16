LitGenius.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var user = LitGenius.Collections.users.getOrFetch(this.model.id);
    var content = this.template({
      user: this.model,
      activities: user.get('activities')
    });

    this.$el.html(content);
    return this;
  }
});
