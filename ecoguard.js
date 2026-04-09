let video = document.getElementById("camera");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let stream;

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(s => {
      stream = s;
      video.srcObject = stream;
      document.getElementById("result").innerText = "Camera Started";
    })
    .catch(err => {
      alert("Camera access denied!");
    });
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    document.getElementById("result").innerText = "Camera Stopped";
  }
}

function detectSpill() {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let pixels = imageData.data;

  let darkPixels = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    let r = pixels[i];
    let g = pixels[i + 1];
    let b = pixels[i + 2];

    let brightness = (r + g + b) / 3;

    if (brightness < 50) {
      darkPixels++;
    }
  }

  let percentage = (darkPixels / (pixels.length / 4)) * 100;

  if (percentage > 30) {
    document.getElementById("result").innerText = "Oil Spill Detected!";
  } else {
    document.getElementById("result").innerText = "No Spill Detected";
  }
}
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.getElementById('camera');
    video.srcObject = stream;
    document.getElementById('result').textContent = 'Status: Camera started';
  } catch (error) {
    console.error('Error accessing camera:', error);
    document.getElementById('result').textContent = 'Status: Camera access denied';
  }
}

// Add similar functions for detectSpill() and stopCamera() as needed