// Register the service worker
if ('serviceWorker' in navigator)
{window.addEventListener('load', () => {navigator.serviceWorker.register('/serviceworker.js');
});}

//-----------------------------------------roslibJS stuff ------------------------------------------------------------------------------------------------

// Connect to ROS
//  var ros = new ROSLIB.Ros({
//     url : 'ws://192.168.50.101:8080'
// });

// // Subscribe to a topic
// var listener = new ROSLIB.Topic({
//     ros : ros,
//     name : '/target_command',
//     messageType : 'std_msgs/String'
// });

// // Update the message on the web page when a new message is received
// listener.subscribe(function(message) {
//     var messageElement = document.getElementById('message');
//     messageElement.innerHTML = message.data;
// });

//  // Create a publisher
//  var publisher = new ROSLIB.Topic({
//     ros : ros,
//     name : '/my_topic',
//     messageType : 'std_msgs/String'
// });

// Define the function to execute when the button is clicked
function publishMessage(id) {
    // Create a message
    var message = new ROSLIB.Message({
        data : id
    });
    // Publish the message
    publisher.publish(message);
    //publish to relevant topic
}

// Example of getting button id and listening for click
const doorBut = document.getElementById('door');
const kitchenBut = document.getElementById('kitchen');
const tableBut = document.getElementById('table');
const bathroomBut = document.getElementById('bathroom');

doorBut.addEventListener('click',publishMessage('door'));
kitchenBut.addEventListener('click',publishMessage('kitchen'));
tableBut.addEventListener('click',publishMessage('table'));
bathroomBut.addEventListener('click',publishMessage('bathroom'));


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



    //--------------------TODO-----------------------

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

  //

  // -----------------------------------------------code to use LIDAR and CAMERA---------------------------------------------------



//------LIDAR

// // Request an XR session with the lidar feature
// const xrSession = await navigator.xr.requestSession('immersive-ar', {
//   requiredFeatures: ['lidar'],
// });

// // Get an XRFrame of reference
// const xrFrameOfRef = await xrSession.requestFrameOfReference('eye-level');

// // Get an XRPointCloud
// const xrPointCloud = await xrFrameOfRef.getPointCloud();

// // Get the points from the point cloud
// const points = xrPointCloud.points;

//--------CAMERA

//  // Get the video element
//   const video = document.getElementById('video');

//   function startCamera() {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         videoElement.srcObject = stream;
//         video.play();
//       })
//       .catch(error => {
//         console.error('Error accessing camera:', error);
//       });
//   }

// // Get a video stream from the iPad Pro's camera
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

//------------detect FACE from CAMERA data-----------------

// Get the canvas element
const canvas = document.getElementById('canvas');

// Create a Three.js scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ canvas });

// Create a directional light
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Create a face mesh materials
const material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  specular: 0x050505,
  shininess: 100
});

// Load the pre-built face mesh model
const loader = new THREE.BufferGeometryLoader();
loader.load('/path/to/face-mesh.json', function (geometry) {
  // Create a face mesh object
  const mesh = new THREE.Mesh(geometry, material);

  // Add the face mesh object to the scene
  scene.add(mesh);
});

// Create an ARKit session
const session = new ARKit.Session();

// Create a face tracking configuration
const configuration = new ARKit.FaceTrackingConfiguration();

// Start the ARKit session
session.run(configuration, { device: 'iPad' });

// Render the scene
function render() {
  // Update the camera matrix from the ARKit session
  camera.matrix.fromArray(session.currentFrame.camera.transform);

  // Update the face mesh geometry from the ARKit session
  const faceAnchor = session.currentFrame.anchors[0];
  if (faceAnchor) {
    const geometry = mesh.geometry;
    geometry.attributes.position.array = faceAnchor.geometry.vertices;
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(render);
}

// Start rendering the scene
requestAnimationFrame(render);

//--------------old mesh-----------------

// const faceDetector = new FaceDetector();
// const image = document.getElementById('image');
// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// faceDetector.detect(image)
// .then(faces => {
//   console.log('Detected faces:', faces);
//   faces.forEach(face => {
//     console.log('Bounding box:', face.boundingBox);
//     console.log('Landmarks:', face.landmarks);
//     //const faceMesh = createFaceMesh(face.landmarks);
//     //drawFaceMesh(faceMesh);
//   });
// })
// .catch(error => {
//   console.error('Error detecting faces:', error);
// });

//--------------create face MESH (2D)-----------------

// function createFaceMesh(landmarks) {
//   // Create a 3D geometry for the face mesh
//   const geometry = new THREE.Geometry();

//   // Add vertices for each facial landmark
//   for (let i = 0; i < landmarks.length; i++) {
//     const landmark = landmarks[i];
//     const x = landmark.x - canvas.width / 2;
//     const y = canvas.height / 2 - landmark.y;
//     const z = 0; // For simplicity, we set z=0 for all vertices
//     geometry.vertices.push(new THREE.Vector3(x, y, z));
//   }

//   // Add faces to connect the vertices and create the mesh
//   // This example assumes the face has 76 landmarks, as returned by the FaceDetector API
//   for (let i = 0; i < 64; i++) {
//     // Connect the vertices in a loop around the face
//     geometry.faces.push(new THREE.Face3(i, (i + 1) % 64, i + 12));
//     geometry.faces.push(new THREE.Face3(i + 12, (i + 1) % 64 + 12, (i + 1) % 64));
//     // Connect the vertices between the eyes and mouth
//     if (i < 32) {
//       geometry.faces.push(new THREE.Face3(i, i + 32, (i + 1) % 32));
//       geometry.faces.push(new THREE.Face3((i + 1) % 32, i + 32, (i + 1) % 32 + 32));
//     }
//   }

//   // Compute face normals and other data needed for rendering
//   geometry.computeFaceNormals();
//   geometry.computeVertexNormals();
//   geometry.computeBoundingSphere();
//   geometry.computeBoundingBox();

//   // Return the geometry as an array of vertices
//   return geometry.vertices;
// }

// function drawFaceMesh(mesh) {
//   // Get the canvas element
//   const canvas = document.getElementById('canvas');

//   // Get the canvas 2D context
//   const ctx = canvas.getContext('2d');

//   // Clear the canvas
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   // Loop through each face in the mesh
//   for (let i = 0; i < mesh.faces.length; i++) {
//     const face = mesh.faces[i];

//     // Draw the face using a path
//     ctx.beginPath();
//     ctx.moveTo(mesh.vertices[face[0]][0], mesh.vertices[face[0]][1]);
//     for (let j = 1; j < face.length; j++) {
//       ctx.lineTo(mesh.vertices[face[j]][0], mesh.vertices[face[j]][1]);
//     }
//     ctx.closePath();

//     // Set the fill color to blue
//     ctx.fillStyle = 'blue';

//     // Fill the face path
//     ctx.fill();

//     // Set the stroke color to black
//     ctx.strokeStyle = 'black';

//     // Stroke the face path
//     ctx.stroke();
//   }
// }
