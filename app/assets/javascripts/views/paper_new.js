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
    // TODO: figure out how to save association models (field, journal, etc)
    this.model.set(attrs.paper);
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model);
        Backbone.history.navigate("", { trigger: true });
      }.bind(this),
      error: function (model, response) {
        this.$el.append(response.responseText);
      }.bind(this)
    });
  }
});
