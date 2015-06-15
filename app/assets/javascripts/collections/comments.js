LitGenius.Collections.Comments = Backbone.Collection.extend({
  model: LitGenius.Models.Comment,
  url: '/api/comments',

  getOrFetch: function (id) {
    var comment = this.get(id);
      comments = this;

    if (!comment) {
      comment = new LitGenius.Models.Comment();
      comment.fetch({
        success: function () {
          comments.add(comment);
        }
      });
    } else {
      comment.fetch();
    }

    return comment;
  }
});
