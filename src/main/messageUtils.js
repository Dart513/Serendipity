const Discord = require("discord.js"); // imports the discord library
const fs = require("fs"); // imports the file io library
const { resolve } = require("path");

async function findMessages(max, user, guild) {

    var catalog = new Array();
    var newestMessages = new Map();//TODO: Implement
    let returnedFunction = new Promise((resolveFinal, reject) => {
        let catalogFunction = new Promise((resolveFunc, rejectFunc) => {
                var loops = 0;
                guild.channels.cache.forEach((ch) => {
                    
                    if (ch.type === 'text') {
                        ch.messages.fetch({
                            limit: 100
                        }).then(messages => {
                            const msgs = messages.filter(m => (m.author.id === user.id && m.content.trim() != "" && m.content !== undefined))
                            msgs.forEach(m => {
                                catalog.push(m);
                            })
                            
                        })
                        .then(() => {
                            loops++;
                            if (loops === guild.channels.cache.array().length) {
                                resolveFunc();
                            }
                        });
                    } else {
                        loops++;
                        if (loops === guild.channels.cache.array().length) {
                            resolveFunc();
                        }
                    }

                    
                });

                setTimeout(() => {rejectFunc("Timed Out")}, 3000);
                
            });
            
            catalogFunction.then(() => {
                while (catalog.length > max) {
                    catalog.pop(Math.round(Math.random() * max));
                    if (catalog.length <= max) {
                        resolve();
                    }
                }
            })
            .then(() => {
                resolveFinal(catalog);
            })
            .catch(console.error);
        });

        return returnedFunction;

}

var messageUtils = module.exports = {findMessages};