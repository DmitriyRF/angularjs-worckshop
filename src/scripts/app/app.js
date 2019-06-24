(function () {
    'use strict';

    const app = angular.module('app', ['ui.grid']);

    app.controller('app.controller', function ($scope, $http, $timeout) {

        const $ctrl = this;

        $http.get('mockData/100.json')
          .then( response => $timeout( () => response, 3000) )
          .then( response => { $scope.$applyAsync(  $ctrl.gridOptionsRedering.data = response.data ) } );

        $ctrl.gridOptionsRedering = {
          enableFiltering: false,
          rowTemplate: rowTemplate(),
          columnDefs: [
            { name: 'name' },
            { name: 'gender' },
            { name: 'company' }
          ]
        };

        function rowTemplate() {
          return $timeout(() => '<div>' +
              '<div class="ui-grid-cell" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" ui-grid-cell></div>' +
              '</div>'
          , 6000);
        }

      console.log('$ctrl', $ctrl);
    });

    app.component('uiGridWrapper', {
        controller: uiGridWrapperController,
        template: '<div id="uiGridWrapper">' +
            '<div class="grid" ui-grid="$ctrl.gridOptions" ng-if="$ctrl.gridOptions.data"></div>' +
          '</div>',
        bindings: {
          rendering: '<'
        }
      });

    uiGridWrapperController.$inject = ['$scope', '$element', '$http', '$timeout'];

    function uiGridWrapperController($scope, $element, $http, $timeout){
      const $ctrl = this;
      $ctrl.gridOptions = $ctrl.rendering;

      // $ctrl.$onChanges = function onChanges(changesObj){
      //   if(changesObj && changesObj.rendering.currentValue.data !== changesObj.rendering.previousValue.data){
      //     $ctrl.rendering.data = changesObj.rendering.currentValue.data;
      //   }
      // };
      console.log('$ctrl', $ctrl);
    }

    angular.element(document).ready( () => angular.bootstrap(document, ['app']) );

})();
