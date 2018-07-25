const Discord = require('discord.js');
const client = new Discord.Client();
const express = require('express');
const app = express();
const config = require("./scripts/config.json");
const scripts = require("./scripts/modules.js");
const http = require('http');

app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
      });
     app.listen(process.env.PORT);
      setInterval(() => {
        http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
      }, 280000);

client.on("ready", () => {
    console.log('index ready');
})

    
client.login(config.token);