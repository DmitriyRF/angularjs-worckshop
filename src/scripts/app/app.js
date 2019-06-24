(function () {
    'use strict';

    const app = angular.module('app', ['ui.grid']);

    app.controller('app.controller', function ($scope, $http, $timeout) {

        const $ctrl = this;

        $http.get('mockData/100.json')
          .then( response => $timeout( () => response, 1000) )
          .then( response => { $scope.$applyAsync(  $ctrl.gridOptionsRedering.data = response.data ) } );

        $ctrl.gridOptionsRedering = {
          enableFiltering: false,
          rowTemplate: rowTemplate(),
          height: 70,
          columnDefs: [
            { name: 'name' },
            { name: 'gender' },
            { name: 'company' }
          ]
        };

        function rowTemplate() {
          return $timeout(() => '<timecard-cell container="colContainer" col="colContainer.renderedColumns" row="row"></timecard-cell>', 2000);
        }
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

    app.component('timecardCell', {
        controller: timecardCellController,
        template: '<div class="ui-grid-cell" ng-repeat="cell in col" ui-grid-cell></div>',
        bindings: {
          row: '<',
          col: '<',
          container: '<'
        }
      });

    uiGridWrapperController.$inject = ['$scope', '$element', '$http', '$timeout'];

    function uiGridWrapperController(){
      const $ctrl = this;
      $ctrl.gridOptions = $ctrl.rendering;

      // $ctrl.$onChanges = function onChanges(changesObj){
      //   if(changesObj && changesObj.rendering.currentValue.data !== changesObj.rendering.previousValue.data){
      //     $ctrl.rendering.data = changesObj.rendering.currentValue.data;
      //   }
      // };
    }

    function timecardCellController(){
      console.log('$ctrl in timecardCellController', this);
    }

    angular.element(document).ready( () => angular.bootstrap(document, ['app']) );

})();
