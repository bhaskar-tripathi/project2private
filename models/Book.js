/* eslint-disable semi */
module.exports = function (sequelize, DataTypes) {
  var Book = sequelize.define('Book', {
    // Giving the Author model a name of type STRING
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: DataTypes.STRING,
    volume_id:DataTypes.STRING,
    isbn: DataTypes.STRING
  });

  Book.associate = function (models) {
    // Associating Book with Reviews
    // When a Book is deleted, also delete any associated Reviews
    Book.hasMany(models.Reviews, {
      onDelete: 'cascade'
    });
  };

  return Book;
};
