const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const shell = require("shelljs");
const { getUrl } = require("./models/video");
const { convertMp4toPCM } = require("./models/audio");
const { listDir } = require("./models/folder");

const { createLives, updateLives } = require("./models/db");

const dirMp4 = listDir("./downloads", ".mp4");

program
  .argument("<username>", "live username")
  .option(
    "--output <path>",
    "output file or folder path (eg ./folder or ./folder/file.mp4)",
    "downloads"
  )
  .option("--format <format>", "output format", "mp4");

program.parse();
let child = "";
const options = program.opts();
const args = program.args;

const format = options.format;
if (format != "mp4") {
  console.error("🛑 Only mp4 format is supported at the moment");
  process.exit(1);
}

const input = args[0];
const username = input.startsWith("@") ? input.substring(1) : input;
const url = `https://www.tiktok.com/@${username}/live`;

console.log(`🟢 The server started`);

getUrl(username, options).then((response) => {
  let { liveUrl, fileName, title } = response;

  let idLive = createLives(username, title, fileName);

  child = shell.exec(
    `ffmpeg -i ${liveUrl} -c copy ${fileName}`,
    function (code, stdout, stderr) {
      console.log("🛑 Exit code:", code);

      // Listar
      dirMp4.forEach((file) => {
        convertMp4toPCM(file);
      });
      listDir("./downloads", ".pcm");
      console.log(`🛑 The server stopped finished`);
      setTimeout(() => process.exit(0), 5000);
    }
  );
});

let callAmount = 0;
process.on("SIGINT", function () {
  if (callAmount < 1) {
    console.log(`🛑 The server initiated the stop`);
    shell.echo("q");
  }

  callAmount++;
});
