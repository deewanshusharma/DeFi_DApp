import React, { Component } from 'react'
import Web3 from 'web3'
import RDToken from '../abis/RDToken.json'
import BUSDToken from '../abis/BUSDToken.json'
import TetherToken from '../abis/TetherToken.json'
import USDCToken from '../abis/USDCToken.json'
import DeFi from '../abis/DeFi.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load RDToken
    const rDTokenData = RDToken.networks[networkId]
    if(rDTokenData) {
      const rDToken = new web3.eth.Contract(RDToken.abi, rDTokenData.address)
      this.setState({ rDToken })
      let rDTokenBalance = await rDToken.methods.balanceOf(this.state.account).call()
      this.setState({ rDTokenBalance: rDTokenBalance.toString() })
    } else {
      window.alert('RDToken contract not deployed to detected network.')
    }

    // Load BUSDToken
    const bUSDTokenData = BUSDToken.networks[networkId]
    if(bUSDTokenData) {
      const bUSDToken = new web3.eth.Contract(BUSDToken.abi, bUSDTokenData.address)
      this.setState({ bUSDToken })
      let bUSDTokenBalance = await bUSDToken.methods.balanceOf(this.state.account).call()
      this.setState({ bUSDTokenBalance: bUSDTokenBalance.toString() })
    } else {
      window.alert('BUSDToken contract has not been deployed to the detected network.')
    }
    
    // Load TetherToken
    const tetherTokenData = TetherToken.networks[networkId]
    if(tetherTokenData) {
      const tetherToken = new web3.eth.Contract(TetherToken.abi, tetherTokenData.address)
      this.setState({ tetherToken })
      let tetherTokenBalance = await tetherToken.methods.balanceOf(this.state.account).call()
      this.setState({ tetherTokenBalance: tetherTokenBalance.toString() })
    } else {
      window.alert('TetherToken contract has not been deployed to the detected network.')
    }

    // Load USDCToken
    const uSDCTokenData = USDCToken.networks[networkId]
    if(uSDCTokenData) {
      const uSDCToken = new web3.eth.Contract(USDCToken.abi, uSDCTokenData.address)
      this.setState({ uSDCToken })
      let uSDCTokenBalance = await uSDCToken.methods.balanceOf(this.state.account).call()
      this.setState({ uSDCTokenBalance: uSDCTokenBalance.toString() })
    } else {
      window.alert('USDCToken contract has not been deployed to the detected network.')
    }


    // Load DeFi app
    const deFiData = DeFi.networks[networkId]
    if(deFiData) {
      const deFi = new web3.eth.Contract(DeFi.abi, deFiData.address)
      this.setState({ deFi })
      let bUSDStakingBalance = await deFi.methods.bUSDStakingBalance(this.state.account).call()
      this.setState({ bUSDStakingBalance: bUSDStakingBalance.toString() })
      let tetherStakingBalance = await deFi.methods.tetherStakingBalance(this.state.account).call()
      this.setState({ tetherStakingBalance: tetherStakingBalance.toString() })
      let uSDCStakingBalance = await deFi.methods.uSDCStakingBalance(this.state.account).call()
      this.setState({ uSDCStakingBalance: uSDCStakingBalance.toString() })
    } else {
      window.alert('DeFi contract has not been deployed to the detected network.')
    }

    this.setState({ loading: false })
  }


  // Function to connect the app to the blockchain
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  stakeBUSD = (amount) => {
    this.setState({ loading: true })
    this.state.bUSDToken.methods.approve(this.state.deFi._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.deFi.methods.stakeBUSD(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeBUSD = (amount) => {
    this.setState({ loading: true })
    this.state.deFi.methods.unstakeBUSD().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  stakeTether = (amount) => {
    this.setState({ loading: true })
    this.state.tetherToken.methods.approve(this.state.deFi._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.deFi.methods.stakeTether(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeTether = (amount) => {
    this.setState({ loading: true })
    this.state.deFi.methods.unstakeTether().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  stakeUSDC = (amount) => {
    this.setState({ loading: true })
    this.state.uSDCToken.methods.approve(this.state.deFi._address, amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.state.deFi.methods.stakeUSDC(amount).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
      })
    })
  }

  unstakeUSDC = (amount) => {
    this.setState({ loading: true })
    this.state.deFi.methods.unstakeUSDC().send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      rDToken: {},
      bUSDToken: {},
      tetherToken: {},
      uSDCToken: {},
      deFi: {},
      rDTokenBalance: '0',
      bUSDTokenBalance: '0',
      tetherTokenBalance: '0',
      uSDCTokenBalance: '0',
      bUSDStakingBalance: '0',
      tetherStakingBalance: '0',
      uSDCStakingBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        rDTokenBalance={this.state.rDTokenBalance}
        bUSDTokenBalance={this.state.bUSDTokenBalance}
        tetherTokenBalance={this.state.tetherTokenBalance}
        uSDCTokenBalance={this.state.uSDCTokenBalance}
        bUSDStakingBalance={this.state.bUSDStakingBalance}
        tetherStakingBalance={this.state.tetherStakingBalance}
        uSDCStakingBalance={this.state.uSDCStakingBalance}
        stakeBUSD={this.stakeBUSD}
        unstakeBUSD={this.unstakeBUSD}
        stakeTether={this.stakeTether}
        unstakeTether={this.unstakeTether}
        stakeUSDC={this.stakeUSDC}
        unstakeUSDC={this.unstakeUSDC}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.Dapp.com/DeFi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;