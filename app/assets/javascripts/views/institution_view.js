LitGenius.Views.InstitutionView = Backbone.View.extend({
  template: JST['root/institution_view'],

  initialize: function (options) {
    this.institution_id = options.institution_id;
    this.papers = new LitGenius.Collections.Papers();
    this.papers.fetch({
      data: { institution: this.institution_id }
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
