const { ethers } = require("hardhat");

async function main() {
    const NFT = await ethers.getContractFactory("NFTs");
    
    // Start deployment, returning a promise that resolves to a contract object
    const _NFT = await NFT.deploy();   
    console.log("Contract deployed to address:", _NFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });