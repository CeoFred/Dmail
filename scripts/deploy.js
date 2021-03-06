// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.
async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is avaialble in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

   const DmailTokenFactory = await hre.ethers.getContractFactory('Token');
  const DmailToken = await DmailTokenFactory.deploy(1000000 * 10^18);
   await DmailToken.deployed();
  console.log("Dmail Token Contract deployed to:", DmailToken.address);
  const DmailTokenAddress = await DmailToken.address

  const DmailFactory = await hre.ethers.getContractFactory('Dmail');
  const Dmail = await DmailFactory.deploy(DmailTokenAddress);
  await Dmail.deployed();
  console.log("Dmail Core Smart Contract deployed to:", Dmail.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(Dmail);

}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ Dmail: token.address }, undefined, 2)
  );

  const DmailArtifact = artifacts.readArtifactSync("Dmail");

  fs.writeFileSync(
    contractsDir + "/Dmail.json",
    JSON.stringify(DmailArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
