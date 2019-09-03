const add = (...numArgs) => numArgs.reduce((prev, curr) => prev + curr);

const listToObject = arrOfObj => {
  const mapArray = arrOfObj.map(object => {
    return {
      [object.name]: object.value
    };
  });
  const newObj = Object.assign({}, ...mapArray);
  return JSON.parse(JSON.stringify(newObj));
};

const objectToList = obj => {
  const listOfArr = Object.entries(obj).map(([key, value]) => {
    const newObj = {
      name: key,
      value: value
    };
    return newObj;
  });
  return JSON.parse(JSON.stringify(listOfArr));
};

const deserialize = obj => {
  let rows = [];
  let rowName = "";
  let total = {};
  Object.keys(obj).forEach((key, index) => {
    const splitKey = key.split("_");
    //get total
    if (splitKey.length === 1) {
      total = { [splitKey[0]]: obj[splitKey] };
    }
    //get rows
    if (splitKey.length === 2) {
      rowName = splitKey[0].slice(0, -1);
      if (!rows.find(row => [splitKey[0]] in row)) {
        rows.push({ [splitKey[0]]: { [splitKey[1]]: obj[key] } });
      } else {
        rows.forEach(row => {
          if ([splitKey[0]] in row) {
            row[splitKey[0]][splitKey[1]] = obj[key];
          }
        });
      }
    }
  });
  const values = rows.map(row => Object.values(row));
  const result = {
    [rowName]: values.reverse().flat(),
    [Object.keys(total)[0]]: Object.values(total)[0]
  };
  return result;
};

export { add, listToObject, objectToList, deserialize };
