LitGenius.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    var navbar = new LitGenius.Views.NavBar({
      collection: LitGenius.Collections.papers
    });
    $('#navbar').html(navbar.render().$el);
    var footer = new LitGenius.Views.Footer();
    $('#footer').html(footer.render().$el);
  },

  routes: {
    '': 'home',
    'about': 'aboutView',
    'contact': 'contactView',
    'users/:id': 'userShow',
    'users/:id/edit': 'userEdit',
    'papers': 'searchResults',
    'papers/new': 'paperNew',
    'papers/:id': 'paperShow',
    'fields/:name': 'fieldView',
    'authors/:name': 'authorView',
    'journals/:id': 'journalView',
    'institutions/:id': 'institutionView',
    'search/:searchstring': 'searchView'
  },

  aboutView: function () {
    var view = new LitGenius.Views.AboutView();

    this._swapView(view);
    $('body').scrollTop(0);
  },

  authorView: function (name) {
    var view = new LitGenius.Views.AuthorView({
      author_name: name
    });

    this._swapView(view);
  },

  contactView: function () {
    var view = new LitGenius.Views.ContactView();

    this._swapView(view);
    $('body').scrollTop(0);
  },

  home: function () {
    var homeView = new LitGenius.Views.HomeShow();

    this._swapView(homeView);

    var homeSubView = new LitGenius.Views.HomeSubView();
    $('.home-page-content').html(homeSubView.render().$el);
  },

  fieldView: function (name) {
    var view = new LitGenius.Views.FieldView({
      field: name
    });

    this._swapView(view);
  },

  institutionView: function (id) {
    var view = new LitGenius.Views.InstitutionView({
      institution_id: id
    });

    this._swapView(view);
  },

  journalView: function (id) {
    var view = new LitGenius.Views.JournalView({
      journal_id: id
    });

    this._swapView(view);
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

  searchResults: function () {
    var collection = LitGenius.Collections.papers;
    var view = new LitGenius.Views.SearchResults({
      collection: collection
    });

    this._swapView(view);
  },

  searchView: function (searchstring) {
    searchstring = searchstring.replace("+", " ");
    var papers = new LitGenius.Collections.Papers();
    papers.fetch({
      data: { search_params: searchstring }
    });
    var view = new LitGenius.Views.SearchResults({
      collection: papers
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
