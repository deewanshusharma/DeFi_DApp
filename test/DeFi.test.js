const RDToken = artifacts.require('RDToken')
const BUSDToken = artifacts.require('BUSDToken')
const TetherToken = artifacts.require('TetherToken')
const USDCToken = artifacts.require('USDCToken')
const DeFi = artifacts.require('DeFi')

require('chai')
	.use(require('chai-as-promised'))
	.should()

function tokens(n){
	return web3.utils.toWei(n, 'ether')
}


contract('DeFi', ([owner, investor]) => {

	let rDToken, bUSDToken, tetherToken, uSDCToken, deFi 

	before (async() => {
		//Load the contracts
		rDToken = await RDToken.new()
		bUSDToken = await BUSDToken.new()
		tetherToken = await TetherToken.new()
		uSDCToken = await USDCToken.new()
		deFi = await DeFi.new(rDToken.address, bUSDToken.address, tetherToken.address, uSDCToken. address)


		//Transfer all the RDTokens to the DeFi App
		await rDToken.transfer(deFi.address, tokens('1000000'))

		//Send BUSD to the investor
		await bUSDToken.transfer(investor, tokens('100'), {from: owner})

		//Send Tether to the investor
		await tetherToken.transfer(investor, tokens('100'), {from: owner})

		//Send BUSD to the investor
		await uSDCToken.transfer(investor, tokens('100'), {from: owner})
	})

	describe('RD Token Deployment', async() => {
		it('has a name', async() => {
			const name = await rDToken.name()
			assert.equal(name, 'RD Token')
		})
	})

	describe('BUSD Token Deployment', async() => {
		it('has a name', async() => {
			const name = await bUSDToken.name()
			assert.equal(name, 'BUSD Token')
		})
	})

	describe('Tether Token Deployment', async() => {
		it('has a name', async() => {
			const name = await tetherToken.name()
			assert.equal(name, 'Tether Token')
		})
	})

	describe('USDC Token Deployment', async() => {
		it('has a name', async() => {
			const name = await uSDCToken.name()
			assert.equal(name, 'USDC Token')
		})
	})

	describe('DeFi Deployment', async() => {
		it('has a name', async() => {
			const name = await deFi.name()
			assert.equal(name, 'DeFi App')
		})

		it('DeFi contract has all the RD Tokens', async() => {
			let balance = await rDToken.balanceOf(deFi.address)
			assert.equal(balance.toString(), tokens('1000000'))
		})
	})

	describe('Staking the BUSD tokens', async() => {
		it('Reward investors for staking the tokens', async() => {
			let result

			//Checking the investor's balance before staking
			result = await bUSDToken.balanceOf(investor)
			assert.equal(result.toString(), tokens('100'), 'Investors BUSD balance correct before staking')

			//Stake BUSD Tokens
			await bUSDToken.approve(deFi.address, tokens('100'), {from: investor})
			await deFi.stakeBUSD(tokens('100'), {from: investor})

			// Check staking result
      		result = await bUSDToken.balanceOf(investor)
      		assert.equal(result.toString(), tokens('0'), 'Investors BUSD balance correct after staking')

      		result = await bUSDToken.balanceOf(deFi.address)
      		assert.equal(result.toString(), tokens('100'), 'DeFi apps BUSD balance correct after staking')

      		result = await deFi.bUSDStakingBalance(investor)
      		assert.equal(result.toString(), tokens('100'), 'Investors BUSD staking balance correct after staking')

      		result = await deFi.isStakingBUSD(investor)
      		assert.equal(result.toString(), 'true', 'Investors staking status correct after staking')
		})
	})

	describe('Staking the Tether tokens', async() => {
		it('Reward investors for staking the tokens', async() => {
			let result

			//Checking the investor's balance before staking
			result = await tetherToken.balanceOf(investor)
			assert.equal(result.toString(), tokens('100'), 'Investors Tether balance correct before staking')

			//Stake BUSD Tokens
			await tetherToken.approve(deFi.address, tokens('100'), {from: investor})
			await deFi.stakeTether(tokens('100'), {from: investor})

			// Check staking result
      		result = await tetherToken.balanceOf(investor)
      		assert.equal(result.toString(), tokens('0'), 'Investors Tether balance correct after staking')

      		result = await tetherToken.balanceOf(deFi.address)
      		assert.equal(result.toString(), tokens('100'), 'DeFi apps Tether balance correct after staking')

      		result = await deFi.tetherStakingBalance(investor)
      		assert.equal(result.toString(), tokens('100'), 'Investors Tether staking balance correct after staking')

      		result = await deFi.isStakingTether(investor)
      		assert.equal(result.toString(), 'true', 'Investors staking status correct after staking')
		})
	})

	describe('Staking the USDC tokens', async() => {
		it('Reward investors for staking the tokens', async() => {
			let result

			//Checking the investor's balance before staking
			result = await uSDCToken.balanceOf(investor)
			assert.equal(result.toString(), tokens('100'), 'Investors USDC balance correct before staking')

			//Stake USDC Tokens
			await uSDCToken.approve(deFi.address, tokens('100'), {from: investor})
			await deFi.stakeUSDC(tokens('100'), {from: investor})

			// Check staking result
      		result = await uSDCToken.balanceOf(investor)
      		assert.equal(result.toString(), tokens('0'), 'Investors USDC balance correct after staking')

      		result = await uSDCToken.balanceOf(deFi.address)
      		assert.equal(result.toString(), tokens('100'), 'DeFi apps USDC balance correct after staking')

      		result = await deFi.uSDCStakingBalance(investor)
      		assert.equal(result.toString(), tokens('100'), 'Investors USDC staking balance correct after staking')

      		result = await deFi.isStakingUSDC(investor)
      		assert.equal(result.toString(), 'true', 'Investors staking status correct after staking')
		})
	})

	describe('Issue RD tokens', async() => {
		it('Reward granted', async() => {
			let result

			//Issue RD tokens
			await deFi.issueRDTokens({from: owner})

			//Check balance after the issuance
			result = await rDToken.balanceOf(investor)
			assert.equal(result.toString(), tokens('300'), 'Investors RD token wallet balance correct after the issuance')

			//Ensure that only the owner can issue the tokens
			await deFi.issueRDTokens({from: investor}).should.be.rejected;
		})
	})

	describe('Unstaking the BUSD tokens', async() => {
		it('BUSD unstaked successfully', async() => {
			let result

			//Unstake BUSD
			await deFi.unstakeBUSD({from: investor})

			// Check staking result
      		result = await bUSDToken.balanceOf(investor)
      		assert.equal(result.toString(), tokens('100'), 'Investors BUSD balance correct after staking')

      		result = await bUSDToken.balanceOf(deFi.address)
      		assert.equal(result.toString(), tokens('0'), 'DeFi apps BUSD balance correct after staking')

      		result = await deFi.bUSDStakingBalance(investor)
      		assert.equal(result.toString(), tokens('0'), 'Investors BUSD staking balance correct after staking')

      		result = await deFi.isStakingBUSD(investor)
      		assert.equal(result.toString(), 'false', 'Investors staking status correct after staking')
		})
	})

	describe('Unstaking the Tether tokens', async() => {
		it('Tether unstaked successfully', async() => {
			let result

			//Unstake BUSD
			await deFi.unstakeTether({from: investor})

			// Check staking result
      		result = await tetherToken.balanceOf(investor)
      		assert.equal(result.toString(), tokens('100'), 'Investors Tether balance correct after staking')

      		result = await tetherToken.balanceOf(deFi.address)
      		assert.equal(result.toString(), tokens('0'), 'DeFi apps Tether balance correct after staking')

      		result = await deFi.tetherStakingBalance(investor)
      		assert.equal(result.toString(), tokens('0'), 'Investors Tether staking balance correct after staking')

      		result = await deFi.isStakingTether(investor)
      		assert.equal(result.toString(), 'false', 'Investors staking status correct after staking')
		})
	})

	describe('Unstaking the USDC tokens', async() => {
		it('USDC unstaked successfully', async() => {
			let result

			//Unstake USDC
			await deFi.unstakeUSDC({from: investor})

			// Check staking result
      		result = await uSDCToken.balanceOf(investor)
      		assert.equal(result.toString(), tokens('100'), 'Investors USDC balance correct after staking')

      		result = await uSDCToken.balanceOf(deFi.address)
      		assert.equal(result.toString(), tokens('0'), 'DeFi apps USDC balance correct after staking')

      		result = await deFi.uSDCStakingBalance(investor)
      		assert.equal(result.toString(), tokens('0'), 'Investors USDC staking balance correct after staking')

      		result = await deFi.isStakingUSDC(investor)
      		assert.equal(result.toString(), 'false', 'Investors staking status correct after staking')
		})
	})
}) 