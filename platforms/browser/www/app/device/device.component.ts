import { Component } from '@angular/core';
@Component({
    template: `
    <h5>Device Component</h5>
    <button (click)="populateDeviceDetails()">Populate Device Info</button>
    <div [innerHTML]="deviceDetails">
    </div><br/>
    <button (click)="openCamera()">Use Camera</button>
    <div id="imageFile">
        <img alt="test image"/>
    </div><br/>
    <button (click)="mediaCapture('image')">Media Capture Image</button><br/>
    <button (click)="mediaCapture('video')">Media Capture Video</button><br/>
    <div id="videoFile">
        <video controls>
            <source src="" type="video/mp4">
        </video>
    </div><br/>
    `
})

export class DeviceComponent {
    private deviceDetails = "";
    //private imageFile = "";
    populateDeviceDetails() {
        var device:Device = (<any>window).device;
        this.deviceDetails = "";
        this.deviceDetails += "<br/>Cordova:" + device.cordova;
        this.deviceDetails += "<br/>model:" + device.model;
        this.deviceDetails += "<br/>platform:" + device.platform;
        this.deviceDetails += "<br/>uuid:" + device.uuid;
        this.deviceDetails += "<br/>version:" + device.version;
        this.deviceDetails += "<br/>manufacturer:" + device.manufacturer;
        this.deviceDetails += "<br/>isVirtual:" + device.isVirtual;
        this.deviceDetails += "<br/>serial:" + device.serial;
    }

    setOptions(srcType) {
        var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    }

    openCamera(selection) {
 
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = this.setOptions(srcType);
        var func = this.displayImage;
     
        navigator.camera.getPicture(function cameraSuccess(imageUri) {            
            console.debug("test test: " + imageUri, " app");           
           func(imageUri);

            // You may choose to copy the picture, save it somewhere, or upload.
            //func(imageUri);
        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");     
        }, options);
    }

    displayImage(imgUri) {
        document.getElementById("imageFile").getElementsByTagName("img")[0].src = imgUri ;
    }

    displayVideo(fullPath) {
        document.getElementById("videoFile").getElementsByTagName("video")[0].src = fullPath ;
    }

    mediaCapture(selection){
        var func = this.displayImage;
        var funcVid = this.displayVideo;

        if (selection == "image"){
            navigator.device.capture.captureImage(function captureSuccess(mediaFiles){
                console.debug("test mediaFiles: " + mediaFiles[0].fullPath, " app");
                func(mediaFiles[0].fullPath);
            },
            function captureError(error){
                console.debug("Unable to obtain picture: " + error, "app");
            },{limit:2});
            // navigator.device.capture.captureImage(
            //     function(mediaFiles) {
            //         var i, path, len;
            //         for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            //             path = mediaFiles[i].fullPath;
            //             // do something interesting with the file
            //         }
            //     },
            //     function(error) {
            //         //navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
            //         console.debug('Error code: ' + error.code, null, 'Capture Error');
            //     },
            //     {limit:2});
        }
        if (selection == "video"){
            navigator.device.capture.captureVideo(function captureSuccess(mediaFiles){
                console.debug("test mediaFiles: " + mediaFiles[0].fullPath, " app");
                funcVid(mediaFiles[0].fullPath);
            },
            function captureError(error){
                console.debug("Unable to obtain picture: " + error, "app");
            },{limit:1});
        }
    }

}