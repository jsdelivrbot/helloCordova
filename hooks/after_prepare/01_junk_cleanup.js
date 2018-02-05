#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var foldersToProcess = [
    "app"
];

var iosPlatformsDir = "platforms/ios/www/";
var androidPlatformsDir = "platforms/androids/assets/www/";

foldersToProcess.forEach(function(folder) {
    processFiles(iosPlatformsDir + folder);
})

function processFiles(dir) {
    fs.readdir(dir, function(err, list){
        if (err) {
            console.log(err);
            return ;
        }

        list.forEach(function(file){
            file = dir + '/' + file;
            fs.stat(file, function (err, stat){
                if (!stat.isDirectory()) {
                    let fileName = path.basename(file);
                    switch (fileName) {
                        case ".DS_Store":
                            fs.unlink(file, function(error) {
                                console.log("Removed file" + file);
                            });
                            break;
                        case "Thumbs.db":
                            fs.unlink(file, function(error) {
                                console.log("Removed file" + file);
                            });
                            break;
                        default:
                            if (!(
                                fileName.endsWith(".css") || 
                                fileName.endsWith(".html") || 
                                fileName.endsWith(".json") || 
                                fileName.endsWith(".png") || 
                                fileName.endsWith(".jpg") || 
                                fileName.endsWith(".jpeg") || 
                                fileName.endsWith(".gif") || 
                                fileName.endsWith(".woff") || 
                                fileName.endsWith(".woff2") 
                            ) && fileName !== "bundle.js") {
                                fs.unlink(file, function(error) {
                                    console.log("Removed file" + file);
                                });
                            } else {
                                console.log("Skipping file" + file);
                            }
                            break;
                    }
                } else {
                    processFiles(file);
                }
            })
        });
    });
}