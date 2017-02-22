(function () {
  'use strict';

  // Products controller
  angular
    .module('products')
    .controller('ProductsController', ProductsController);

    //have to injct FileUploader and $ window
  ProductsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'productResolve', '$resource', 'DepartmentsService', 'FileUploader', '$timeout'];

  function ProductsController ($scope, $state, $window, Authentication, product, $resource, DepartmentsService, FileUploader, $timeout) {
    var vm = this;

    /**Image Stuff**/
    vm.productImageURL = '/modules/users/client/img/profile/saveme-placeholder.png';
    
    vm.imageURL1 = '';
    /**End Image Stuff**/
    vm.authentication = Authentication;
    vm.product = product;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.department = DepartmentsService.query();

    // Remove existing Product
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.product.$remove($state.go('products.list'));
      }
    }

    // Save Product
    function save(isValid) {
      vm.product.productImageURL = vm.productImageURL;
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.productForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.product._id) {
        vm.product.$update(successCallback, errorCallback);
      } else {
        vm.product.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('products.view', {
          productId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
      
    //This is where we put the image functions that make the file upload magic occur.

    $scope.uploaderProductImage = new FileUploader({
      url: 'api/products/picture'
    });

    $scope.uploaderProductImage.filters.push({
      name: 'imageFilter',
      fn: function(item, options) {
        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    });

    $scope.uploadProductPicture = function() {

      $scope.sucess = vm.error = null;

      $scope.uploaderProductImage.uploadAll();

    };

    $scope.$watch('urlimage', function(newVal, oldVal) {

      if (newVal !== undefined) {

        $scope.productImageURL = newVal;

      } else {
        vm.productImageURL = '/modules/products/client/img/uploads/saveme-placeholder.png';
      }

    });

    $scope.uploaderProductImage.onAfterAddingFile = function(fileItem) {
      if ($window.FileReader) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL(fileItem._file);
        fileReader.onload = function(fileReaderEvent) {
          $timeout(function() {
            vm.productImageURL = fileReaderEvent.target.result;
          }, 0);
        };
      }
    };

    $scope.uploaderProductImage.onSuccessItem = function(fileItem, response, status, headers) {
      $scope.success = true;
      $scope.cancelProductUpload();
    };

    $scope.uploaderProductImage.onErrorItem = function(fileItem, response, status, headers) {
      $scope.cancelProductUpload();
      $scope.error = response.message;
    };

    $scope.cancelProductUpload = function() {
      $scope.uploaderProductImage.clearQueue();
      $scope.productImageURL = '/modules/users/client/img/profile/saveme-placeholder.png';
    };

  }

})();
