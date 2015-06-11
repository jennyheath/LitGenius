LitGenius.Models.Paper = Backbone.Model.extend({
  urlRoot: '/api/papers',

  annotations: function () {
    this._annotations = this._annotations || new LitGenius.Collections.Annotations();
    return this._annotations;
  },

  parse: function (response) {
    if (response.annotations) {
      this.annotations().set(response.annotations);
      delete response.annotations;
    }
    return response;
  }
});
