console.log('drap n drop test');

const dropZone = document.getElementById('drop-zone');
const newFileInput = document.getElementById('js-new-file-input');
const fileList = document.getElementById('js-file-list');
let allUploadedFiles=[];
let droppedFiles=[];
let selectedFiles=[];
let latestFiles=[];


dropZone.addEventListener('dragover', () => {
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  console.log('drag leave the drap zone');
  dropZone.classList.remove('dragover');
});

['dragover', 'dragleave', 'dragenter', 'drop'].forEach(event => {
  dropZone.addEventListener(event, e => {e.preventDefault()});
});


dropZone.addEventListener('drop', (e)=> {
  dropZone.classList.remove('dragover');
  handleInputFiles([...e.dataTransfer.files]);
  /* console.log(e.dataTransfer.files);
  [...e.dataTransfer.files].forEach(file => {
    droppedFiles.push(file);
    allUploadedFiles.push(file);
  });
  //droppedFiles = [...e.dataTransfer.files];
  console.log('stored dropped files');
  console.log(droppedFiles);
  console.log('all file', allUploadedFiles); */
});


dropZone.addEventListener('click', ()=> {
  newFileInput.click();
  console.log('opened the file selection box');
});

newFileInput.addEventListener('change', (e)=> {
  e.preventDefault();
  handleInputFiles([...newFileInput.files]);
  /*[...newFileInput.files].forEach(file => {
    selectedFiles.push(file);
    allUploadedFiles.push(file);
  });
  //selectedFiles = [...newFileInput.files];
  console.log('stored selected files');
  console.log(selectedFiles); */
});


function handleInputFiles(filesArray) {
  filesArray.forEach(file => allUploadedFiles.push(file));
  latestFiles = filesArray;
  console.log('latest files', latestFiles);
  renderFilesList(latestFiles);
  console.log('all files ', allUploadedFiles);
}


function renderFilesList(files) {
  files.forEach(file => {
    const li = document.createElement('li');
    li.textContent = `${file.name} (${(file.size/1024).toFixed(1)} KB)`;
    fileList.appendChild(li);
  });
}


