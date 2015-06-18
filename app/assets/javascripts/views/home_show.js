LitGenius.Views.HomeShow = Backbone.View.extend({
  template: JST['root/home'],

  events: {
    "click .field-category-home": "addFieldView",
    "click .category-home": "addHomeView"
  },

  addFieldView: function (event) {
    var field = $(event.target).text();
    var view = new LitGenius.Views.FieldView({
      field: field
    });

    this._swapView(view);
  },

  addHomeView: function (event) {
    var view = new LitGenius.Views.HomeSubView();
    this._swapView(view);
  },

  render: function () {
    var content = this.template();

    this.$el.html(content);
    return this;
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$('.home-page-content').html(view.$el);
    view.render();
  }
});
