LitGenius.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],

  events: {
    "submit form": "submitComment"
  },

  initialize: function () {
    this.comments = this.model.comments();
    this.listenTo(this.comments, 'add', this.addCommentView);
  },

  addCommentView: function (model) {
    var comment = this.comments.getOrFetch(model.id);
    var subView = new LitGenius.Views.CommentShow({
      model: comment
    });

    this.addSubview('.comment-list', subView);
  },

  render: function () {
    this.newComment = new LitGenius.Models.Comment();
    var content = this.template({
      annotation: this.model,
      comment: this.newComment
    });

    this.$el.html(content);
    this.attachSubviews();
    return this;
  },

  submitComment: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    this.newComment.set(attrs.comment);
    this.newComment.save({}, {
      success: function () {
        this.comments.add(this.newComment);
        this.$('#comment').val('');
      }.bind(this)
    });
  }
});
