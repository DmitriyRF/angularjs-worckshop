(function () {
    angular.module('app', [])
      .controller('app.controller', function () {
        console.log('this', this);
      });

    angular.element(document).ready( () => {
      angular.bootstrap(document, ['app']);
    })
})();
