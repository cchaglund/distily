const settings = () => {
  return {
    blacklist: {
      title: 'Blacklisted urls',
      entries: {
        'gmail.com': null,
        'outlook.com': null,
        'google.com/search': null
      }
    },
    resuming: {
      title: 'Choose how to resume by default',
      entries: {
        'top': true,
        'recent': false,
        'fresh': false,
      }
    }
  };
};

export default settings;