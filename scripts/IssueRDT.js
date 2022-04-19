const DeFi = artifacts.require('DeFi')

module.exports = async function(callback) {
  let deFi = await DeFi.deployed()
  await deFi.issueRDTokens()
  console.log("Tokens issued!")
  callback()
}