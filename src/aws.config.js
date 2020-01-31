// refer: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html

/* The password file is not version-controlled,
 * please create a password.js file under src folder and export the const imported here. */

import * as AWS from 'aws-sdk';
import { SECRET_ACCESS_KEY, ACCESS_KEY_ID } from './password';
import { REGION, API_VERSIONS } from './constants';

// API parameters
const configParams = {
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
  region: REGION,
  apiVersions: API_VERSIONS,
};


export default () => {
  // AWS.Config is a class used to create the configuration object used by all the service.
  /* In order to set global configuration options,
  * properties should be assigned to the global AWS.config object. */
  AWS.config = new AWS.Config(configParams);
  return AWS;
};
