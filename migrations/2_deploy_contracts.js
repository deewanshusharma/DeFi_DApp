const RDToken = artifacts.require('RDToken')
const BUSDToken = artifacts.require('BUSDToken')
const TetherToken = artifacts.require('TetherToken')
const USDCToken = artifacts.require('USDCToken')
const DeFi = artifacts.require('DeFi')

module.exports = async function(deployer, network, accounts) {
  // Deploy BUSD Token
  await deployer.deploy(BUSDToken)
  const bUSDToken = await BUSDToken.deployed()

  // Deploy Tether Token
  await deployer.deploy(TetherToken)
  const tetherToken = await TetherToken.deployed()

  // Deploy USDC Token
  await deployer.deploy(USDCToken)
  const uSDCToken = await USDCToken.deployed()

  // Deploy RD Token
  await deployer.deploy(RDToken)
  const rDToken = await RDToken.deployed()

  // Deploy DeFi
  await deployer.deploy(DeFi, rDToken.address, bUSDToken.address, tetherToken.address, uSDCToken. address)
  const deFi = await DeFi.deployed()

  // Transfer all the tokens to DeFi (1 million)
  await rDToken.transfer(deFi.address, '1000000000000000000000000')

  // Transfer 10000 BUSD tokens to investor
  await bUSDToken.transfer(accounts[1], '10000000000000000000000')

    // Transfer 10000 Tether tokens to investor
  await tetherToken.transfer(accounts[1], '10000000000000000000000')

    // Transfer 10000 USDC tokens to investor
  await uSDCToken.transfer(accounts[1], '10000000000000000000000')
}