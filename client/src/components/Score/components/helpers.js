export const matchArrToArrOfObj = (firstArr, secondArr, fnToMap) => {
  let objToMap = {};

  for (let i = 0; i < firstArr.length; i += 1) {
    objToMap[firstArr[i]] = secondArr[i];
  }

  const matchedArrOfObj = Object.entries(objToMap).map(fnToMap);

  return matchedArrOfObj;
};
