LitGenius.Collections.Users = Backbone.Collection.extend({
  model: LitGenius.Models.User,

  url: '/users',

  getOrFetch: function (id) {
    var user = this.get(id),
      posts = this;
    if(!user) {
      user = new LitGenius.Models.User({ id: id });
      user.fetch({
        success: function () {
          posts.add(user);
        },
      });
    } else {
      user.fetch();
    }
    return user;
  }
});

LitGenius.Collections.users = new LitGenius.Collections.Users();
