import axios from 'axios';
//using this library to convert lat long from map to zip
//for indeed job search
import reverseGeocode from 'latlng-to-zip';
//qs is a library that constructs query strings
import qs from 'qs';

import {
  FETCH_JOBS
} from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
//using this object to build query string for api
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

//don't need return statement if only returning one function
export const fetchJobs = (region) => async (dispatch) => {
  //try/catch to catch any errors in library
  try {
    //pass the entire region in as it has lat/long
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    console.log(data);
  } catch(e) {
    console.error(e);
  }
};
