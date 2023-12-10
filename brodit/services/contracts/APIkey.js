const Web3 = require('web3');
const web3 = new Web3('https://sepolia.infura.io/v3/3efc9c7a904f49fca245ed369c8e1b42');

const contractAddress = '0x5b11faa5fe62765dff13f06b4be497f45f6eb0f8';
const deployedBytecode = await web3.eth.getCode(contractAddress);
console.log('Deployed Bytecode:', deployedBytecode);
