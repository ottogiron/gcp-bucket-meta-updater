# Google Cloud Storage File Meta Data Updater

Updates the metadata of a file when the file is created in a bucket.

## Deploying in GCP

```
gcloud functions deploy metadataUpdater --runtime nodejs8 --trigger-resource [bucket_name] --trigger-event google.storage.object.finalize
```

