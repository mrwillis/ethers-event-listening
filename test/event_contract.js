const {providers, Contract, utils} = require("ethers")
const provider = new providers.Web3Provider(web3.currentProvider);
const EventContract = artifacts.require("EventContract");
const eventContractAbi = require("../build/contracts/EventContract.json")

contract("EventContract", accounts => {
    const ownerSigner = provider.getSigner(accounts[0]);
    const eventContract = new Contract(EventContract.address, eventContractAbi.abi, ownerSigner)
    it("should work", async () => {
        eventContract.ontestevent = function(a, b) {
            console.log(a)
            console.log(b)
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
        await eventContract.emitEvent(utils.bigNumberify(100));
        expect(true).to.be.true
    })
}) 