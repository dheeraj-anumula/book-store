import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3, PutObjectCommand } from "@aws-sdk/client-s3";
import { BUCKET } from "../constants";

export const importProductsFile = async (event) => {
  let statusCode = 200;
  let body = {};

  try {
    const fileName = event.queryStringParameters.name;

    if (!fileName) {
      statusCode = 400;
      return {
        statusCode,
      };
    }
    const catalogPath = `uploaded/${fileName}`;

    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      ContentType: "text/csv",
    };
    const putCommand = new PutObjectCommand(params);

    const s3Client = new S3();
    body = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });
  } catch (error) {
    console.error(error);
    statusCode = 500;
    return {
      statusCode,
      body: error,
    };
  }

  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body,
  };
};

export default importProductsFile;
