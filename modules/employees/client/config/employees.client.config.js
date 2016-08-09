(function () {
  'use strict';

  angular
    .module('employees')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Employees',
      state: 'employees',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'List Employees',
      state: 'employees.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'employees', {
      title: 'Create Employee',
      state: 'employees.create',
      roles: ['user']
    });
  }
})();
