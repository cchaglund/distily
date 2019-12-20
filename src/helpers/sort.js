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
  let maxVisits = 0;
  let sortedData = data;

  // get the highest visits value
  if (property === 'visits') {
    let tempUrls = {};

    data.forEach( url => {
      const hrefString = url.href;

      if (! tempUrls[hrefString]) {
        tempUrls[hrefString] = {...url};
      } else {
        tempUrls[hrefString].visits = tempUrls[hrefString].visits + url.visits;
      }
    });

    sortedData = [];

    sortedData = Object.keys(tempUrls).map( item => {
      return tempUrls[item];
    });
    
    sortedData.forEach( item => {
      const itemVisits = parseInt(item.visits);

      if (itemVisits > maxVisits ) {
        maxVisits = itemVisits;
      }
    });

    sortedData = sortedData.map( item => {
      let propor = parseInt(item.visits)/maxVisits;
      let percent = Math.round(propor * 100) / 100;
      item.proportion = percent;
      return item;
    });
  }

  sortedData.sort( (itemA, itemB) => {
    return (itemA[property] < itemB[property]) ? 1 : -1;
  });

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