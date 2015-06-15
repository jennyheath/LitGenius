LitGenius.Collections.Votes = Backbone.Collection.extend({
  model: LitGenius.Models.Vote,

  url: '/api/votes'
});
