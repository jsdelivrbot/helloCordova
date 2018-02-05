"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var DeviceComponent = (function () {
    function DeviceComponent() {
        this.deviceDetails = "";
    }
    DeviceComponent.prototype.populateDeviceDetails = function () {
        var device = window.device;
        this.deviceDetails = "";
        this.deviceDetails += "<br/>Cordova:" + device.cordova;
        this.deviceDetails += "<br/>model:" + device.model;
        this.deviceDetails += "<br/>platform:" + device.platform;
        this.deviceDetails += "<br/>uuid:" + device.uuid;
        this.deviceDetails += "<br/>version:" + device.version;
        this.deviceDetails += "<br/>manufacturer:" + device.manufacturer;
        this.deviceDetails += "<br/>isVirtual:" + device.isVirtual;
        this.deviceDetails += "<br/>serial:" + device.serial;
    };
    DeviceComponent.prototype.setOptions = function (srcType) {
        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true
        };
        return options;
    };
    DeviceComponent.prototype.openCamera = function (selection) {
        var srcType = Camera.PictureSourceType.CAMERA;
        var options = this.setOptions(srcType);
        var func = this.displayImage;
        navigator.camera.getPicture(function cameraSuccess(imageUri) {
            console.debug("test test: " + imageUri, " app");
            func(imageUri);
        }, function cameraError(error) {
            console.debug("Unable to obtain picture: " + error, "app");
        }, options);
    };
    DeviceComponent.prototype.displayImage = function (imgUri) {
        document.getElementById("imageFile").getElementsByTagName("img")[0].src = imgUri;
    };
    DeviceComponent.prototype.displayVideo = function (fullPath) {
        document.getElementById("videoFile").getElementsByTagName("video")[0].src = fullPath;
    };
    DeviceComponent.prototype.mediaCapture = function (selection) {
        var func = this.displayImage;
        var funcVid = this.displayVideo;
        if (selection == "image") {
            navigator.device.capture.captureImage(function captureSuccess(mediaFiles) {
                console.debug("test mediaFiles: " + mediaFiles[0].fullPath, " app");
                func(mediaFiles[0].fullPath);
            }, function captureError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, { limit: 2 });
        }
        if (selection == "video") {
            navigator.device.capture.captureVideo(function captureSuccess(mediaFiles) {
                console.debug("test mediaFiles: " + mediaFiles[0].fullPath, " app");
                funcVid(mediaFiles[0].fullPath);
            }, function captureError(error) {
                console.debug("Unable to obtain picture: " + error, "app");
            }, { limit: 1 });
        }
    };
    DeviceComponent = __decorate([
        core_1.Component({
            template: "\n    <h5>Device Component</h5>\n    <button (click)=\"populateDeviceDetails()\">Populate Device Info</button>\n    <div [innerHTML]=\"deviceDetails\">\n    </div><br/>\n    <button (click)=\"openCamera()\">Use Camera</button>\n    <div id=\"imageFile\">\n        <img alt=\"test image\"/>\n    </div><br/>\n    <button (click)=\"mediaCapture('image')\">Media Capture Image</button><br/>\n    <button (click)=\"mediaCapture('video')\">Media Capture Video</button><br/>\n    <div id=\"videoFile\">\n        <video controls>\n            <source src=\"\" type=\"video/mp4\">\n        </video>\n    </div><br/>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], DeviceComponent);
    return DeviceComponent;
}());
exports.DeviceComponent = DeviceComponent;
//# sourceMappingURL=device.component.js.map