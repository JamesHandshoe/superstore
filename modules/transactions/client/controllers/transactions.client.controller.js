(function () {
  'use strict';

  // Transactions controller
  angular
    .module('transactions')
    .controller('TransactionsController', TransactionsController);

  TransactionsController.$inject = ['$scope', '$state', 'Authentication', 'transactionResolve', 'CustomersService', '$resource', 'ProductsService'];

  function TransactionsController ($scope, $state, Authentication, transaction, CustomersService, $resource, ProductsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.transaction = transaction;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.customers = CustomersService.query();
    vm.products = ProductsService.query();

    // Remove existing Transaction
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.transaction.$remove($state.go('transactions.list'));
      }
    }

    // Save Transaction
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.transactionForm');
        return false;
      }

      // TODO: move create/update logic to service

      // add Total Price to transaction object
      vm.transaction.totalPrice = vm.transaction.product.price * vm.transaction.quantity;
      
      if (vm.transaction._id) {
        vm.transaction.$update(successCallback, errorCallback);
      } else {
        vm.transaction.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('transactions.view', {
          transactionId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();