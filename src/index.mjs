import {
  L2Block,
  createPXEClient,
} from "@aztec/aztec.js";

const { PXE_URL = "http://localhost:8080" } = process.env;

async function main() {
  const pxe = createPXEClient(PXE_URL);

  const nbr = await pxe.getBlockNumber();
  console.log("Current block number: ", nbr);
  const block = await pxe.getBlock(nbr);

  const jsonString = JSON.stringify(block, null, 2);
  const recreatedObj = L2Block.fromFields(JSON.parse(jsonString));
  // console.log(`Fields: ${JSON.stringify(recreatedObj, null, 2)}`);
  console.log(recreatedObj.header.globalVariables.blockNumber);
  console.log(`Fields: ${recreatedObj.hash()}`);
}

main().catch((err) => {
  console.error(`Error in app: ${err}`);
  process.exit(1);
});
