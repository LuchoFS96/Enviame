import { values, json } from "./json.js";
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
}
console.log(result);
