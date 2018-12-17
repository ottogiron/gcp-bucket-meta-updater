/**
 * Generic background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
const Storage = require("@google-cloud/storage").Storage;

exports.metaDataUpdater = (data, context) => {
  const fileInfo = data;
  const cacheMetaDataValue = "max-age=2628000, public";
  const storage = new Storage();
  const bucket = storage.bucket(fileInfo.bucket);
  const file = bucket.file(fileInfo.name);
  const metadata = {
    cacheControl: cacheMetaDataValue
  };
  console.log("Changing file metadata:", fileInfo.name);
  file.setMetadata(metadata, function(err, apiResponse) {
    console.log("Changed file "+fileInfo.name+" Cache-control metadata to ", cacheMetaDataValue);
  });
};
