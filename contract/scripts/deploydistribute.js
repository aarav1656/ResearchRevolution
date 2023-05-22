const { ethers } = require('ethers');
const contractJson = require('./DistributeToken.json'); // Replace with the actual contract JSON file

async function deployContract() {
  try {
    // Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');
  
    // Create a new wallet using a private key
    const privateKey = 'YOUR_PRIVATE_KEY';
    const wallet = new ethers.Wallet(privateKey, provider);
  
    // Deploy the contract
    const contractFactory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
    const contract = await contractFactory.deploy('GATEWAY_ADDRESS', 'GAS_SERVICE_ADDRESS');
  
    // Wait for the contract to be deployed
    await contract.deployed();
  
    console.log('Contract deployed successfully:', contract.address);
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

deployContract();
