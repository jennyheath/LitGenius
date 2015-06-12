LitGenius.Views.SearchResults = Backbone.View.extend({
  template: JST['papers/search'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      papers: this.collection
    });

    this.$el.html(content);
    return this;
  }
});
