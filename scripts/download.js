console.log('download files');

const downloadButton = document.querySelector('.js-download-button');

downloadButton?.addEventListener("click", async () => {
  console.log('download started');
  const fileName = 'mahesh.jpeg';
  const response = await fetch(`http://localhost:3500/download/${fileName}`, {
    method : 'GET',
    credentials : 'include'
  });
  console.log(response, response.status, response.ok);
  console.log(response.headers);

  if(!response.ok) console.log('error , not found');

  const blob = await response.blob();
  const fileURL = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = fileURL;
  a.download = fileName;
  a.click();
})