'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Худи',
        img: '/images/14202.30_4_1000x1000.jpg',
        price: '2000 ₽',
        desc: 'Теплое темное худи',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Футболка',
        img: '/images/Без названия (1).jpg',
        price: '1500 ₽',
        desc: 'Легкая темная футболка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Джинсы',
        img: '/images/Без названия (2).jpg',
        price: '2500 ₽',
        desc: 'Синие плотные джинсы',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Спортивные брюки',
        img: '/images/Без названия (3).jpg',
        price: '2000 ₽',
        desc: 'Спортивные легкие брюки',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Рубашка',
        img: '/images/Без названия (4).jpg',
        price: '2000 ₽',
        desc: 'Легкая белая рубашка',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
