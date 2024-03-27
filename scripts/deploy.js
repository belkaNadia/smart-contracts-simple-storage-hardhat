const { ethers, run, network } = require("hardhat");

async function main() {
    const simpleStorageFactory =
        await ethers.getContractFactory("SimpleStorage");

    console.log("Deploying SimpleStorage...");

    const simpleStorage = await simpleStorageFactory.deploy();
    console.log("Deployment transaction:", simpleStorage.deployTransaction);

    await simpleStorage.waitForDeployment();

    console.log("SimpleStorage deployed to:", simpleStorage);
    console.log(network.config);
    if (network.config.name === "sepolia" && process.env.ETHERSCAN_API_KEY) {
        console.log("Verifying contract...");
        await simpleStorage.deploymentTransaction.wait(6); // wait for 6 confirmations
        await verify(simpleStorage.address, []);
    }

    const currentValue = await simpleStorage.retrieve();
    console.log(`Current value: ${currentValue}`);

    //Update the value
    const transaction = await simpleStorage.store(42);
    await transaction.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated value:", ${updatedValue}`);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract at address:", contractAddress);
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
        console.log("Contract verified!");
    } catch (err) {
        if (err.message.includes("Contract source code already verified")) {
            console.log("Contract already verified!");
        } else {
            console.error(err);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
