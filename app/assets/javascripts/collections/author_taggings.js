LitGenius.Collections.AuthorTaggings = Backbone.Collection.extend({
  model: LitGenius.Models.AuthorTagging,
  
  url: '/api/author_taggings'
});
