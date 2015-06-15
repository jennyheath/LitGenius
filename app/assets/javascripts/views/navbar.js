LitGenius.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],

  events: {
    "keyup .search-field": "getResults",
    "focus": "showResults",
    "click .sign-out": "signOut"
  },

  getResults: function (event) {
    if (this.$el.find('input').val() === "") {
      $('#main').html('');
      return;
    }

    this.collection.fetch({
      data: { search_params: this.$el.find('input').val() }
    });

    this.showResults();
  },

  showResults: function () {
    Backbone.history.navigate("#/papers", { trigger: true });
  },

  signOut: function () {
    $.ajax({
      url: "/session",
      method: "delete",
    });
    window.location.replace('session/new');
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
