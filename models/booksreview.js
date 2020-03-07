/* eslint-disable space-before-function-paren */
/* eslint-disable semi */
module.exports = function(sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    pName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
      book_id: DataTypes.STRING
    
    
  });

  Reviews.associate = function(models) {
    // We're saying that a Comment should belong to a Book
    // A Review can't be created without a Book due to the foreign key constraint
    Reviews.belongsTo(models.Book, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Reviews;
};
