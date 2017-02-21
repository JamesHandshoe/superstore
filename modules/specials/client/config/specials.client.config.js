(function () {
  'use strict';

  angular
    .module('specials')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Specials',
      state: 'specials',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'specials', {
      title: 'List Specials',
      state: 'specials.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'specials', {
      title: 'Create Special',
      state: 'specials.create',
      roles: ['user']
    });
  }
}());
