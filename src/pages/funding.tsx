import { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import ethers from 'ethers';

const DistributionForm = () => {
    const [chainName, setChainName] = useState('');
    const [rpcUrl, setRpcUrl] = useState('');
    const [gatewayAddress, setGatewayAddress] = useState('');
    const [gasServiceAddress, setGasServiceAddress] = useState('');
    
    const sendToMany = async (chainName, rpcUrl, gatewayAddress, gasServiceAddress, destinationChain, destinationAddress, destinationAddresses, symbol, amount) => {
        try {
          // Connect to the Ethereum network using the RPC URL
          const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
        
          // Create a new wallet using the provider
          const wallet = new ethers.Wallet(process.env.NEXT_PUBLIC_EVM_PRIVATE_KEY as string, provider);
        
          // Create a contract instance using the ABI and contract address
          const contract = new ethers.Contract(gatewayAddress, DistributionExecutable.abi, wallet);
        
          // Call the sendToMany function on the contract
          const transaction = await contract.sendToMany(destinationChain, destinationAddress, destinationAddresses, symbol, amount);
        
          // Wait for the transaction to be mined
          await transaction.wait();
        
          console.log('Transaction completed successfully');
        } catch (error) {
          console.error('Error executing transaction:', error);
        }
      };

    const handleSubmit = (event) => {
      event.preventDefault();
  
      sendToMany(chainName, rpcUrl, gatewayAddress, gasServiceAddress, destinationChain, destinationAddress, destinationAddresses, symbol, amount);

      // Perform any actions with the form data
      console.log({
        chainName,
        rpcUrl,
        gatewayAddress,
        gasServiceAddress,
      });
  
      // Reset form fields
      setChainName('');
      setRpcUrl('');
      setGatewayAddress('');
      setGasServiceAddress('');
    };
  
    return (
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <FormControl id="chainName" mb={4}>
            <FormLabel>Chain Name</FormLabel>
            <Input
              value={chainName}
              onChange={(e) => setChainName(e.target.value)}
              type="text"
              required
            />
          </FormControl>
  
          <FormControl id="rpcUrl" mb={4}>
            <FormLabel>RPC URL</FormLabel>
            <Input
              value={rpcUrl}
              onChange={(e) => setRpcUrl(e.target.value)}
              type="text"
              required
            />
          </FormControl>
  
          <FormControl id="gatewayAddress" mb={4}>
            <FormLabel>Gateway Address</FormLabel>
            <Input
              value={gatewayAddress}
              onChange={(e) => setGatewayAddress(e.target.value)}
              type="text"
              required
            />
          </FormControl>
  
          <FormControl id="gasServiceAddress" mb={4}>
            <FormLabel>Gas Service Address</FormLabel>
            <Input
              value={gasServiceAddress}
              onChange={(e) => setGasServiceAddress(e.target.value)}
              type="text"
              required
            />
          </FormControl>
  
          <Button type="submit" colorScheme="teal">
            Submit
          </Button>
        </form>
      </Box>
    );
  };
  
  export default DistributionForm;
  