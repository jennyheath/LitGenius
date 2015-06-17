LitGenius.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],
  searchTemplate: JST['search_dropdown'],
  events: {
    "keyup .search-field": "getResults",
    // "submit .search-field": "showResultsPage",
    "click .sign-out": "signOut",
    "click .search-result-link": "clearResults",
    "mouseover .field": "openDropdown",
    "mouseleave .hover-dropdown": "closeDropdown"
  },

  initialize: function(){
    this.papers = new LitGenius.Collections.Papers();
    this.listenTo(this.papers, "sync", this.showResults);
  },

  clearResults: function () {
    this.papers.reset([]);
    this.papers.trigger("sync");
  },

  closeDropdown: function (event) {
    $(event.target).parent().removeClass("open");
  },

  getResults: function (event) {
    if (this.$el.find('input').val() === "") {
      this.papers.reset([]);
      this.papers.trigger("sync");
    } else {
      this.papers.fetch({
        data: { search_params: this.$el.find('input').val() }
      });
    }
  },

  openDropdown: function (event) {
    $(event.target).parent().addClass("open");
  },

  showResults: function () {
    if (this.papers.length > 0){
      this.$(".dropdown-box").html(this.searchTemplate({papers: this.papers}));
    } else {
      this.$('.dropdown-box').empty();
    }
    // Backbone.history.navigate("#/papers", { trigger: true });
  },

  signOut: function () {
    $.ajax({
      url: "/session",
      method: "delete",
    });
    window.location.replace('session/new');
  },

  render: function () {
    var content = this.template({
      currentUserId: CURRENT_USER_ID
    });
    this.$el.html(content);

    return this;
  }
});
