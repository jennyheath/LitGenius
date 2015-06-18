LitGenius.Views.FieldView = Backbone.View.extend({
  template: JST['root/field_view'],

  initialize: function (options) {
    this.field = options.field;
    this.papers = new LitGenius.Collections.Papers();
    this.papers.fetch({
      data: { field: this.field }
    });
    this.listenTo(this.papers, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      paperLinks: this.papers
    });

    this.$el.html(content);
    return this;
  }
});
