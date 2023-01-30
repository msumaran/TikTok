const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const shell = require("shelljs");
const speech = require("@google-cloud/speech");

const client = new speech.SpeechClient();

("use strict");

// Transcribe audio to text using Google Speech-to-Text API
exports.transcribe = async function (gcsUri) {
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "es-PE",
    enableWordTimeOffsets: true,
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();
  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);
  return transcription;
};

//convert mp4 to pcm
exports.convertMp4toPCM = async function (file) {
  let filePcm = file + ".pcm";
  console.log(filePcm);
  fs.open(filePcm, "r", (err, fd) => {
    if (err !== null) {
      if (
        shell.exec(
          `ffmpeg -i ${file}  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 ${filePcm}`
        ).code == 0
      ) {
        if (
          shell.exec(`gcloud storage cp ${filePcm} gs://tiktoklive`)
            .code == 0
        ) {
          return "gs://tiktoklive/" + filePcm;
        }
      }
    }else{
        console.log(`file already exist ${file}`);
    }
  });
};
