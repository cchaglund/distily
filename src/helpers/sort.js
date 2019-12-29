const sort = (data, type) => {
  let sorted = sortBy(type, data);

  switch (type) {
    case 'host':
      sorted = sortByHost(data);
      break;
    default:
      sorted = sortBy(type, data);
  }

  return sorted;
};

const sortBy = (property, data) => {
  let maxCount = 0;
  let sortedData = data;

  // get the highest combined visits and focuses value
  if (property === 'top') {
    let tempUrls = {};

    data.forEach( url => {
      const hrefString = url.href;

      if (! tempUrls[hrefString]) {
        tempUrls[hrefString] = {...url};
      } else {
        tempUrls[hrefString].visits = tempUrls[hrefString].visits + url.visits;
        tempUrls[hrefString].focuses = tempUrls[hrefString].focuses + url.focuses;
      }
    });

    sortedData = [];

    sortedData = Object.keys(tempUrls).map( item => {
      tempUrls[item].activity = parseInt(tempUrls[item].focuses) + parseInt(tempUrls[item].visits);
      return tempUrls[item];
    });
    
    sortedData.forEach( item => {
      if ( item.activity > maxCount ) {
        maxCount = item.activity;
      }
    });

    sortedData = sortedData.map( item => {
      let propor = item.activity/maxCount;
      let percent = Math.round(propor * 100) / 100;
      item.proportion = percent;
      return item;
    });
  }

  if (property === 'top') {
    sortedData.sort( (itemA, itemB) => {
      return (itemA.activity < itemB.activity) ? 1 : -1;
    });
  } else {
    sortedData.sort( (itemA, itemB) => {
      return (itemA[property] < itemB[property]) ? 1 : -1;
    });
  }

  return sortedData;
};

const sortByHost = (data) => {
  let hosts = {};

  data.forEach( item => {
    if (!hosts[item.host]) {
      hosts[item.host] = [];
    }
    hosts[item.host].push(item);
  });

  return hosts;
};

export default sort;