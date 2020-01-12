const cleanHost = (url) => {
  let cleanHostName = url;
    
  if (url.includes('www.')) {
    cleanHostName = url.replace('www.', ''); 
  }

  let lastPeriod = cleanHostName.lastIndexOf('.');
  cleanHostName = cleanHostName.substring(0,lastPeriod);

  return cleanHostName;
};

export default cleanHost;