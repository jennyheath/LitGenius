LitGenius.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],

  events: {
    "click .up-vote": "upVote",
    "click .down-vote": "downVote",
    "click .delete-comment": "destroyComment",
    "mouseover .up-vote": "blueUp",
    "mouseleave .up-vote": "blackUp",
    "mouseover .down-vote": "blueDown",
    "mouseleave .down-vote": "blackDown"
  },

  initialize: function (options) {
    this.parentView = options.parentView;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'change:vote_count', this.render);
  },

  render: function () {
    var votes = this.model.get('vote_count') || 0;

    var content = this.template({
      comment: this.model,
      voteCount: votes
    });

    this.$el.html(content);
    return this;
  },

  destroyComment: function (model) {
    event.preventDefault();
    var view = this;
    this.$('.comment').addClass("deleting");

    this.model.destroy({
      success: function () {
        this.$('.comment').addClass("deleted");
        setTimeout(function () {
          view.remove();
          this.parentView.removeSubview('.comment-list', this);
        }.bind(this), 0);
      }.bind(this)
    });
  },

  downVote: function () {
    var currentVote = this.model.current_user_vote;
    var voteVal = currentVote.get('value');
    var initialVal = voteVal;

    if (voteVal === 0) {
      voteVal = -1;
    } else if (voteVal === 1) {
      voteVal = -1;
    } else if (voteVal === -1) {
      voteVal = 0;
    }

    var netVoteDiff = voteVal - initialVal;
    currentVote.set({value: voteVal});
    currentVote.save({}, {
      success: function () {
        this.updateVoteCount(netVoteDiff);
      }.bind(this)
    });
  },

  upVote: function () {
    var currentVote = this.model.current_user_vote;
    var voteVal = currentVote.get('value');
    var initialVal = voteVal;

    if (voteVal === 0) {
      voteVal = 1;
    } else if (voteVal === -1) {
      voteVal = 1;
    } else if (voteVal === 1) {
      voteVal = 0;
    }

    var netVoteDiff = voteVal - initialVal;
    currentVote.set({value: voteVal});
    currentVote.save({}, {
      success: function () {
        this.updateVoteCount(netVoteDiff);
      }.bind(this)
    });
  },

  updateVoteCount: function (voteVal) {
    var currentVoteCount = this.model.get('vote_count');
    if (currentVoteCount) {
      this.model.set({vote_count: currentVoteCount + voteVal});
    } else {
      this.model.set({vote_count: voteVal});
    }
  },

  blueUp: function (event) {
    event.target.src="assets/blue_thumbs_up.png";
  },

  blackUp: function (event) {
    event.target.src="assets/thumbs_up.png";
  },

  blueDown: function (event) {
    event.target.src="assets/blue_thumbs_down.png";
  },

  blackDown: function (event) {
    event.target.src="assets/thumbs_down.png";
  }
});
