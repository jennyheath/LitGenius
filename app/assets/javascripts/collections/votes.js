LitGenius.Collections.Votes = Backbone.Collection.extend({
  model: LitGenius.Models.Vote,

  url: '/api/votes',

  getOrFetch: function (id) {
    var vote = this.get(id);
      votes = this;

    if (!vote) {
      vote = new LitGenius.Models.Vote();
      vote.fetch({
        success: function () {
          votes.add(vote);
        }
      });
    } else {
      vote.fetch();
    }

    return vote;
  }
});

LitGenius.Collections.votes = new LitGenius.Collections.Votes();
