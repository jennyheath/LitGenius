LitGenius.Views.PaperNew = Backbone.View.extend({
  template: JST['papers/new'],

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var content = this.template({
      paper: this.model
    });

    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).serializeJSON();
    this.model.save(attrs, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("#/papers/"+this.model.id, { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.$el.append(response.responseText);
      }.bind(this)
    });
  }
});
