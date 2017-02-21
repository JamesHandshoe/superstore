(function () {
  'use strict';

  angular
    .module('specials')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('specials', {
        abstract: true,
        url: '/specials',
        template: '<ui-view/>'
      })
      .state('specials.list', {
        url: '',
        templateUrl: 'modules/specials/client/views/list-specials.client.view.html',
        controller: 'SpecialsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Specials List'
        }
      })
      .state('specials.create', {
        url: '/create',
        templateUrl: 'modules/specials/client/views/form-special.client.view.html',
        controller: 'SpecialsController',
        controllerAs: 'vm',
        resolve: {
          specialResolve: newSpecial
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Specials Create'
        }
      })
      .state('specials.edit', {
        url: '/:specialId/edit',
        templateUrl: 'modules/specials/client/views/form-special.client.view.html',
        controller: 'SpecialsController',
        controllerAs: 'vm',
        resolve: {
          specialResolve: getSpecial
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Special {{ specialResolve.name }}'
        }
      })
      .state('specials.view', {
        url: '/:specialId',
        templateUrl: 'modules/specials/client/views/view-special.client.view.html',
        controller: 'SpecialsController',
        controllerAs: 'vm',
        resolve: {
          specialResolve: getSpecial
        },
        data: {
          pageTitle: 'Special {{ specialResolve.name }}'
        }
      });
  }

  getSpecial.$inject = ['$stateParams', 'SpecialsService'];

  function getSpecial($stateParams, SpecialsService) {
    return SpecialsService.get({
      specialId: $stateParams.specialId
    }).$promise;
  }

  newSpecial.$inject = ['SpecialsService'];

  function newSpecial(SpecialsService) {
    return new SpecialsService();
  }
}());
