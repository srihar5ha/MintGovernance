const { ethers } = require("hardhat");
const { toUtf8Bytes, keccak256, parseEther} = ethers.utils;

async function main() {
  const [owner, otherAccount] = await ethers.getSigners();
  
  const token = await ethers.getContractAt("MyToken", "0xaE4C1ac8d7e63fE8e24F2bF76d75934Ab1f55b83", owner)
  const governor = await ethers.getContractAt("MyGovernor", "0x73f2bDdFA6F2C1062FD06D866EC4aB864BD98804", owner )


  await governor.execute(
    [token.address],
    [0],
    [token.interface.encodeFunctionData("mint", [owner.address, ethers.utils.parseEther("22000")])],
    keccak256(toUtf8Bytes("Give the owner 22000 more tokens!"))
  );
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});