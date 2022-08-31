import { ethers, providers } from "ethers";
import "@nomiclabs/hardhat-waffle";
import * as dotenv from "dotenv";
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const path = require("path");
const fs = require("fs");
dotenv.config();

const contractData = fs.readFileSync(
  path.resolve(__dirname, "./../artifacts/contracts/Cannes.sol/Cannes.json")
);

const contractParsed = JSON.parse(contractData);

const ABI = contractParsed.abi;
const privateKey = process.env.PRIVATE_KEY;

// scripts/index.js
async function main() {
  // Our code will go here

  // get signer

  const signer = new ethers.Wallet(privateKey, providers.AlchemyProvider());

  const Cannes = new ethers.Contract(contractAddress, ABI, signer);

  await Cannes.safeMint(
    "0x888a7E4DAE1d9009694dEdf240F976EC498D7D90",
    "abusayeed.me"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
