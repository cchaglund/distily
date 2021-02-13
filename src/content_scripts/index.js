// console.log('Content scripts has loaded');
// if (document.readyState == 'complete') {
//   convertElements();
  
// } else {
//   document.onreadystatechange = function () {
//     if (document.readyState === 'complete') {
//       convertElements();
//     }
//   };
// }

// const clicked = (el, e) => {
//   e.preventDefault();
//   e.stopPropagation();

//   let clipboard = document.createElement('div');
  
//   clipboard.style.width = '100vw';
//   clipboard.style.height = '100vh';
//   clipboard.style.backgroundColor = 'rgba(120, 120, 100, 0.4';
//   clipboard.style.position = 'absolute';
//   clipboard.style.top = '0';
//   clipboard.style.left = '0';
//   clipboard.style.zIndex = '100';

//   document.body.appendChild(clipboard);
  
//   const newEl = el.cloneNode(true);
//   newEl.style.position = 'absolute';
//   newEl.style.backgroundColor = 'white';
//   newEl.style.top =  e.pageY + 'px';
//   newEl.style.left = e.pageX + 'px';

//   clipboard.appendChild(newEl);

//   el.style.visibility = 'hidden';
// };

// const convertElements = () => {
//   console.log('load finished')
//   let divs = document.getElementsByTagName('div');
//   console.log(divs);

//   for (let div of divs) {
//     div.setAttribute('draggable', 'true');
//     div.onmouseenter = () => div.style.outline = '1px solid red';
//     div.onmouseleave = () => div.style.outline = 'none';
//     // console.log('DIV', div)
//     let positionInfo = div.getBoundingClientRect();
//     // div.style.position = 'absolute';
//     // div.style.top =  positionInfo.y  + 'px';
//     // div.style.left = positionInfo.x + 'px';
//     // div.style.height =  positionInfo.height  + 'px';
//     // div.style.width = positionInfo.width + 'px';
//     div.onclick = () => clicked(div, event);
//     div.ondragstart = () => drag(div, event);
//     div.ondrop = () => drop(event);
//     div.ondragover = () => allowDrop(event);
//   }
// };

// let bod = document.querySelector('body');
// bod.ondrop = () => drop(event);
// bod.ondragover = () => allowDrop(event);

// // add a new element to the DOM
// // let p = document.createElement('p');
// // p.textContent = 'This paragraph was added by a page script.';
// // p.setAttribute('id', 'page-script-para');
// // document.body.appendChild(p);

// let elem;

// function allowDrop(ev) {
//   ev.preventDefault();
// }

// const drag = (el, event) => {
//   console.log('dragging...')
//   console.log(event.target)
//   console.log(event);

//   let positionInfo = el.getBoundingClientRect();
//   console.log(positionInfo)

//   elem = el;
//   // event.dataTransfer.setData('text', event.target.id);
// };

// function drop(ev) {
//   console.log(elem)
//   console.log('drop event', ev)
//   ev.preventDefault();
//   var data = ev.dataTransfer.getData('text');
//   // const elem = document.getElementById(data);
//   // console.log(data)
//   // console.log(document.getElementById(data))

//   elem.style.position = 'absolute';
//   elem.style.top =  ev.pageY + 'px';
//   elem.style.left = ev.pageX + 'px';
//   // bod.appendChild(elem);
// }



// // divs.forEach(div => { 
// //   console.log('sup');
// //   // h3.style.backgroundColor = 'lightblue';
// //   // h3.setAttribute('draggable', 'true');
// //   // h3.setAttribute('ondragstart', drag(event));
// // });

// // document.querySelectorAll('div').forEach(div => { 
// //   console.log('hej?')
// //   div.style.backgroundColor = 'green';
// //   // div.setAttribute('draggable', 'true');
// //   div.setAttribute('ondrop', drop(event));
// //   div.setAttribute('ondragover', allowDrop(event));
// // });

// // document.querySelectorAll('p').forEach(p => {
// //   console.log('porque')
// //   p.style.backgroundColor = 'green';
// // });


// // // document.querySelectorAll('p').forEach(p => { p.style.backgroundColor = 'green'; });
// // // document.querySelectorAll('h2').forEach(p => { p.style.backgroundColor = 'yellow'; });
// // // document.querySelectorAll('a').forEach(p => { p.style.backgroundColor = 'purple'; });