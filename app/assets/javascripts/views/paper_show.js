LitGenius.Views.PaperShow = Backbone.View.extend({
  template: JST['papers/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({
      paper: this.model
    });

    this.$el.html(content);
    return this;
  }
});
