LitGenius.Views.NavBar = Backbone.View.extend({
  template: JST['navbar'],
  searchTemplate: JST['search_dropdown'],

  events: {
    "keyup .search-field": "getResults",
    "submit .search-field": "showSearchResults",
    "click .sign-out": "signOut",
    "click .search-result-link": "clearResults",
    "click .field-category": "addFieldView",
    "mouseover .logo": "wink",
    "mouseleave .logo": "unwink",
    "mouseover .profile-icon": "blueBrain",
    "mouseleave .profile-icon": "blackBrain",
    "mouseover .new-paper-link": "blueCross",
    "mouseleave .new-paper-link": "blackCross"
  },

  initialize: function () {
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
    var searched = this.$el.find('input').val();
    if (this.papers.length > 0){
      this.$(".dropdown-box").html(this.searchTemplate({
        papers: this.papers
      }));
      this.$(".search-result-link").each(function (index, link) {
        var findSearched = link.textContent.toLowerCase()
                                           .indexOf(searched.toLowerCase());
        var endOfSearched = findSearched + searched.length;
        var toHighlight = link.textContent.slice(findSearched, endOfSearched);

        var searchContent = link.textContent.replace(toHighlight,
          "<span style='background-color: yellow'>" + toHighlight +
          "</span>");

        searchContent = searchContent.replace("break", "<br>")
                                     .replace("break", "<br>")
                                     .replace("break", "<br>")
                                     .replace("break", "<br>");
        link.innerHTML = searchContent;
        link.style.fontSize = "12px";
      });
    } else {
      this.$('.dropdown-box').empty();
    }
  },

  showSearchResults: function () {
    var searchString = this.$el.find('input').val().replace(" ", "+");
    Backbone.history.navigate("#/search/"+searchString, { trigger: true });
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
  },

  blueCross: function () {
    document.getElementById("newImg").src="assets/blue_cross.png";
  },

  blackCross: function () {
    document.getElementById("newImg").src="assets/cross.png";
  },

  blueBrain: function () {
    document.getElementById("dropdownMenu1").src="assets/blue-profile-icon.png";
  },

  blackBrain: function () {
    document.getElementById("dropdownMenu1").src="assets/profile-icon-2.png";
  },

  wink: function () {
    document.getElementById("logoImg").src="assets/hover-logo.png";
  },

  unwink: function () {
    document.getElementById("logoImg").src="assets/logo-2.png";
  },
});
