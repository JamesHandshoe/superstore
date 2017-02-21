// Specials service used to communicate Specials REST endpoints
(function () {
  'use strict';

  angular
    .module('specials')
    .factory('SpecialsService', SpecialsService);

  SpecialsService.$inject = ['$resource'];

  function SpecialsService($resource) {
    return $resource('api/specials/:specialId', {
      specialId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
