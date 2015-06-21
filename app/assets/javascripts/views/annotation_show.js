LitGenius.Views.AnnotationShow = Backbone.CompositeView.extend({
  template: JST['annotations/show'],

  events: {
    "submit form": "submitComment",
    "click .delete-annotation": "destroyAnnotation"
  },

  initialize: function () {
    this.comments = this.model.comments();
    this.hiddenComments = [];
    this.listenTo(this.comments, 'add', this.addCommentView);
    this.listenTo(this.comments, 'add', this.render);

    this.comments.each(function (comment) {
      this.addCommentView(comment);
    }.bind(this));
    // this.listenTo(this.model, 'change', this.render, this.limitComments);
  },

  addCommentView: function (model) {
    // var numComments = $('ul.comment-list li').length;
    //
    // if (numComments === 3) {
    //   this.hiddenComments.push(model);
    //   if (numComments + this.hiddenComments.length === this.comments.length) {
    //     $('.comment-list').append($('<div>').text("show "+this.hiddenComments.length+" more comment(s)"));
    //   }
    //   return;
    // }

    var comment = this.comments.getOrFetch(model.id, { parse: true });
    var subView = new LitGenius.Views.CommentShow({
      model: comment
    });

    this.addSubview('.comment-list', subView);
  },

  // limitComments: function () {
  //   var numComments = $('ul.comment-list li').length;
  //   var hiddenComments = 0;
  //
  //   if (numComments > 3) {
  //     while (numComments > 3) {
  //       $('.comment-list li:last').remove();
  //       hiddenComments += 1;
  //       numComments = $('ul.comment-list li').length;
  //     }
  //   }
  //
  //   if (hiddenComments > 0) {
  //     $('.comment-list').append($('<div>').text("show "+hiddenComments+" more comment(s)"));
  //   }
  // },

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
