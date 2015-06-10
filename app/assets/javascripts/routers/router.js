LitGenius.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'users/:id': 'userShow',
    'users/:id/edit': 'userEdit'
  },

  home: function () {
    var homeView = new LitGenius.Views.HomeShow();

    this._swapView(homeView);
  },

  userEdit: function (id) {
    var user = LitGenius.Collections.users.getOrFetch(id);

    var view = new LitGenius.Views.UserEdit({
      model: user
    });

    this._swapView(view);
  },

  userShow: function (id) {
    var user = LitGenius.Collections.users.getOrFetch(id);

    var view = new LitGenius.Views.UserShow({
      model: user
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
