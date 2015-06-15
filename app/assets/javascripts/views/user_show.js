LitGenius.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  getActivity: function () {
    // var user = this.model;
    //
    // var papers = this.model.papers();
    // var annotations = this.model.annotations();
    //
    // var activities = [];
    //
    // papers.each(function (paper) {
    //   activities.push(paper);
    // });
    // annotations.each(function (annotation) {
    //   activities.push(annotation);
    // });

    // return this.sortByAge(activities);
  },

  sortByAge: function (array) {
    // function compare(a, b) {
    //   if (a.get('created_at') > b.get('created_at')) {
    //   // if (a.get('id') > b.get('id')) {
    //     return 1;
    //   } else {
    //     return -1;
    //   }
    // }
    //
    // return array.sort(compare);
  },

  render: function () {
    var content = this.template({
      user: this.model,
      activities: this.model.activities
    });

    this.$el.html(content);
    return this;
  }
});
