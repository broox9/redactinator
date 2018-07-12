//PageData is from window
const currentCensors = PageData.censors;

const imageSection = document.querySelector('.image-section')
const dropzone = document.querySelector('.image-section__dropzone')
const mainImage = document.querySelector('#main-image')
const submitButton = document.querySelector('#save-image')
const newCensorButton = document.querySelector('#new-censor')

newCensorButton.addEventListener('click', createNewCensor)

function initDropZone(element) {
  element.setAttribute('ondrop', 'ondrop(event)');
  element.setAttribute('ondragover', 'onDragOver(event)')
}

initDropZone(dropzone)

/** */
// function submitImage(img_id) {
//   fetch('/api/update_image', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json; charset=utf-8'
//     },
//     body: JSON.stringify({
//       img_id,
//       redaction_status: "redaction_complete"
//     })
//   })
//     .then(res => {
//       console.log('Success', res.json())
//       window.location = '/'
//     })
//     .catch(console.error)
// }


/** */
function createNewCensor() {
  const id = currentCensors.length + 1;

  const div = document.createElement('div')
  div.className = 'censor-box'
  div.id = id;
  div.setAttribute('draggable', true)
  // div.setAttribute('ondragstart', 'dragStartEvent(event)')
  div.ondragstart = dragStartEvent
  div.ondragend = dragEnd
  // onmousedown = trackWithMouse(div)
  div.innerText = id

  currentCensors.push({ id, top: 0, left: 0, height: 40, width: 40 })

  console.log('new div', div)
  dropzone.appendChild(div);
}


function dragEnd(e) {
  e.preventDefault();
  console.log('end', e)
}

/** */
function dragStartEvent(e) {
  console.log('start', e)
  e.dataTransfer.setData('text/html', '<div class="censor-box">1</>');
  e.dataTransfer.setData('dropEffect', 'move');
}


// function onDragOver(e) {
//   console.log(e)
// }

// function onDrop(e) {
//   console.log(e)
// }