'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('test', [
      {
        id: 1,
        name: 'John Doe'
      },
      {
        id: 2,
        name: 'Joel'
      },
      {
        id: 3,
        name: 'Jane Doe'
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('test', { id: [1, 2, 3] }, {});
  }
};
