LitGenius.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],

  events: {
    "submit form": "submitComment",
    "click .delete-annotation": "destroyAnnotation",
    "click .more-comments": "showMoreComments"
  },

  initialize: function () {
    this.comments = this.model.comments();
    this.invisibleComments = [];

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.comments, 'add', this.addCommentView);
    this.listenTo(this.comments, 'add', this.render);

    var visibleComments = 0;
    this.comments.each(function (comment) {
      visibleComments += 1;
      if (visibleComments <= 3) {
        this.addCommentView(comment);
      } else {
        this.invisibleComments.push(comment);
      }
    }.bind(this));
  },

  addCommentView: function (model) {
    var comment = this.comments.getOrFetch(model.id, { parse: true });
    var subView = new LitGenius.Views.CommentShow({
      model: comment,
      parentView: this
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
    this.onRender();
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

  onRender: function () {
    var hidden = this.invisibleComments.length;
    if (hidden > 0) {
      this.$('.comment-list')
          .append($('<button>')
          .addClass("more-comments")
          .text("show " + hidden.toString() + " more comments..."));  
    }
  },

  showMoreComments: function () {
    this.$('.more-comments').remove();
    this.invisibleComments.forEach(function (comment) {
      this.addCommentView(comment);
    }.bind(this));
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
