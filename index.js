/**
 * Generic background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
const Storage = require("@google-cloud/storage").Storage;

exports.metaDataUpdater = (data, context) => {
  const fileInfo = data;
  const cacheMetaDataValue = "max-age=31536000, public";
  const storage = new Storage();
  const bucket = storage.bucket(fileInfo.bucket);
  const file = bucket.file(fileInfo.name);
  const metadata = {
    cacheControl: cacheMetaDataValue
  };
  console.log("Changing file metadata:", fileInfo.name);

  //This setTimout is just necessary for avoiding an issue with gcsfuse (which is currently used to upload files) https://github.com/GoogleCloudPlatform/gcsfuse/issues/200
  //When the metadata is concurrently written the file is corrupted and uploaded with a 0 byte size
  setTimeout(function(){
    file.setMetadata(metadata, function(err, apiResponse) {
      console.log("Changed file "+fileInfo.name+" Cache-control metadata to ", cacheMetaDataValue);
    });
  },500)
 
};
