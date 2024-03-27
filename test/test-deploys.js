const { ethers, network } = require("hardhat");
const { expect } = require("chai");

describe("SimpleStorage", () => {
    let simpleStorageFactory;
    let simpleStorage;
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
        await simpleStorage.waitForDeployment();
    });
    it("Should deploy the contract, store the value 42, and emit an event", async () => {
        expect(await simpleStorage.retrieve()).to.equal(0);
        await simpleStorage.store(42);
        expect(await simpleStorage.retrieve()).to.equal(42);
    });
});
