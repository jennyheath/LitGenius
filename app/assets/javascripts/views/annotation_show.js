LitGenius.Views.AnnotationShow = Backbone.View.extend({
  template: JST['annotations/show'],

  events: {
    "submit form": "submitComment"
  },

  initialize: function () {
    // this.listenTo(LitGenius.Collections.comments, 'add', this.render);
  },

  render: function () {
    this.newComment = new LitGenius.Models.Comment();
    var content = this.template({
      annotation: this.model,
      comment: this.newComment
    });

    // var commentForm = new LitGenius.Views.CommentForm();
    this.$el.html(content);

    // this.$el.append(commentForm);
    // this.$('.annotation-show').append(commentForm);
    return this;
  },

  submitComment: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    var comments = LitGenius.Collections.comments;
    this.newComment.set(attrs.comment);
    this.newComment.save({}, {
      success: function () {
        comments.add(this.newComment);
        // TODO: render comment
      }.bind(this)
    });
  }
});
