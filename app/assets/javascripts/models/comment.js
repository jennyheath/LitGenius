LitGenius.Models.Comment = Backbone.Model.extend({
  urlRoot: '/api/comments',

  votes: function () {
    this._votes = this._votes || new LitGenius.Collections.Votes();
    return this._votes;
  },

  parse: function (response) {
    if (response.votes) {
      this.votes().set(response.votes);
      delete response.votes;
    }

    return response;
  }
});
