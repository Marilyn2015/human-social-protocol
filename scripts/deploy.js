import { ethers } from "hardhat";

async function main() {
    const HumanProof = await ethers.getContractFactory("HumanProof");
    const contract = await HumanProof.deploy();
    await contract.deployed();

console.log(`✅ Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exitCode = 1;
});
