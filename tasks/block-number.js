const { task } = require("hardhat/config");

task(
    "block-number",
    "Prints the current block number",
    async (taskArgs, hre) => {
        console.log(
            "Block number:",
            await hre.ethers.provider.getBlockNumber(),
        );
    },
);
