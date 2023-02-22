// Register the service worker
if ('serviceWorker' in navigator) 
{window.addEventListener('load', () => {navigator.serviceWorker.register('/serviceworker.js');
});}

//-----------------------------------------roslibJS stuff ------------------------------------------------------------------------------------------------

// Connect to ROS
 var ros = new ROSLIB.Ros({
    url : 'ws:// ROS ip adress here and rosbridge port number'
});

// Subscribe to a topic
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/my_topic',
    messageType : 'std_msgs/String'
});

// Update the message on the web page when a new message is received
listener.subscribe(function(message) {
    var messageElement = document.getElementById('message');
    messageElement.innerHTML = message.data;
});

 // Create a publisher
 var publisher = new ROSLIB.Topic({
    ros : ros,
    name : '/my_topic',
    messageType : 'std_msgs/String'
});

// Define the function to execute when the button is clicked
function publishMessage() {
    // Create a message
    var message = new ROSLIB.Message({
        data : 'Hello, ROS!'
    });
    // Publish the message
    publisher.publish(message);
    //publish to relevant topic 
}
//example of geting button id and listening for click
const doorBut = document.getElementById('door');
doorBut.addEventListener('click',publishMessage());

//example of publishing at the click of a button
// const doorBut = document.getElementById('door');
// // Add a click event listener to the button
// doorBut.addEventListener('click',() => {
//   const myMessage = new ROSLIB.Message({ data: 'go to the door' });
//   myTopic.publish(myMessage);
// });
//--------------------------------------------------------speech functions------------------------------------------------------


  // const button1 = document.getElementById('button1');
  // // Add event listeners to each button
  // button1.addEventListener('click', () => {
  //   speak('Hello, this is button 1.');
  // });
  
  // // Function to speak the message using the browser's SpeechSynthesis API
  // function speak(message) {
  //   const speech = new SpeechSynthesisUtterance();
  //   speech.text = message;
  //   window.speechSynthesis.speak(speech);
  // }
function door() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the door';
    window.speechSynthesis.speak(msg);
  }

  function kitchen() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the kitchen';
    window.speechSynthesis.speak(msg);
  }

  function table() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the table';
    window.speechSynthesis.speak(msg);
  }
  function bathroom() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the bathroom';
    window.speechSynthesis.speak(msg);
  }

  //------------------------------------------- code to do speech to text might be useful after---------------------------  
  function startListening() {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-UK';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
  
    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript;
      inputField.value = result;
    };
  }

  

  // -----------------------------------------------code to use camera---------------------------------------------------
  // Get the video element
  const video = document.getElementById('video'); 
  
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
        video.play();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }


  //   // Get a video stream from the iPad Pro's camera
  // const constraints = { video: true };
  // const stream = await navigator.mediaDevices.getUserMedia(constraints);

  // // Create a video element and set the stream as its source
  // const video = document.createElement('video');
  // video.srcObject = stream;
  // await video.play();

  // // Create a FaceDetector object
  // const faceDetector = new window.FaceDetector();

  // // Detect faces in the video stream
  // const faces = await faceDetector.detect(video);

  // // Get the face mesh data for the first face detected
  // const face = faces[0];
  // const faceMesh = face.landmarks.get('faceMesh');

  //   // -----------------------------------------------code to use LIDAR---------------------------------------------------


  //   // Request an XR session with the lidar feature
  // const xrSession = await navigator.xr.requestSession('immersive-ar', {
  //   requiredFeatures: ['lidar'],
  // });

  // // Get an XRFrame of reference
  // const xrFrameOfRef = await xrSession.requestFrameOfReference('eye-level');

  // // Get an XRPointCloud
  // const xrPointCloud = await xrFrameOfRef.getPointCloud();

  // // Get the points from the point cloud
  // const points = xrPointCloud.points;
