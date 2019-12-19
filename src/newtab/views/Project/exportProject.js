const exportProject = (function () {
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  return function (data, fileName) {
    var json = JSON.stringify(data),
      blob = new Blob([json], {type: 'octet/stream'}),
      url = window.URL.createObjectURL(blob);
    console.log(json);
    a.href = url;
    a.download = 'distily_' + fileName.split(' ').join('-') + '.json';
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());

export default exportProject;