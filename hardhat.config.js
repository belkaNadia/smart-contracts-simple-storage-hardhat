require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-verify");
require("dotenv").config();
require("./tasks/block-number");

const SEPHOLIA_RPC_URL =
    process.env.SEPHOLIA_RPC_URL || "http://localhost:8545";

console.log("ENV:", process.env.ETHERSCAN_API_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    networks: {
        hardhat: {
            chainId: 1337,
        },
        sepolia: {
            url: SEPHOLIA_RPC_URL,
            account: process.env.DEPLOYER_PRIVATE_KEY,
            chainId: 11155111,
        },
        etherscan: {
            // Your API key for Etherscan
            // Obtain one at https://etherscan.io/
            apiKey: process.env.ETHERSCAN_API_KEY,
            url: "https://api.etherscan.io/api",
        },
        localhost: {
            url: "http://localhost:8545",
            chainId: 1337,
        },
    },
    solidity: "0.8.8",
};
