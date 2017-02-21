(function () {
  'use strict';

  // Specials controller
  angular
    .module('specials')
    .controller('SpecialsController', SpecialsController);

  SpecialsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'specialResolve'];

  function SpecialsController ($scope, $state, $window, Authentication, special) {
    var vm = this;

    vm.authentication = Authentication;
    vm.special = special;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Special
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.special.$remove($state.go('specials.list'));
      }
    }

    // Save Special
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.specialForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.special._id) {
        vm.special.$update(successCallback, errorCallback);
      } else {
        vm.special.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('specials.view', {
          specialId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
