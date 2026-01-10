console.log('file upload script test');

const previewContainer = document.querySelector('.js-file-preview-container');
const imgPreview = document.querySelector('.js-image-preview');
const fileInput = document.querySelector('.js-file-input');
const uploadFilesButton = document.querySelector('.js-upload-files-button');
const sendButton = document.querySelector('.js-sendfile-button');
let allImgPreviews;
let removeFileButton;
let uploadedFiles = [];


uploadFilesButton.addEventListener('click', () => {
  fileInput.click();
  console.log(fileInput.files);
});

fileInput.addEventListener('change', (event)=> {
  console.log('came into files');
  const files = [...fileInput.files];
  uploadedFiles.push(...files);
  console.log(uploadedFiles);
  renderPreviewImages(fileInput);
});

function renderPreviewImages(fileInput) {
  const files = [...fileInput.files];
  console.log(`files length ${files.length}`);
  files.forEach((file, index) => {
    console.log(file.name);
    const newURL = URL.createObjectURL(file);
    createNewImagePreview(newURL, index);
  });
  setEventListeners();
  setRemoveFile(fileInput);
}

function createNewImagePreview(imgURL, index) {
  //console.log(previewContainer);
  imgHTML = `
  <div class="image-preview-container js-image-preview-container" data-index="${index}">
    <button class="close-image-preview js-remove-file">
      x
    </button>
    <img src="${imgURL}" alt="" class="js-image-preview image-preview">
  </div>
  `;
  // const newImg = document.createElement("img");
  // newImg.src = `${imgURL}`;
  // newImg.style.width = '40px';
  previewContainer.innerHTML += imgHTML;
}

function setEventListeners() {
  allImgPreviews = document.querySelectorAll('.js-image-preview');
  allImgPreviews.forEach(img => {
    img.addEventListener('click', () => {
      fullViewModal.style.display = 'block';
      imageFullView.src = img.src;
    });
  });
}

function setImgDataIndex(imgPreviews) {
  console.log('setting image previews');
  imgPreviews.forEach((preview,index) => {
    preview.dataset.index = index;
  });
}


function removeUploadedFile(delFile) {
  uploadedFiles = uploadedFiles.filter( file => file !== delFile);
  console.log(uploadedFiles.length);
  showAllFileNames();
}

function showAllFileNames() {
  uploadedFiles.forEach(file => console.log(file.name));
}


function setRemoveFile(input) {
  const removeFileButtons = document.querySelectorAll('.js-remove-file');
  removeFileButtons.forEach(removeFileButton => {
    removeFileButton?.addEventListener('click', (event) => {
      console.log('remove file clicked');
      const targetFile = event.target.closest('.js-image-preview-container');
      const removeIndex = Number(targetFile.dataset.index);
      const dt = new DataTransfer();
      const files = [...input.files];
      files.forEach((file, index) => {
        if(index !== removeIndex) {
          dt.items.add(file);
        } else {
          removeUploadedFile(file);
        }
      });
      input.files = dt.files;
      targetFile.remove();
      const imgPreviews = document.querySelectorAll('.js-image-preview-container');
      setImgDataIndex(imgPreviews);
    });

  })
  
}

const fullViewModal = document.querySelector('.js-image-fullview-modal');
const closeImage = document.querySelector('.js-close-image-button');
const imageFullViewContainer = document.querySelector('.js-image-fullview-container');
const imageFullView = document.querySelector('.js-image-fullview');

closeImage?.addEventListener('click', () => {
  fullViewModal.style.display = 'none';
});


const form = document.querySelector('.js-upload-form');
const uploadAllButton = document.querySelector('.js-upload-all-files-button');

function sendData() {
  form?.addEventListener('submit', async (e)=> {
    console.log(form);
    e.preventDefault();
    console.log('clicked send data transfer');

    const formData = new FormData(form);
    console.log(formData);

    const res = await fetch('http://localhost:3500/upload', {
      method : 'POST',
      body : formData,
      credentials : 'include'
    });

    console.log('uploaded data');
  });

  uploadAllButton?.addEventListener('click', async(e)=> {
    e.preventDefault();
    const allFormData = new FormData();
    const formData = new FormData(form);
    formData?.forEach(file => allFormData.append('images', file));
    uploadedFiles?.forEach(file => allFormData.append('files', file));
    console.log([...allFormData.entries()]);
    const response = await fetch('http://localhost:3500/upload', {
      method : 'POST',
      body : allFormData,
      credentials : 'include'
    });
    console.log('uploaded all files');
  })

};

sendData();