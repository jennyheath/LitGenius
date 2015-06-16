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

    if (response.current_user_id) {
      this.set('current_user_id', response.current_user_id);
    } else {
      this.set('current_user_id', 0);
    }

    return response;
  }
});
