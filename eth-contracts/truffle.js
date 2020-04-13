
var HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = "a689e26ed15c42708f6804d13a296290";
var mnemonic = "emotion member desert above uncover miracle happy bring seek cake elevator high"; // double-checked

module.exports = {
  networks: { 
    development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 9454,            // as shown after running truffle develop
    network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.MNENOMIC, `http://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,
      gasPrice: 21000000000,
      skipDryRun: true,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    enableTimeouts: false
  }

}
