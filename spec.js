const {expect} = require('chai');
const { default: User } = require('./src/User');

it('1 + 1 is 2', ()=>{
    expect(1 + 1).to.equal(2);
});

describe('The applicatoin', ()=>{
    describe('The data layer', ()=>{
        it('there are 2 users', async()=>{
            await db.db.sync({ force: true}); //is this the syntax that we write like this? 
            //same like expect(moe).to.be.ok
        
            await Promist.all([
                User.create({ name: 'moe'}),
                User.create({ name: 'lucy'}),
            ])
            const users = await User.findAll();
            expect(users.length).to.equal(2);
        });
    });
})