import React, { Component } from "react";
import * as exifData from "piexifjs";
import data from "./data.json";

class imgToBase64 extends Component {
  componentDidMount() {
    (() => {
      const imageName = data.data.imageName;
      const baseImage = data.data.image;
      const previewImage = document.querySelector(".img-preview");
      const imageDetails = data.data.imageDetails;
      const locationLat = data.data.locationLat;
      const locationLng = data.data.locationLng;
      const uploadingTime = data.data.uploadingTime;
      const cameraName = data.data.cameraName;
      const cameraModel = data.data.cameraModel;
      const download = document.querySelector(".download");
      download.setAttribute("download", imageName);
      let zeroth = {};
      let exif = {};
      let gps = {};

      const lat = locationLat;
      const lng = locationLng;
      zeroth[exifData.ImageIFD.Make] = cameraName;
      zeroth[exifData.ImageIFD.Model] = cameraModel;
      zeroth[exifData.ImageIFD.ImageDescription] = imageDetails;
      zeroth[exifData.ImageIFD.DateTime] = uploadingTime;
      gps[exifData.GPSIFD.GPSLatitudeRef] = lat < 0 ? "S" : "N";
      gps[exifData.GPSIFD.GPSLatitude] = exifData.GPSHelper.degToDmsRational(
        lat
      );
      gps[exifData.GPSIFD.GPSLatitudeRef] = lng < 0 ? "W" : "E";
      gps[exifData.GPSIFD.GPSLongitude] = exifData.GPSHelper.degToDmsRational(
        lng
      );

      let exifObj = { "0th": zeroth, Exif: exif, GPS: gps };
      let exifbytes = exifData.dump(exifObj);
      let newData = exifData.insert(exifbytes, baseImage);
      previewImage.src = newData;
      download.href = newData;
    })();
  }
  render() {
    return (
      <div>
        <img className="img-preview" />
        <br />
        <a className="download">Download</a>
      </div>
    );
  }
}

export default imgToBase64;
