// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;
import "hardhat/console.sol";

import "./Token.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract Dmail is VRFConsumerBase{
   Token token;

   struct UserInbox {
      address from;
      string message;
      []Thread thread;  
      uint id;    
   }

  struct Thread {
      address from;
      string message;
      address to;
      bool read;
   }

   mapping(address => []UserInbox) inbox;

   function Dmail(address _token) public {
      token = Token(_token);
   }

      
    /** 
     * Requests randomness 
     */
    function getRandomNumber() public returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
        return requestRandomness(keyHash, fee);
    }

    /**
     * Callback function used by VRF Coordinator
     */
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
    }

   function generateRandomStringFromChainLink(){
      uint256 randomNumber = getRandomNumber();
   }

   function send(address _to, string _message) public {
      UserInbox inbox = this.inbox[_to];
      getRandomNumber();
      inbox.id = randomResult;
      
      if (inbox.thread.length == 0) {
         Thread thread = Thread(msg.sender, _message, _to, false);
         inbox.thread.push(thread);
      } else {
         Thread thread = inbox.thread[inbox.thread.length - 1];
         if (thread.to == msg.sender) {
            thread.message = _message;
         } else {
            Thread thread = Thread(msg.sender, _message, _to, false);
            inbox.thread.push(thread);
         }
      }
   }

   function read(address _to) public {
      UserInbox inbox = this.inbox[_to];
      if (inbox.thread.length == 0) {
         console.log("No messages");
      } else {
         Thread thread = inbox.thread[inbox.thread.length - 1];
         if (thread.to == msg.sender) {
            thread.read = true;
         }
      }
   }

   function getInbox(address _to) public view returns (UserInbox) {
      return inbox[_to];
   }
  }