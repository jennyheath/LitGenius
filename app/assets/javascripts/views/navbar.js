LitGenius.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],
  searchTemplate: JST['search_dropdown'],
  // homeTemplate: JST['root/home'],

  events: {
    "keyup .search-field": "getResults",
    // "submit .search-field": "showResults",
    "click .sign-out": "signOut",
    "click .search-result-link": "clearResults",
    "click .field-category": "addFieldView"
  },

  initialize: function(){
    this.papers = new LitGenius.Collections.Papers();
    this.listenTo(this.papers, "sync", this.showResults);
  },

  addFieldView: function (event) {
    var field = $(event.target).text().replace(" ", "");

    Backbone.history.navigate("#/fields/"+field, { trigger: true });
  },

  addHomeView: function () {
    var view = new LitGenius.Views.HomeShow();

    $('#main').html(view.render().$el);
  },

  clearResults: function () {
    this.papers.reset([]);
    this.papers.trigger("sync");
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

  showResults: function () {
    if (this.papers.length > 0){
      this.$(".dropdown-box").html(this.searchTemplate({ papers: this.papers }));
    } else {
      this.$('.dropdown-box').empty();
    }
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
