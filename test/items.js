const ganache = require('ganache-cli');
const Web3 = require('web3');
const pify = require('pify');
const assert = require('assert');

const Items = require('./../artifacts/Items.json')

describe('Items', function(){
  let server;

  before(async function(){
    server = ganache.server();
    await pify(server.listen)(8545);
  });

  after(async function(){
    await pify(server.close)()
  });

  it('fetches a string', async function(){
      const web3 = new Web3('http://localhost:8545');
      const accounts = await web3.eth.getAccounts();

      const options = {
        data: Items.bytecode,
        gasPrice: '1',
        gas: 4000000,
        from: accounts[0]
      }

      const items = new web3.eth.Contract(Items.abi, options);
      const instance = await items.deploy().send();

      await instance.methods.loadItems().send();

      const weapon = await instance.methods.getItem(1).call();

      assert.equal(weapon, 'Shield');
      console.log(`The weapon at index 1 is ... ${weapon}`)
  })
})
