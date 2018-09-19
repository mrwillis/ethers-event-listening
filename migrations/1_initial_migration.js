var Migrations = artifacts.require("./Migrations.sol");
var EventContract = artifacts.require("./EventContract.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(EventContract);
};
