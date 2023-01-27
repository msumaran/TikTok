
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const shell = require("shelljs");




fs.readdirSync('./downloads').forEach(file => {
    let file_mp3 = file+'.mp3';
    fs.open('./downloads/'+file_mp3, 'r', (err, fd) => {
        
        if (err !== null) {
            if ( shell.exec(`ffmpeg -i downloads/${file} downloads/${file}.mp3`).code == 0) {

                shell.exec(`gcloud storage cp downloads/${file}.mp3 gs://tiktoklive`);
                
            }
        }
    });
   
});

