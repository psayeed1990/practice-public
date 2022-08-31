/* eslint-disable no-unused-vars */
import { ethers } from "hardhat";

// eslint-disable-next-line no-unused-vars
const contractAddressRoyalty = "0x1903344651b356ce3b755458008c0fe74f8cc1c9";
const contractAddress = "0x3951b4b9C40AABEdbC6002c196CbCE56b964e581";

const mint = async () => {
  const Cannes = await ethers.getContractAt(
    "CannesWithOutCashback",
    contractAddress
  );
  const CannesRoyalty = await ethers.getContractAt(
    "Cannes",
    contractAddressRoyalty
  );

  const name = await CannesRoyalty.symbol();

  //   // transfer
  const safeTransferFrom = await CannesRoyalty[
    "safeTransferFrom(address,address,uint256)"
  ](
    "0x888a7E4DAE1d9009694dEdf240F976EC498D7D90",
    "0x7542A9d09589B21b5a671e14254318D2016A0A0c",
    "4",
    {
      from: "0x888a7E4DAE1d9009694dEdf240F976EC498D7D90",
      gasLimit: 2000000,
      gasPrice: ethers.utils.parseUnits("10", "gwei"),
      value: ethers.utils.parseEther("0"),
    }
  );
  console.log(safeTransferFrom);
  console.log(name);
};

mint();
