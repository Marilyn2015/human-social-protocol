const { ethers } = require("hardhat");

async function main() {
  const Contract = await ethers.getContractFactory("HumanProof");
  const contract = await Contract.deploy();

  await contract.deployed();

  console.log(`✅ Contract deployed to: ${contract.address}`);
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
// 1) Show the prompt on button click
function showUsernameScreen() {
  document.getElementById('username-screen').classList.remove('hidden');
}

// 2) On page load, auto-hide if name exists
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('h_username');
  if (saved) {
    document.getElementById('username-screen').classList.add('hidden');
  }
});
