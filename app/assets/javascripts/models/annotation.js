LitGenius.Models.Annotation = Backbone.Model.extend({
  urlRoot: '/api/annotations',

  comments: function () {
    this._comments = this._comments || new LitGenius.Collections.Comments();
    return this._comments;
  },

  parse: function (response) {
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    return response;
  }
});
