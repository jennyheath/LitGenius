LitGenius.Views.AuthorView = Backbone.View.extend({
  template: JST['root/author_view'],

  initialize: function (options) {
    this.author_name = options.author_name.replace("-", " ");
    this.papers = new LitGenius.Collections.Papers();
    this.papers.fetch({
      data: { author: this.author_name }
    });

    this.listenTo(this.papers, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      paperLinks: this.papers,
      author_name: this.author_name
    });

    this.$el.html(content);
    return this;
  }
});
