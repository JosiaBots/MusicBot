const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const config = require("./scripts/music/config.json");
const http = require('http');
const music = require("./scripts/music/music.js");

app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
      });
     app.listen(process.env.PORT);
      setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
      }, 280000);

client.on("ready", () => {
    console.log('index Ready!');
})

client.login(config.token);
