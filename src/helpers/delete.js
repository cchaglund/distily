/* eslint-disable no-undef */

const deleteItem = (data) => {
  browser.runtime.sendMessage({
    type: 'delete',
    data: data
  });

};

export default deleteItem;