import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";

const generatePolicy = (principalId, resource, effect) => ({
  principalId,
  policyDocument: {
    Version: "2012-10-17",
    Statement: {
      Action: "execute-api:Invoke",
      Effect: effect,
      Resource: resource,
    },
  },
});

const EFFECT = {
  allow: "Allow",
  deny: "Deny",
};

const basicAuthorizer = async (event) => {
  const {
    headers: { Authorization },
  } = event;
  console.log("event", JSON.stringify(event));
  const credentials = Authorization;

  if (!credentials) {
    console.error("Unauthorzied");
    return generatePolicy("None", event.methodArn, EFFECT.deny);
  }

  try {
    const buffer = Buffer.from(credentials.split(" ")[1], "base64");
    const [username, password] = buffer.toString("utf-8").split(":");

    const storePassword = process.env[username];
    console.log(JSON.stringify(process.env));
    console.log(username, password, storePassword);
    const effect =
      storePassword && storePassword === password ? EFFECT.allow : EFFECT.deny;
    return generatePolicy(credentials, event.methodArn, effect);
  } catch (err) {
    console.error(`Server Error: ${err}`);
    return generatePolicy("None", event.methodArn, EFFECT.deny);
  }
};

export default middy(basicAuthorizer).use(middyJsonBodyParser());
