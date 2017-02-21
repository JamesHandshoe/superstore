(function () {
  'use strict';

  angular
    .module('specials')
    .controller('SpecialsListController', SpecialsListController);

  SpecialsListController.$inject = ['SpecialsService'];

  function SpecialsListController(SpecialsService) {
    var vm = this;

    vm.specials = SpecialsService.query();
  }
}());
