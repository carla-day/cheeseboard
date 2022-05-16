const { sequelize,DataTypes,Model  } = require('./db');

// define the Cheese model
class Cheese extends Model{}
Cheese.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
},
{
    sequelize,
})
module.exports = {
    Cheese
};