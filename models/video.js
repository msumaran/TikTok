("use strict");
const fs = require("fs");
const path = require("path");

// Transcribe audio to text using Google Speech-to-Text API
exports.getUrl = async function (username, options) {
    const url = `https://www.tiktok.com/@${username}/live`;

    let response = await fetch(url)
      .then((res) => {
        return res.text();
      })
      .then(async (body) => {
        const matches = body.match(/room_id=(\d+)/);
    
        if (!matches) {
          console.log("No live stream found.");
          process.exit(0);
        }
    
        const roomId = matches[1];
    
        const apiURL = `https://www.tiktok.com/api/live/detail/?aid=1988&roomID=${roomId}`;
    
        const res = await (await fetch(apiURL)).json();
 
    
        const fileName = options.output.endsWith(options.format)
          ? options.output
          : `${options.output.replace(/\/$/, "")}/${username}-${Date.now()}.mp4`;
    
        fs.mkdirSync(path.dirname(fileName), { recursive: true });
    
        console.log(`Downloading to ${fileName}`);
    
        res.LiveRoomInfo.fileName = fileName;
        return res.LiveRoomInfo;
    
    
      });

    return await response;
};
