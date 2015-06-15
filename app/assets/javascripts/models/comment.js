LitGenius.Models.Comment = Backbone.Model.extend({
  className: 'Comment',
  urlRoot: '/api/comments',

  parse: function (response) {
    if (response.current_user_vote) {
      this.current_user_vote = new LitGenius.Models.Vote({
        id: response.current_user_vote.id,
        value: response.current_user_vote.value
      });
    } else {
      this.current_user_vote = new LitGenius.Models.Vote({
        value: 0
      });
    }

    if (response.vote_count) {
      this.vote_count = response.vote_count;
    } else {
      this.vote_count = 0;
    }

    return response;
  }
});
