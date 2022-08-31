import { ethers } from "hardhat";

const contractAddress = "0x8CcdA5725788996a9b4Fbb167ED4bdaf4BAC988b";

const mint = async () => {
  const Nft = await ethers.getContractAt("NFTWithOutCashback", contractAddress);

  //   // !mint a token
  //   const mint = await Nft.mintWithTokenURI(
  //     "0x888a7E4DAE1d9009694dEdf240F976EC498D7D90",
  //     "1",
  //     "abusayeed.me",
  //     {
  //       gasLimit: 2000000,
  //       gasPrice: ethers.utils.parseUnits("10", "gwei"),
  //     }
  //   );

  //   console.log(mint);

  //   const approve = await Nft.approve(
  //     "0x7542A9d09589B21b5a671e14254318D2016A0A0c",
  //     "1",
  //     {
  //       gasLimit: 2000000,
  //       gasPrice: ethers.utils.parseUnits("10", "gwei"),
  //     }
  //   );

  //   console.log(approve);

  //   // transfer a token
  //   const safeTransfer = await Nft["safeTransfer(address,uint256)"](
  //     "0x928A8eA1d581AA91E7a0C7796B974AfB5EEe2b87",
  //     "1",
  //     {
  //       gasLimit: 2000000,
  //       gasPrice: ethers.utils.parseUnits("10", "gwei"),
  //     }
  //   );

  //   console.log(safeTransfer);

  // transferFrom a token
  const transferFrom = await Nft.transferFrom(
    "0x888a7E4DAE1d9009694dEdf240F976EC498D7D90",
    "0x928A8eA1d581AA91E7a0C7796B974AfB5EEe2b87",
    "1",
    {
      gasLimit: 2000000,
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
    }
  );

  console.log(transferFrom);
};

mint();
