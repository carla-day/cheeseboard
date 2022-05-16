const {sequelize, Datatypes, Model} = require('./db');
const {User} = require('./User');
const {Cheese} = require('./Cheese');
const {Board} = require('./Board');

User.hasMany(Board);
Cheese.belongsToMany(Board, {through: 'title'});
Board.hasMany(Cheese);

module.exports={
    User, 
    Cheese, 
    Board
}