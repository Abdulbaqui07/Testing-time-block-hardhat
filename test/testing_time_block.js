const { time, loadFixture } = require('@nomicfoundation/hardhat-network-helpers')
const { ethers } = require('hardhat')
const { expect } = require('chai')
const hre = require("hardhat");

describe('TestingTime', () => {
    async function deployTimeFixture() {
        const TestingTime = await ethers.getContractFactory('TestingTime')
        const hour = 60 * 60;
        const startTime = (await time.latest()) + hour
        const endTime = (await time.latest()) + hour * 2
        const startBlockNumber = (await time.latestBlock()) + 1;
        const endBlockNumber = (await time.latestBlock()) + 10;
        const TestingTimeContract = await TestingTime.deploy(startTime, endTime, startBlockNumber, endBlockNumber);
        return { TestingTimeContract, startTime, endTime, startBlockNumber, endBlockNumber, hour }
    }
    async function mineBlocks(blockNumber) {
        while (blockNumber > 0) {
          blockNumber--;
          await hre.network.provider.request ({
            method: "evm_mine",
            params: [],
          });
        }
      }

    describe('Timestamp Validation', () => {

        describe('Validation', () => {
            it("should have started", async () => {
                const { TestingTimeContract, startTime, endTime } = await loadFixture(deployTimeFixture);
                expect(await TestingTimeContract.hasStarted()).to.be.false
            })
    
            it('should not have ended', async () => {
                const { TestingTimeContract, startTime, endTime } = await loadFixture(deployTimeFixture);
                expect(await TestingTimeContract.hasEnded()).to.be.false
            })
        })
    
        describe('When enough time has elapsed to start the contract', () => {
    
            it('should not have started', async () => {
                const { TestingTimeContract, startTime, endTime, hour } = await loadFixture(deployTimeFixture);
                time.increase(hour + 1000)
                expect(await TestingTimeContract.hasStarted()).to.be.true
            })
    
            it('should not have ended', async () => {
                const { TestingTimeContract, startTime, endTime, hour } = await loadFixture(deployTimeFixture);
                time.increase(hour + 1000)
                expect(await TestingTimeContract.hasEnded()).to.be.false
            })
        })
    
        describe('When enough time has elapsed to end the contract', () => {
    
            it('should not have started', async () => {
                const { TestingTimeContract, startTime, endTime, hour } = await loadFixture(deployTimeFixture);
                time.increaseTo(endTime + 100)
                expect(await TestingTimeContract.hasStarted()).to.be.true
            })
    
            it('should not have ended', async () => {
                const { TestingTimeContract, startTime, endTime, hour } = await loadFixture(deployTimeFixture);
                time.increaseTo(endTime + 100)
                expect(await TestingTimeContract.hasEnded()).to.be.true
            })
        })
    })

    describe('Block Validation', () => {
        describe('Deploy', () => {
            it("block should have started", async () => {
                const { TestingTimeContract, startBlockNumber, endBlockNumber } = await loadFixture(deployTimeFixture);
                expect(await TestingTimeContract.hasBlockStarted()).to.be.true
            })

            it("block should not have ended", async () => {
                const { TestingTimeContract, startBlockNumber, endBlockNumber } = await loadFixture(deployTimeFixture);
                expect(await TestingTimeContract.hasBlockEnded()).to.be.false
            })
        })

        describe('When enough block has elapsed to start the contract', () => {
    
            it('should have started', async () => {
                const { TestingTimeContract, startBlockNumber, endBlockNumber } = await loadFixture(deployTimeFixture);
                console.log("StartBlock", startBlockNumber);
                console.log("EndBlock", endBlockNumber);
                console.log("Current block before skipping: ", await time.latestBlock())

                // Calling this to mint next 5 blocks
                // await mineBlocks(2)
                await hre.network.provider.request ({
                    method: "hardhat_mine",
                    params: ["0x5"],
                  });
                console.log("Skipped block to: ", await time.latestBlock())
                expect(await TestingTimeContract.hasBlockStarted()).to.be.true
            })
    
            it('should not have ended', async () => {
                const { TestingTimeContract, startBlockNumber, endBlockNumber } = await loadFixture(deployTimeFixture);
                expect(await TestingTimeContract.hasBlockEnded()).to.be.false
            })
        })

        describe('When enough block has elapsed to end the contract', () => {
    
            it('should have started', async () => {
                const { TestingTimeContract, startBlockNumber, endBlockNumber } = await loadFixture(deployTimeFixture);
                await hre.network.provider.request ({
                    method: "hardhat_mine",
                    params: ["0x1"],
                  });
                expect(await TestingTimeContract.hasBlockStarted()).to.be.true
            })
    
            it('should have ended', async () => {
                const { TestingTimeContract, startBlockNumber, endBlockNumber } = await loadFixture(deployTimeFixture);
                await hre.network.provider.request ({
                    method: "hardhat_mine",
                    params: ["0xA"],
                  });
                expect(await TestingTimeContract.hasBlockEnded()).to.be.true
            })
        })

    })
})
