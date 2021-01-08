const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library
const messageUtils = require("./messageUtils.js");

const client = new Discord.Client(); // creates a discord client
const token = fs.readFileSync("token.txt").toString(); // gets your token from the file

client.once("ready", () => { // prints "Ready!" to the console once the bot is online
	console.log("Ready!");
});

client.on("message", message => { // runs whenever a message is sent

        if (message.author.bot) return;
        else if (message.content.startsWith("?quote")) { // checks if the message says "?random"
        
        //find if there's a member with the name
        let target = message.mentions.members.first();

        if (target == null) {
            message.channel.send("No user has been specified!");
        } 
        else {
            messageUtils.findMessages(100, target, message.guild)
            .then((arr) => {
                let quotation = arr[Math.floor(Math.random() * arr.length)];
                
                if (quotation === undefined) {
                    message.channel.send("I had trouble finding a quotation for " + target.displayName + ".");
                }
                else {

                message.channel.send("**" + target.displayName + "** at " + quotation.createdAt.toUTCString() + ":\n" +
                    quotation.content.toString());
                }

                //console.log(quotation);
            });
            

        }
    }

    
    
    //const number = Math.random(); // generates a random number
         // sends a message to the channel with the number
    //}
});

client.on("ready", () => {
    client.user.setActivity("my code", { type: "WATCHING"})
})

client.login(token); // starts the bot up