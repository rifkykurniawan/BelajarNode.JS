'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('media', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull:false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },  
      
    });
    
    
  },
  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('media');
    
  }
};
