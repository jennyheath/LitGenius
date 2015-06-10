LitGenius.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '': 'home',
    'users/:id': 'userShow',
    'users/:id/edit': 'userEdit',
    'papers/new': 'paperNew',
    'papers/:id': 'paperShow'
  },

  home: function () {
    var homeView = new LitGenius.Views.HomeShow();

    this._swapView(homeView);
  },

  paperNew: function () {
    var paper = new LitGenius.Models.Paper();
    var papers = LitGenius.Collections.papers;

    var view = new LitGenius.Views.PaperNew({
      model: paper,
      collection: papers
    });

    this._swapView(view);
  },

  paperShow: function (id) {
    var paper = LitGenius.Collections.papers.getOrFetch(id);

    var view = new LitGenius.Views.PaperShow({
      model: paper
    });

    this._swapView(view);
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
    this.$rootEl.html(view.$el);
    view.render();
  }
});
