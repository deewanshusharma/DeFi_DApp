pragma solidity ^0.5.0;

import "./RDToken.sol";
import "./BUSDToken.sol";
import "./TetherToken.sol";
import "./USDCToken.sol";

contract DeFi {
    string public name = "DeFi App";
    address public owner;
    RDToken public rDToken;
    BUSDToken public bUSDToken;
    TetherToken public tetherToken;
    USDCToken public uSDCToken;

    address[] public stakers;
    mapping(address => uint) public bUSDStakingBalance;
    mapping(address => uint) public tetherStakingBalance;
    mapping(address => uint) public uSDCStakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStakingBUSD;
    mapping(address => bool) public isStakingTether;
    mapping(address => bool) public isStakingUSDC;

    constructor(RDToken _rDToken, BUSDToken _bUSDToken, TetherToken _tetherToken, USDCToken _uSDCToken) public {
        rDToken = _rDToken;
        bUSDToken = _bUSDToken;
        tetherToken = _tetherToken;
        uSDCToken = _uSDCToken;
        owner = msg.sender;
    }

    function stakeBUSD(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer BUSD tokens to this contract for staking
        bUSDToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        bUSDStakingBalance[msg.sender] = bUSDStakingBalance[msg.sender] + _amount;

        // Add user to stakers array, only if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStakingBUSD[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function stakeTether(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer BUSD tokens to this contract for staking
        tetherToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        tetherStakingBalance[msg.sender] = tetherStakingBalance[msg.sender] + _amount;

        // Add user to stakers array, only if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStakingTether[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    function stakeUSDC(uint _amount) public {
        // Require amount greater than 0
        require(_amount > 0, "amount cannot be 0");

        // Trasnfer BUSD tokens to this contract for staking
        uSDCToken.transferFrom(msg.sender, address(this), _amount);

        // Update staking balance
        uSDCStakingBalance[msg.sender] = uSDCStakingBalance[msg.sender] + _amount;

        // Add user to stakers array, only if they haven't staked already
        if(!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        // Update staking status
        isStakingUSDC[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }

    // Unstaking BUSD
    function unstakeBUSD() public {
        // Fetch staking balance
        uint balance = bUSDStakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer BUSD tokens to the investor for staking
        bUSDToken.transfer(msg.sender, balance);

        // Reset staking balance
        bUSDStakingBalance[msg.sender] = 0;

        // Update staking status
        isStakingBUSD[msg.sender] = false;
    }

    // Unstaking Tether
    function unstakeTether() public {
        // Fetch staking balance
        uint balance = tetherStakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer Tether tokens to the investor for staking
        tetherToken.transfer(msg.sender, balance);

        // Reset staking balance
        tetherStakingBalance[msg.sender] = 0;

        // Update staking status
        isStakingTether[msg.sender] = false;
    }

    // Unstaking USDC
    function unstakeUSDC() public {
        // Fetch staking balance
        uint balance = uSDCStakingBalance[msg.sender];

        // Require amount greater than 0
        require(balance > 0, "staking balance cannot be 0");

        // Transfer USDC tokens to the investor for staking
        uSDCToken.transfer(msg.sender, balance);

        // Reset staking balance
        uSDCStakingBalance[msg.sender] = 0;

        // Update staking status
        isStakingUSDC[msg.sender] = false;
    }

    // Issuing Tokens
    function issueRDTokens() public {
        // Only the owner can call this function
        require(msg.sender == owner, "caller must be the owner");

        // Issue tokens to all stakers
        for (uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = bUSDStakingBalance[recipient] + tetherStakingBalance[recipient] + uSDCStakingBalance[recipient];
            if(balance > 0) {
                rDToken.transfer(recipient, balance);
            }
        }
    }
}