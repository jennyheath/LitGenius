LitGenius.Collections.Papers = Backbone.Collection.extend({
  model: LitGenius.Models.Paper,

  url: '/api/papers',

  getOrFetch: function (id) {
    var paper = this.get(id),
      papers = this;

    if (!paper) {
      paper = new LitGenius.Models.Paper({ id: id });
      paper.fetch({
        success: function () {
          papers.add(paper);
        }
      });
    } else {
      paper.fetch();
    }
      return paper;
  }
});

LitGenius.Collections.papers = new LitGenius.Collections.Papers();
