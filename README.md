creating NFTs :
- NFT Solidity smart contract with minting + setBaseURI functions
- generate images and metadata randomly from differents layers 

using Solidity / Hardhat / Ethers to create and deploy the smart contract
/ using https://github.com/HashLips/generative-art-node to generate random images, modified it to generate metadata & URI for each images

Step to generate your NFTs and upload them to IPFS : 
- compile and deploy the solidity smart contract to ethereum / bsc 
- generate images 
- upload the metadata folder to Pinata
- upload each images to Pinata
- take the metadata folder's CID and set it as the base URI using the smart contract's setBaseURI function 
- you can mint your NFTs and see them using the URI in the metadata
