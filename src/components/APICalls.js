import {ROOTURL} from '../containers/App.js';

const getData = async (resourceName = "", array = [], page=1) => {
  if (resourceName === "") {
    return getUrl(ROOTURL);
  }
  const url = ROOTURL + resourceName + "/?page=" + page;
  const fetchedData = await getUrl(url);
  const newArray = array.concat(fetchedData.results);
  const newObject = {};
  newObject[resourceName === "" ? "apiRoot" : resourceName] = newArray;
}

const getUrl = async (url) => {
  const response = await fetch(url);
  const jsoned = await response.json();
  return jsoned;

}

export {getData, getUrl};