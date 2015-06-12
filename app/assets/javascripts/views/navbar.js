LitGenius.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],

  events: {
    "keyup .search-field": "getResults",
    "focus": "showResults"
  },

  getResults: function (event) {
    if (this.$el.find('input').val() === "") {
      $('#main').html('');
      return;
    }

    this.collection.fetch({
      data: { search: this.$el.find('input').val() }
    });

    this.showResults();
  },

  showResults: function () {
    Backbone.history.navigate("#/papers", { trigger: true });
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
