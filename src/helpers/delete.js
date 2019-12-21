/* eslint-disable no-undef */

const deleteItem = (data) => {
  console.log(data);
  browser.runtime.sendMessage({
    type: 'delete',
    data: data
  });

};

export default deleteItem;