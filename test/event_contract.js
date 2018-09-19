const {providers, Contract, utils} = require("ethers")
const provider = new providers.Web3Provider(web3.currentProvider);
const jsonRpcProvider = new providers.JsonRpcProvider("http://127.0.0.1:9545");
const EventContract = artifacts.require("EventContract");
const eventContractAbi = require("../build/contracts/EventContract.json")

contract("EventContract", accounts => {
    const ownerSigner = jsonRpcProvider.getSigner(accounts[0]);
    const eventContract = new Contract(EventContract.address, eventContractAbi.abi, ownerSigner)
    it("should fire an event and listen to it", async () => {
        eventContract.ontestevent = function(a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        }
        const allFilter = eventContract.filters.TestEvent(null, null);
        eventContract.on(allFilter, (a, b) => {
            console.log(a);
            console.log(b);
        })
        eventContract.addListener("TestEvent", (a, b) => {
            console.log(a);
            console.log(b);
        })
        eventContract.on('TestEvent', function (a,b) {
            console.log(a);
            console.log(b);
        })
        await eventContract.emitEvent(utils.bigNumberify(100));
        const newNumber = await eventContract.testNumber();
        expect(newNumber.eq(utils.bigNumberify(100))).to.be.true;
    })
}) 
