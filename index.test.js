const {sequelize} = require('./db');
const {User, Cheese,Board} = require('./index')

describe('User cheese and board models', function(){
    // force true to recreate tables each time
    beforeAll(async function(){
        await sequelize.sync({ force:true});
    })
//test user model
test('test adding boards to user model', async function(){
    const user1= await User.create({name: 'Carla', email: 'cheese@gmail.com'})
    const board = await Board.create({type: 'soft', description: 'all soft cheeses', rating: 3})
    await user1.addBoard(board);
    const userBoards = await user1.getBoards();

    expect(board[0] instanceof User).toBeTruthy
    
})
//test user 2
test('Create User', async function(){
    const user1= await User.create({name: 'Carla', email: 'cheese@gmail.com'})
    const board = await Board.create({type: 'soft', description: 'all soft cheeses', rating: 3})
    await user1.addBoard(board);
    const userBoards = await user1.getBoards();
    
    expect(user1.name).toBe('Carla')

})
//test association
test('User Association', async function(){
    expect(User.hasMany(Board)).toBeTruthy
})
//test cheese model
test('Create Cheese', async function(){

    const cheese= await Cheese.create({title: 'Brie', description: 'soft cheese on a wheel'})
    expect(cheese.title).toBe('Brie')
})
//test association
test('Cheese Association', async function(){
    expect(Cheese.belongsToMany(Board, {through: 'title'})).toBeTruthy
})
// test Board
test('Create Board', async function(){

    const board= await Board.create({type: 'soft', description: 'all soft cheeses', rating: 4})
    const brie = await Cheese.create({title: 'Brie', description: 'Soft cheese'})

    await board.addCheese(brie);

    const addCheese = await board.getCheeses();
//console.log(addCheese)
   expect(addCheese.length).toBe(1);
})

//board test
test('test Board can have cheese and cheese can have boards', async function(){

    const board= await Board.create({type: 'soft', description: 'all soft cheeses', rating: 4})
    const brie = await Cheese.create({title: 'Brie', description: 'Soft cheese'})
    const camembert = await Cheese.create({title: 'Camembert', description:'hard cheese'})
    const board2 = await Board.create({type:'hard', description: 'all hard cheeses', rating:3 })
//add cheese to board
    await board.addCheese(brie);
    //add board to cheese
    await camembert.addBoard(board2);

    const addCheese = await board.getCheeses();
    const addBoard = await camembert.getBoards();
console.log(addCheese)

    expect(addCheese[0]instanceof Cheese).toBeTruthy
    expect(addBoard[0]instanceof Board).toBeTruthy

})

test('test Board can have cheese and cheese can have boards 2', async function(){

    const board= await Board.create({type: 'soft', description: 'all soft cheeses', rating: 4})
    const brie = await Cheese.create({title: 'Brie', description: 'Soft cheese'})
    const camembert = await Cheese.create({title: 'Camembert', description:'hard cheese'})
    const board2 = await Board.create({type:'hard', description: 'all hard cheeses', rating:3 })
//add cheese to board
    await board.addCheese(brie);
    //add board to cheese
    await camembert.addBoard(board2);

    const addCheese = await board.getCheeses();
    const addBoard = await camembert.getBoards();
console.log(addCheese)

    expect(addCheese.length).toBe(1)
    
})

test('test Board can have cheese and cheese can have boards 2', async function(){
    await sequelize.sync({ force: true });

    const board= await Board.create({type: 'soft', description: 'all soft cheeses', rating: 4})
    const brie = await Cheese.create({title: 'Brie', description: 'Soft cheese'})
    const camembert = await Cheese.create({title: 'Camembert', description:'hard cheese'})
//add cheese to board
    await board.addCheese(brie);
    await board.addCheese(camembert);
  //eager load
    const allCheeses = await Board.findAll({
        include:[{model: Cheese}]
    })
    expect(allCheeses[0].Cheeses.length).toBe(2)
})
})
