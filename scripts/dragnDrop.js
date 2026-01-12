console.log('drap n drop test');

const dropZone = document.getElementById('drop-zone');
const newFileInput = document.getElementById('js-new-file-input');
const fileList = document.getElementById('js-file-list');
let allUploadedFiles=[];
let droppedFiles=[];
let selectedFiles=[];
let latestFiles=[];
let droppedFolderFiles=[];


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


dropZone.addEventListener('drop', async (e)=> {
  dropZone.classList.remove('dragover');
  const items = [...e.dataTransfer.items];
  await handleDropFolders(items);
  console.log(droppedFolderFiles);
  renderFilesList(droppedFolderFiles);
});


dropZone.addEventListener('click', ()=> {
  newFileInput.click();
  console.log('opened the file selection box');
});

newFileInput.addEventListener('change', (e)=> {
  e.preventDefault();
  handleInputFiles([...newFileInput.files]);
});


function handleInputFiles(filesArray) {
  filesArray.forEach(file => allUploadedFiles.push(file));
  latestFiles = filesArray;
  console.log('latest files', latestFiles);
  renderFilesList(latestFiles);
  //console.log('all files ', allUploadedFiles);
}


async function handleDropFolders(items) {
  const tasks = [];
  items?.forEach((item) => {
    const entry = item.webkitGetAsEntry();
    if(entry){
      tasks.push(traverse(entry));
    }
  });

  await Promise.all(tasks);

  console.log('all files collected');
}

function traverse(entry) {
  return new Promise((resolve) => {
    if(entry.isFile) {
      console.log('entry is file');
      entry.file(file => {
        console.log(file.name);
        droppedFolderFiles.push(file);
        resolve();
      });
    } else if(entry.isDirectory) {
      console.log('entry is a folder');
      console.log(entry);
      const reader = entry.createReader();
      reader.readEntries(async (entries) => {
        console.log(typeof entries);
        console.log(entries);
        await Promise.all(entries.map(traverse));
        resolve();
      });
    } else {
      resolve();
    }
  });
  
}


function renderFilesList(files) {
  console.log('started rendering', files.length);
  files.forEach(file => {
    const li = document.createElement('li');
    li.textContent = `${file.name} ${file.type} (${(file.size/1024).toFixed(1)} KB)`;
    fileList.appendChild(li);
  });
}

function renderFileList(file) {
  const li = document.createElement('li');
  li.textContent = `${file.name} ${file.type} (${(file.size/1024).toFixed(1)} KB)`;
  fileList.appendChild(li);
}


const sendFilesButton = document.querySelector('.js-send-dropped-files');
console.log(sendFilesButton);

function sendDroppedFiles() {
  console.log('send files function');
  sendFilesButton?.addEventListener('click', async (e)=> {
    e.preventDefault();
    console.log('clicked send dropped files');
    const formData = new FormData();
    droppedFolderFiles.forEach(file => {
      formData.append('drops', file);
    });
    latestFiles.forEach(file => formData.append('drops', file));

    const response = await fetch('http://localhost:3500/upload/dropped', {
      method : 'POST',
      body : formData,
      credentials : 'include'
    });

    const result = await response.json();
    console.log('send dropped files', result);
  });
}

sendDroppedFiles();