LitGenius.Models.Paper = Backbone.Model.extend({
  urlRoot: '/api/papers',

  annotations: function () {
    this._annotations = this._annotations || new LitGenius.Collections.Annotations();
    return this._annotations;
  },

  comments: function () {
    this._comments = this._comments || new LitGenius.Collections.Comments();
    return this._comments;
  },

  errors: function () {
    this._errors = this._errors || [];
    return this._errors;
  },

  formattedBody: function () {
    var text = this.get('body') || "loading...";
    var formattedText = text.split("\n").join('<p>');
    return formattedText;
  },

  parse: function (response) {
    if (response.annotations) {
      this.annotations().set(response.annotations);
      delete response.annotations;
    }
    if (response.comments) {
      this.comments().set(response.comments);
      delete response.comments;
    }
    if (response.errors) {
      this.errors().set(response.errors);
      delete response.errors;
    }

    return response;
  }
});
