LitGenius.Views.FieldView = Backbone.View.extend({
  template: JST['root/field_view'],

  initialize: function (options) {
    this.field = options.field;
    this.on_home_page = options.on_home_page || false;
    this.papers = new LitGenius.Collections.Papers();
    this.papers.fetch({
      data: { field: this.field },
      error: function () {
        console.log('could not fetch');
      }
    });
    this.listenTo(this.papers, "sync", this.render);
  },

  render: function () {
    var content = this.template({
      paperLinks: this.papers.first(),
      on_home_page: this.on_home_page,
      field: this.field
    });

    this.$el.html(content);
    return this;
  }
});
