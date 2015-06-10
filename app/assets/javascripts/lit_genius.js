window.LitGenius = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new LitGenius.Routers.Router({
      $rootEl: $('#main')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  LitGenius.initialize();
});
