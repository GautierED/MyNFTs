MyNFTs :
- NFT Solidity smart contract with minting + setBaseURI functions
- generate images and metadata randomly from differents layers 

Tech used :
- Solidity / Hardhat / Ethers to create and deploy the smart contract
- https://github.com/HashLips/generative-art-node to generate random images -> I modified it to generate metadata & URI for each images

Step to generate your NFTs and upload them to IPFS : 
- compile and deploy the solidity smart contract to ethereum / bsc 
- generate images from the layers of your choice 
- upload the metadata folder to Pinata
- upload each images to Pinata
- take the metadata folder's CID and set it as the base URI using the smart contract's setBaseURI function 
- you can mint your NFTs, use the tokenURI function to access your metadata
