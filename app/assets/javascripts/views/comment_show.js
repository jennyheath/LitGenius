LitGenius.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],

  events: {
    // "click .up-vote": "upVote",
    // "click .down-vote": "downVote"
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model.votes(), 'add change', this.render);
    this.listenTo(LitGenius.Collections.votes, 'add change', this.render);
  },

  render: function () {
    // var value;
    // if (this.model.get('current_user_vote')) {
    //   value = this.model.get('current_user_vote').value;
    // } else {
    //   value = "null";
    // }

    var content = this.template({
      comment: this.model      
    });

    // voteVal: value
    this.$el.html(content);
    return this;
  },

  downVote: function () {
    var currentVote = this.vote();
    var voteVal = currentVote.value;

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
    var currentVote = this.vote();
    var voteVal = currentVote.value;

    if (voteVal === 0) {
      voteVal = 1;
    } else if (voteVal === -1) {
      voteVal = 1;
    } else if (voteVal === 1) {
      voteVal = 0;
    }

    currentVote.set({value: voteVal});
    currentVote.save();
  },

  vote: function () {
    var currentVoteId = this.model.get('current_user_vote').id;
    var currentVote;
    if (!currentVoteId) {
      currentVote = new LitGenius.Models.Vote({
        user_id: this.model.get('current_user').id,
        comment_id: this.model.id,
        value: 0
      });
      currentVote.save({}, {
        success: function () {
          // this.model.votes().add(currentVote);
          LitGenius.Collections.votes.add(currentVote);
        }
      });
    } else {
      currentVote = LitGenius.Collections.votes.getOrFetch(currentVoteId);
    }

    return currentVote;
  }
});
