LitGenius.Collections.Authors = Backbone.Collection.extend({
  model: LitGenius.Models.Author,

  url: '/api/authors',

  getOrFetchId: function (name) {
    var author = this.find(function(model) { return model.get('name') === name; });
    var authors = this;

    if (!author) {
      author = new LitGenius.Models.Author({ name: name });
      author.fetch({
        success: function () {
          authors.add(author);
        },
        error: function () {
          author.save({name: name}, {
            success: function () {
              authors.add(author);
            }
          });
        }
      });
    } else {
      author.fetch();
    }

    return author.id;
  }
});

LitGenius.Collections.authors = new LitGenius.Collections.Authors();
