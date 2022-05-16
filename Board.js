const { sequelize,DataTypes,Model  } = require('./db');

//define the Board model
class Board extends Model{}
Board.init({
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.NUMBER
},
{
    sequelize,
})
module.exports = {
    Board
};