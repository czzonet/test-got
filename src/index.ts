import { createWriteStream } from "fs";
import got from "got-cjs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

console.log(0);
const updateFileUrl = "http://127.0.0.1:5544/files/update.asar";
const destinationFile = path.resolve(__dirname, "./update.asar");

async function main() {
  const readStream = got.stream(updateFileUrl);
  readStream.on("error", (d: any) => {
    console.log("[E]", d);
  });
  await pipelineAsync(readStream, createWriteStream(destinationFile));
}

main();
