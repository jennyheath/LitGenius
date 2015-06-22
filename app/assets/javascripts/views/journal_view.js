LitGenius.Views.JournalView = Backbone.View.extend({
  template: JST['root/journal_view'],

  initialize: function (options) {
    this.journal_id = options.journal_id;
    this.papers = new LitGenius.Collections.Papers();
    this.papers.fetch({
      data: { journal: this.journal_id }
    });
    this.listenTo(this.papers, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      paperLinks: this.papers
    });

    this.$el.html(content);
    return this;
  }
});
