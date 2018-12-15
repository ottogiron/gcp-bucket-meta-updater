/**
 * Generic background Cloud Function to be triggered by Cloud Storage.
 *
 * @param {object} data The event payload.
 * @param {object} context The event metadata.
 */
const Storage = require("@google-cloud/storage").Storage;

exports.metadataUpdater = (data, context) => {
  const fileInfo = data;

  const storage = new Storage();
  const bucket = storage.bucket(fileInfo.bucket);
  const file = bucket.file(fileInfo.name);
  const metadata = {
    cacheControl: "max-age=2592000, public"
  };

  file.setMetadata(metadata, function(err, apiResponse) {});
};
