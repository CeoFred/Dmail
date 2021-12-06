const main = async () => {
  const DmailTokenFactory = await hre.ethers.getContractFactory('Token');
  const DmailToken = await DmailTokenFactory.deploy(1000000 * 10^18);
  await DmailToken.deployed();
  console.log("Dmail Token Contract deployed to:", DmailToken.address);
  const DmailTokenAddress = await DmailToken.address

  const DmailFactory = await hre.ethers.getContractFactory('Dmail');
  const Dmail = await DmailFactory.deploy(DmailTokenAddress);
  await Dmail.deployed();
  console.log("Dmail Smart Contract deployed to:", Dmail.address);

};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();