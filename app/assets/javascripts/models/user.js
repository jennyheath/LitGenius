LitGenius.Models.User = Backbone.Model.extend({
  urlRoot: '/users',

  annotations: function () {
    this._annotations = this._annotations || new LitGenius.Collections.Annotations();
    return this._annotations;
  },

  papers: function () {
    this._papers = this._papers || new LitGenius.Collections.Papers();
    return this._papers;
  },

  parse: function (response) {
    // if (response.annotations) {
    //   this.annotations().set(response.annotations);
    //   delete response.annotations;
    // }
    // if (response.papers) {
    //   this.papers().set(response.papers);
    //   delete response.papers;
    // }
    if (response.activities) {
      this.activities = response.activities;
      // delete response.activities;
    }

    return response;
  }
});
