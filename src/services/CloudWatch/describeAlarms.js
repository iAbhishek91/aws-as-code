import { CloudWatch } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const cw = new CloudWatch({ region: REGION, apiVersion: API_VERSIONS.cw });

// API params
const describeAlarmsParams = {};


const describeAlarms = async () => {
  const allAlarms = await cw.describeAlarms(describeAlarmsParams).promise();

  console.log(allAlarms);
};

describeAlarms();
