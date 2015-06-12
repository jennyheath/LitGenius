LitGenius.Collections.Comments = Backbone.Collection.extend({
  url: '/api/comments',

  getOrFetch: function () {

  }
});

LitGenius.Collections.comments = new LitGenius.Collections.Comments();
