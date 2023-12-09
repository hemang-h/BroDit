import { ethers } from 'hardhat';

async function main() {
  // Replace 'YourContractName' with the actual name of your contract
  const ContractFactory = await ethers.getContractFactory('Brodit');
  const contract = await ContractFactory.deploy();

  await contract.deployed();

  console.log(`Deployed to ${contract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
