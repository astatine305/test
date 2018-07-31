// window.onload = function() {

//     // Normalize the various vendor prefixed versions of getUserMedia.
//     navigator.getUserMedia = (navigator.getUserMedia ||
//                               navigator.webkitGetUserMedia ||
//                               navigator.mozGetUserMedia || 
//                               navigator.msGetUserMedia);


// // Check that the browser supports getUserMedia.
// // If it doesn't show an alert, otherwise continue.
// if (navigator.getUserMedia) {
//     // Request the camera.
//     navigator.getUserMedia(
//       // Constraints
//       {
//         video: true
//       },
  
//       // Success Callback
//       function(localMediaStream) {
//           // Get a reference to the video element on the page.
// var vid = document.getElementById('camera-stream');

// // Create an object URL for the video stream and use this 
// // to set the video source.
// vid.src = window.URL.createObjectURL(localMediaStream);

  
//       },
  
//       // Error Callback
//       function(err) {
//         // Log the error to the console.
//         console.log('The following error occurred when trying to use getUserMedia: ' + err);
//       }
//     );
  
//   } else {
//     alert('Sorry, your browser does not support getUserMedia');
//   }
  
//   }

(function() {
  var width = 320;    // We will scale the photo width to this
  var height = 0;     // This will be computed based on the input stream

  var streaming = false;

  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;


  function startup() {
      video = document.getElementById('video');
      canvas = document.getElementById('canvas');
      photo = document.getElementById('photo');
      startbutton = document.getElementById('startbutton');
  }

  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(function(stream) {
      video.srcObject = stream;
      video.play();
  })
  .catch(function(err) {
      console.log("An error occurred! " + err);
  });

  video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);




    clearphoto();
  })

  function takepicture() {
      var context = canvas.getContext('2d');
      if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);
      
        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
      } else {
        clearphoto();
      }
    }

    function clearphoto() {
      var context = canvas.getContext('2d');
      context.fillStyle = "#AAA";
      context.fillRect(0, 0, canvas.width, canvas.height);
  
      var data = canvas.toDataURL('image/png');
      photo.setAttribute('src', data);
    }