(function () {
  'use strict';

  // Departments controller
  angular
    .module('departments')
    .controller('DepartmentsController', DepartmentsController);

  DepartmentsController.$inject = ['$scope', '$state', 'Authentication', 'departmentResolve', '$resource', 'EmployeesService', 'ProductsService'];

  function DepartmentsController ($scope, $state, Authentication, department, $resource, EmployeesService, ProductsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.department = department;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.products = ProductsService.query();
    vm.employees = EmployeesService.query();

    // Remove existing Department
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.department.$remove($state.go('departments.list'));
      }
    }

    // Save Department
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.departmentForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.department._id) {
        vm.department.$update(successCallback, errorCallback);
      } else {
        vm.department.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('departments.view', {
          departmentId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
    
    function updateDepartmentProducts() {
      var len = vm.products.length;
      for(var i=0; i<len; i++) {
        if(vm.products[i].department === 'Dairy'){
          department.products[i].push(vm.products[i].name);
        }
      }
    }
  }
})();
