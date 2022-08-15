import { S3 } from "@aws-sdk/client-s3";
import csv from "csv-parser";
import { BUCKET } from "../constants";

export const importFileParser = async (event) => {
  console.log(JSON.stringify(event.Records));
  let statusCode = 202;
  try {
    const s3Client = new S3();
    const record = event.Records[0];
    const { key } = record.s3.object;
    const params = {
      Bucket: BUCKET,
      Key: key,
    };
    const response = await s3Client.getObject(params);
    const results = [];
    for await (const chunk of response.Body.pipe(csv())) {
      console.log(JSON.stringify(chunk));
      results.push(chunk);
    }

    const objectCopyParams = {
      Bucket: BUCKET,
      CopySource: `${BUCKET}/${key}`,
      Key: key.replace("uploaded", "parsed"),
    };

    await s3Client.copyObject(objectCopyParams);
    await s3Client.deleteObject(params);
  } catch (err) {
    statusCode = 500;
    console.log(err);
  }
  return {
    statusCode,
  };
};

export default importFileParser;
