// import { Blob } from "buffer";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM(`...`).window;

const { Blob } = require("buffer");
const googleapis = require("googleapis");
const fs = require("fs");

// Replace these values with your own
const API_KEY = "AIzaSyCxe6OWMTvEdRYAsH8W4ucFTt6nen3SyMQ";
const CHANNEL_ID = "UCL5YbN5WLFD8dLIegT5QAbA"; // Agadmator's channel ID

// Set up the YouTube Data API client
const youtube = googleapis.google.youtube({
  version: "v3",
  auth: API_KEY,
});

// Function to retrieve video descriptions
async function getVideoDescriptions() {
  const videoDescriptions = [];

  // Get the uploads playlist ID for the channel
  const channelResponse = await youtube.channels.list({
    part: "contentDetails",
    id: CHANNEL_ID,
  });
  // console.log("channel response", channelResponse);
  const uploadsPlaylistId =
    channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;

  // Get all the video IDs from the uploads playlist
  let nextPageToken = "";
  while (nextPageToken !== undefined) {
    const playlistItemsResponse = await youtube.playlistItems.list({
      part: "snippet",
      maxResults: 50,
      playlistId: uploadsPlaylistId,
      pageToken: nextPageToken,
    });
    for (const item of playlistItemsResponse.data.items) {
      const videoDescription = item.snippet.description;
      videoDescriptions.push(videoDescription);
    }
    nextPageToken = playlistItemsResponse.data.nextPageToken;
  }
  console.log("vid descriptions", videoDescriptions);
  return videoDescriptions;
}

// Call the function to get all video descriptions
getVideoDescriptions().then((videoDescriptions) => {
  // Save video descriptions to a text file
  const text = videoDescriptions.join("\n");
  // const file = new Blob([text], { type: "text/plain" });

  fs.writeFile("/Users/Tumus/vidDescriptions.txt", text, (err) => {
    if (err) {
      console.error(err);
    }
  });
  // const a = document.createElement("a");
  // a.href = URL.createObjectURL(file);
  // a.download = "agadmator_video_descriptions.txt";
  // a.click();
  console.log("Video descriptions saved to agadmator_video_descriptions.txt");
});
