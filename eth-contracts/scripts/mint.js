const HDWalletProvider = require("truffle-hdwallet-provider")
const web3 = require('web3')
const MNEMONIC = "emotion member desert above uncover miracle happy bring seek cake elevator high"
const INFURA_KEY = "a689e26ed15c42708f6804d13a296290"
const FACTORY_CONTRACT_ADDRESS = "0xEC91d28049567D688bd88897e4a0a20750eF8a2d"
const NFT_CONTRACT_ADDRESS = "0x00B4Fc96b1E31b52Fcc7c9fEf0Ac61246Ff60e63"
const OWNER_ADDRESS = "0xEC91d28049567D688bd88897e4a0a20750eF8a2d"
const NETWORK = 4
const NUM_ESTATES = 3
const DEFAULT_OPTION_ID = 0

const NFT_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "mintTo",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

const FACTORY_ABI = [{
    "constant": false,
    "inputs": [
      {
        "name": "_optionId",
        "type": "uint256"
      },
      {
        "name": "_toAddress",
        "type": "address"
      }
    ],
    "name": "mint",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}]

async function main() {
    const provider = new HDWalletProvider(MNEMONIC, `https://${NETWORK}.infura.io/v3/${INFURA_KEY}`)
    const web3Instance = new web3(
        provider
    )

    if (NFT_CONTRACT_ADDRESS) {
        const nftContract = new web3Instance.eth.Contract(NFT_ABI, NFT_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Estates issued directly to the owner.
        for (var i = 0; i < NUM_ESTATES; i++) {
            const result = await nftContract.methods.mintTo(OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
            console.log("Minted estate. Transaction: " + result.transactionHash)
        }
    } else if (FACTORY_CONTRACT_ADDRESS) {
        const factoryContract = new web3Instance.eth.Contract(FACTORY_ABI, FACTORY_CONTRACT_ADDRESS, { gasLimit: "1000000" })

        // Estates issued directly to the owner.
        for (var i = 0; i < NUM_ESTATES; i++) {
            const result = await factoryContract.methods.mint(DEFAULT_OPTION_ID, OWNER_ADDRESS).send({ from: OWNER_ADDRESS });
            console.log("Minted estate. Transaction: " + result.transactionHash)
        }

    }
}

main()