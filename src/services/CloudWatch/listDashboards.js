import { CloudWatch } from 'aws-sdk';
import { REGION, API_VERSIONS } from '../../constants';


const cw = new CloudWatch({ region: REGION, apiVersion: API_VERSIONS.cw });

// API params
const listDashboardsParam = {};


const listDashboards = async () => {
  const allDashboards = await cw.listDashboards(listDashboardsParam).promise();

  console.log(allDashboards);
};

listDashboards();
