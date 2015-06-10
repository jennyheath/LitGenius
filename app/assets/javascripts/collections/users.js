LitGenius.Collections.Users = Backbone.Collection.extend({
  model: LitGenius.Models.User,

  initialize: function () {
    // add listener on database?
  },

  getOrFetch: function (id) {
    var user = this.get(id),
      users = this;

    if (!user) {
      user = new LitGenius.Models.User({ id: id });
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }
      return user;
  }
});

LitGenius.Collections.users = new LitGenius.Collections.Users();
