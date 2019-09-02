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
  const mappedResult = Object.entries(obj).map(([key, value]) => {
    const splitKey = key.split("_");
    if (splitKey.length < 2) {
      const total = { [splitKey]: value };
      return total;
    }
    const rowName = splitKey[0].slice(0, -1);
    const row = {
      [rowName]: {
        [splitKey[1]]: value
      }
    };
    return row;
  });

  const newObj = Object.assign({}, ...mappedResult);
  return JSON.parse(JSON.stringify(newObj));
};

export { add, listToObject, objectToList, deserialize };
