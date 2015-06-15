LitGenius.Models.Comment = Backbone.Model.extend({
  className: 'Comment',
  urlRoot: '/api/comments',

  parse: function (response) {
    if (response.current_user_vote) {
      this.current_user_vote = new LitGenius.Models.Vote({
        id: response.current_user_vote.id,
        value: response.current_user_vote.value,
        comment_id: this.id
      });
    } else {
      this.current_user_vote = new LitGenius.Models.Vote({
        value: 0,
        comment_id: this.id
      });
    }

    if (response.vote_count) {
      this.set('vote_count', response.vote_count);
    } else {
      this.set('vote_count', 0);
    }

    return response;
  }
});
