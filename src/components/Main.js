import React, { Component } from 'react';
import {
  Avatar,
  CardHeader,
  Card,
  CardContent,
  Typography,
  CardMedia
} from "@material-ui/core";
import BUSD from '../BUSD.png'
import USDT from '../USDT.png'
import USDC from '../USDC.png'
import Wallet from '../wallet.svg'


class Main extends Component {

  render() {
    return (

    <div id="content" className="content">

      <table className="table table-borderless text-center">
        <thead>
          <tr>
            <th scope="col">BUSD Staking Balance</th>
            <th scope="col">Tether Staking Balance</th>
            <th scope="col">USDC Staking Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{window.web3.utils.fromWei(this.props.bUSDStakingBalance, 'Ether')} BUSD</td>
            <td>{window.web3.utils.fromWei(this.props.tetherStakingBalance, 'Ether')} USDT</td>
            <td>{window.web3.utils.fromWei(this.props.uSDCStakingBalance, 'Ether')} USDC</td>
          </tr>
        </tbody>
      </table>

      <div className="card mb-4">
        <div className="card-body">
          <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let amount
            amount = this.input1.value.toString()
            amount = window.web3.utils.toWei(amount, 'Ether')
            this.props.stakeBUSD(amount)
          }}>
            <div>
            <label className="float-left"><b>Stake BUSD Tokens</b></label>
            </div>

            <div className="input-group mb-4">
              <input
                type="text"
                ref={(input) => { this.input1 = input }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={BUSD} height='32' alt=''/>
                  &nbsp;&nbsp;&nbsp; BUSD
                </div>
              </div>
            </div>
            <button type="submit" className="float-left btn btn-primary ">STAKE</button>
          </form>
          <button
            type="submit"
            className="float-right btn btn-link btn-sm"
            onClick={(event) => {
              event.preventDefault()
              this.props.unstakeBUSD()
            }}>
            UNSTAKE
            </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let amount
            amount = this.input2.value.toString()
            amount = window.web3.utils.toWei(amount, 'Ether')
            this.props.stakeTether(amount)
          }}>
            <div>
            <label className="float-left"><b>Stake Tether Tokens</b></label>
            </div>

            <div className="input-group mb-4">
              <input
                type="text"
                ref={(input) => { this.input2 = input }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={USDT} height='32' alt=''/>
                  &nbsp;&nbsp;&nbsp; USDT
                </div>
              </div>
            </div>
            <button type="submit" className="float-left btn btn-primary ">STAKE</button>
          </form>
          <button
            type="submit"
            className="float-right btn btn-link btn-sm"
            onClick={(event) => {
              event.preventDefault()
              this.props.unstakeTether()
            }}>
            UNSTAKE
            </button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let amount
            amount = this.input3.value.toString()
            amount = window.web3.utils.toWei(amount, 'Ether')
            this.props.stakeUSDC(amount)
          }}>
            <div>
            <label className="float-left"><b>Stake USDC Tokens</b></label>
            </div>

            <div className="input-group mb-4">
              <input
                type="text"
                ref={(input) => { this.input3 = input }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={USDC} height='32' alt=''/>
                  &nbsp;&nbsp;&nbsp; USDC
                </div>
              </div>
            </div>
            <button type="submit" className="float-left btn btn-primary ">STAKE</button>
          </form>
          <button
            type="submit"
            className="float-right btn btn-link btn-sm"
            onClick={(event) => {
              event.preventDefault()
              this.props.unstakeUSDC()
            }}>
            UNSTAKE
            </button>
        </div>
      </div>

    



      <Card style={{width: 345, boxshadow: "0 5px 8px 0 rgba(0, 0, 0, 0.3)", backgroundColor: "#DFCFBE",}}>
        <CardHeader style={{backgroundColor: "#F7CAC9"}}
          avatar={
            <Avatar>U</Avatar>
          }
          title="USER WALLET"
          />
        <CardMedia style={{height: "200px"}} image={Wallet}/>
        <CardContent>
          <Typography color="primary" variant="h6">
            RD Token Balance
          </Typography>
          <Typography variant="subtitle">
            {window.web3.utils.fromWei(this.props.rDTokenBalance, 'Ether')} RDT
          </Typography>

          <Typography color="primary" variant="h6">
            BUSD Token Balance
          </Typography>
          <Typography variant="subtitle">
            {window.web3.utils.fromWei(this.props.bUSDTokenBalance, 'Ether')} BUSD
          </Typography>   

          <Typography color="primary" variant="h6">
            Tether Token Balance
          </Typography>
          <Typography variant="subtitle">
            {window.web3.utils.fromWei(this.props.tetherTokenBalance, 'Ether')} USDT
          </Typography> 

          <Typography color="primary" variant="h6">
            USDC Token Balance
          </Typography>
          <Typography variant="subtitle">
            {window.web3.utils.fromWei(this.props.uSDCTokenBalance, 'Ether')} USDC
          </Typography>  
        </CardContent>
      </Card>


    </div>
  );
  }
}

export default Main;
