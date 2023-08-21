const { ethers } = require("hardhat");

async function main() {
    try{
        const [owner, otherAccount] = await ethers.getSigners();

        const token = await ethers.getContractAt("MyToken", "0xaE4C1ac8d7e63fE8e24F2bF76d75934Ab1f55b83", owner)
  const governor = await ethers.getContractAt("MyGovernor", "0x73f2bDdFA6F2C1062FD06D866EC4aB864BD98804", owner )


        const delegated = await token.delegate(owner.address);
        
        const proposalId = ethers.BigNumber.from("71702698372088515910714054907285886539902685487294407608326377341511395948454");
      
        console.log("Proposal Id: ", proposalId);
              
        const tx = await governor.castVote(proposalId, "1");      
        
        console.log("voting: ", tx)
    }
    catch(e){
        console.log(e);
    }
  

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});