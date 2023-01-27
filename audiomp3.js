
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const shell = require("shelljs");
const speech = require('@google-cloud/speech');

const client = new speech.SpeechClient();

async function quickstart(gcsUri) {
    // The path to the remote LINEAR16 file
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      uri: gcsUri,
    };
    const config = {
      encoding: 'LINEAR16',
      sampleRateHertz: 16000,
      languageCode: 'es-PE',
      enableWordTimeOffsets: true
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio file
    const [operation] = await client.longRunningRecognize(request);
    const [response] = await operation.promise();
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
  }

fs.readdirSync('./downloads').forEach(file => {
    let file_mp3 = file+'.pcm';
    fs.open('./downloads/'+file_mp3, 'r', (err, fd) => {
        
        if (err !== null) {
            if ( shell.exec(`ffmpeg -i downloads/${file}  -acodec pcm_s16le -f s16le -ac 1 -ar 16000 downloads/${file}.pcm`).code == 0) {
                if ( shell.exec(`gcloud storage cp downloads/${file_mp3} gs://tiktoklive`).code == 0) {

                    quickstart('gs://tiktoklive/'+file_mp3);
                }
            }
        }
    });
   
});

