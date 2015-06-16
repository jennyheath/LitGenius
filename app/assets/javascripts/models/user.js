LitGenius.Models.User = Backbone.Model.extend({
  urlRoot: '/users',

  parse: function (response) {
    if (response.activities) {
      this.set('activities', response.activities);
      delete response.activities;
    }

    return response;
  }
});
