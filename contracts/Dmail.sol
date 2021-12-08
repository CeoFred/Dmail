// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "./Token.sol";

contract Dmail {
   Token dmailtoken;


   constructor(address _token_address) {
      dmailtoken = Token(_token_address);
   }
      // Data location for all state variables is storage.
   address[] serviceUsers;
  
   function connectUser() public  {
      serviceUsers.push(msg.sender);
   }

   struct Message {
      address sender;
      string message;
      uint timestamp;
      string subject;
   }

   mapping(address => Message[]) messages;

   function sendMessage(address _to, string memory subject, string memory _message) public {

      require(bytes(subject).length != 0, "Subject cannot be empty");
      require(bytes(_message).length != 0, "Message cannot be empty");

      if(bytes(_message).length > 10024) {
         console.log("Message too long");
         revert('Message too long');
      }


      messages[_to].push(Message(msg.sender, _message, block.timestamp, subject));
   }

   function getInbox() public view returns (Message[] memory inbox) {
       Message[] memory inbox =  messages[msg.sender];
      return inbox;
   }

 
  }