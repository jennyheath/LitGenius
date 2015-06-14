LitGenius.Collections.Fields = Backbone.Collection.extend({
  model: LitGenius.Models.Field,

  url: '/api/fields',

  getOrFetchId: function (name) {
    var field = this.find(function(model) { return model.get('name') === name; });
    var fields = this;

    if (!field) {
      field = new LitGenius.Models.Field({ name: name });
      field.fetch({
        success: function () {
          fields.add(field);
        }
        // error: function () {
        //   field.save({name: name}, {
        //     success: function () {
        //       fields.add(field);
        //     }
        //   });
        // }
      });
    } else {
      field.fetch();
    }

    return field.id;
  }
});

LitGenius.Collections.fields = new LitGenius.Collections.Fields();
