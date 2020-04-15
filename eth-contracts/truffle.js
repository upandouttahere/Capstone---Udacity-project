
var HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = "a689e26ed15c42708f6804d13a296290";
// var mnemonic = "emotion member desert above uncover miracle happy bring seek cake elevator high"; // double-checked
var mnemonic = "spirit supply whale amount human item harsh scare congress discover talent hamster"; // given by mentor

module.exports = {
  networks: { 
    development: {
    host: "127.0.0.1",     // Localhost (default: none)
    port: 9454,            // as shown after running truffle develop
    network_id: "*",       // Any network (default: none)
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
      network_id: 4,
      gasPrice: 21000000000,
      skipDryRun: true,
      networkCheckTimeout: 10000000,
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    enableTimeouts: false
  }

}