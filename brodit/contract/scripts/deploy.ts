import { ethers } from 'hardhat'

async function main() {
  const cont = await ethers.deployContract('brodit')

  await cont.waitForDeployment()

  console.log(`Deployed to ${cont.target}`)
}


main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})