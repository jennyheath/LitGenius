LitGenius.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],

  events: {
    "click .up-vote": "upVote",
    "click .down-vote": "downVote"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.vote_count, 'change', this.render);
  },

  render: function () {
    var content = this.template({
      comment: this.model,
      voteCount: this.model.vote_count
    });

    this.$el.html(content);
    return this;
  },

  downVote: function () {
    var currentVote = this.model.current_user_vote;
    var voteVal = currentVote.get('value');

    if (voteVal === 0) {
      voteVal = -1;
    } else if (voteVal === 1) {
      voteVal = -1;
    } else if (voteVal === -1) {
      voteVal = 0;
    }

    currentVote.set({value: voteVal});
    currentVote.save();
  },

  upVote: function () {
    var currentVote = this.model.current_user_vote;
    var voteVal = currentVote.get('value');

    if (voteVal === 0) {
      voteVal = 1;
    } else if (voteVal === -1) {
      voteVal = 1;
    } else if (voteVal === 1) {
      voteVal = 0;
    }

    currentVote.set({value: voteVal});
    currentVote.save();
  }
});
