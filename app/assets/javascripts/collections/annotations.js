LitGenius.Collections.Annotations = Backbone.Collection.extend({
  model: LitGenius.Models.Annotation,
  url: '/api/annotations',

  getOrFetch: function (id) {
    var annotation = this.get(id),
      annotations = this;

    if (!annotation) {
      annotation = new LitGenius.Models.Annotation({ id: id });
      annotation.fetch({
        success: function () {
          annotations.add(annotation);
        }
      });
    } else {
      annotation.fetch();
    }
      return annotation;
  }
});

LitGenius.Collections.annotations = new LitGenius.Collections.Annotations();
