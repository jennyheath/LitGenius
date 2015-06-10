LitGenius.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'users/:id': 'usershow'
  },

  home: function () {
    var homeView = new LitGenius.Views.HomeShow();

    this._swapView(homeView);
  },

  usershow: function (id) {
    var user = User.getOrFetch(id);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
