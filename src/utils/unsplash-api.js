import Unsplash from 'unsplash-js';
import fetch from 'node-fetch';

global.fetch = fetch;
const unsplash = new Unsplash({ accessKey: process.env.REACT_APP_API_KEY });

export default unsplash;