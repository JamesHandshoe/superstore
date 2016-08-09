(function () {
  'use strict';

  angular
    .module('departments')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Departments',
      state: 'departments',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'departments', {
      title: 'List Departments',
      state: 'departments.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'departments', {
      title: 'Create Department',
      state: 'departments.create',
      roles: ['user']
    });
  }
})();
