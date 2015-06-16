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

    if (response.current_user_id) {
      this.set('current_user_id', response.current_user_id);
    } else {
      this.set('current_user_id', 0);
    }

    return response;
  }
});
