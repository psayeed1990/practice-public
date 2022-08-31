/* eslint-disable no-unused-vars */
import { ethers } from "hardhat";

// eslint-disable-next-line no-unused-vars
const contractAddressRoyalty = "0x1903344651b356Ce3b755458008C0Fe74f8cc1c9";
const contractAddress = "0x3951b4b9C40AABEdbC6002c196CbCE56b964e581";

const amint = async () => {
  const Cannes = await ethers.getContractAt(
    "CannesWithOutCashback",
    contractAddress
  );
  const CannesRoyalty = await ethers.getContractAt(
    "Cannes",
    contractAddressRoyalty
  );

  const name = await CannesRoyalty.symbol();

  // !works for cashback
  const mint = await CannesRoyalty[
    "mintWithTokenURI(address,uint256,string,address[],uint256[],uint256[])"
  ](
    "0x888a7E4DAE1d9009694dEdf240F976EC498D7D90",
    "4",
    "abusayeed.me",
    ["0x888a7E4DAE1d9009694dEdf240F976EC498D7D90"],
    [],
    []
  );

  console.log(name);
  console.log(mint);
};

amint();
