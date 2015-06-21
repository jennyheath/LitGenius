LitGenius.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],

  events: {
    "submit form": "submitComment",
    "click .delete-annotation": "destroyAnnotation"
  },

  initialize: function () {
    this.comments = this.model.comments();
    this.listenTo(this.comments, 'add', this.addCommentView);
    this.comments.each(function (comment) {
      this.addCommentView(comment);
    }.bind(this));
  },

  addCommentView: function (model) {
    var comment = this.comments.getOrFetch(model.id, { parse: true });
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

  destroyAnnotation: function (model) {
    event.preventDefault();
    var view = this;

    this.model.destroy({
      success: function () {
        view.remove({ silent: true });
        // TODO: figure out what the fuck is going on here
        $('.annotation-pane').html('');
      }.bind(this)
    });
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
