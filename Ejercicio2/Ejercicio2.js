import { values, json } from "./json.js";

function maxLimitWithCarrierService() {
  let result = {};
  for (let key in json.data) {
    let maxLimitIndex = 0;
    let maxLimit = 0;
    for (let i = 0; i < json.data[key].length; i++) {
      if (maxLimit < json.data[key][i].limit) {
        maxLimitIndex = i;
        maxLimit = json.data[key][i].limit;
      }
    }
    result[key] = { limit: json.data[key][maxLimitIndex].limit };
    result[key].over =
      values[json.data[key][maxLimitIndex].over_carrier_service_id];
    result[key].under =
      values[json.data[key][maxLimitIndex].under_carrier_service_id];
  }
  return result;
}

function maxServiceLocation() {
  let maxLimitLocation = "";
  let maxLimitLocationAux = 0;
  for (let key in json.data) {
    for (let i = 0; i < json.data[key].length; i++) {
      if (maxLimitLocationAux < json.data[key][i].limit) {
        maxLimitLocationAux = json.data[key][i].limit;
        maxLimitLocation = key;
      }
    }
  }
  return maxLimitLocation;
}

function mostServiceUsed() {
  let aux = {};
  let service = "";
  let max = 0;
  for (let key in values) {
    if (!Object.keys(aux).length) {
      aux[values[key].service] = { id: [parseInt(key)], count: 0 };
    } else if (!aux[values[key].service]) {
      aux[values[key].service] = { id: [parseInt(key)], count: 0 };
    } else {
      aux[values[key].service].id.push(parseInt(key));
    }
  }

  for (let key in json.data) {
    for (let i = 0; i < json.data[key].length; i++) {
      for (let auxKey in aux) {
        if (
          aux[auxKey].id.includes(json.data[key][i].over_carrier_service_id) ||
          aux[auxKey].id.includes(json.data[key][i].under_carrier_service_id)
        ) {
          aux[auxKey].count++;
        }
      }
    }
  }
  for (let key in aux) {
    if (aux[key].count > max) {
      max = aux[key].count;
      service = key;
    }
  }
  return service;
}

console.log(mostServiceUsed());
