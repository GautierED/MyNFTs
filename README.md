This project let you create NFTs from scratch without any coding knowledge.
To create NFTs you need to do 2 things : 
- create a solidity smart contract with a minting & setBaseURI functions.
this smart contract will define how many NFTs will be minted, how many can be minted per one person and the NFT's price.

- generate images and metadata randomly from differents layers 
you will need to create images for each one of you NFTs. Thanks to https://github.com/HashLips/generative-art-node code, we just need to create the layers we want to use. don't forget to modify config.js file accordingly to your layers.
I modified it so it generates 2 folders : one for the metadatas and another one for the images. I added the URI generation to make it way much easier. Each images has its own CID generated from the hash function. This CID is added to the metadata.

Tech used :
- Solidity / Hardhat / Ethers to create and deploy the smart contract
- https://github.com/HashLips/generative-art-node / Javascript to generate random images 
- IPFS to store the images, I am using Pinata (https://www.pinata.cloud/)

Step to generate your NFTs and upload them to IPFS : 
- create your layers 
- modify generate_design/src/config.js according to your layers
- generate images from the layers  
- upload the metadata folder to Pinata
- upload each images to Pinata
- modify the smart contract according to your needs (number of NFTs, price, etc...) 
- compile and deploy the solidity smart contract to ethereum rinkeby using Hardhat or Remix
- take the metadata folder's CID and set it as the base URI using the smart contract's setBaseURI function 
- mint your NFTs using the smart contract's mint function
- use the tokenURI function to access your metadata stored on IPFS
- you can also use OpenSea to watch your NFTs
