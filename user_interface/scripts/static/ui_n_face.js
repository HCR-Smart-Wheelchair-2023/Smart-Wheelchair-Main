// Register the service worker
if ('serviceWorker' in navigator)
{window.addEventListener('load', () => {navigator.serviceWorker.register('/serviceworker.js');
});}

//-----------------------------------------roslibJS stuff ------------------------------------------------------------------------------------------------

// Connect to ROS
 var ros = new ROSLIB.Ros({
    url : 'wss://192.168.50.101:8080'
});

// Subscribe to a topic
var listener = new ROSLIB.Topic({
    ros : ros,
    name : '/target_command',
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



  // -----------------------------------------------code to use camera---------------------------------------------------
  // Get the video element
  let video = null
  //let canvas = null
  let context = null
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
        //video.play();
        function saveFrame() {
          console.log('in save frame')
          document.getElementById('canvas').getContext('2d').drawImage(videoElement, 0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);
          const dataURL = document.getElementById('canvas').toDataURL('image/face.jpeg', 1.0);
          console.log(dataURL)

          //---send data to URL
          fetch('/process-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image_data: dataURL })
          })
          .then(response => response.text())
          .then(result => {
            console.log('Result:', result);
          })
          .catch(error => {
            console.error('Error:', error);
          });
        }
  
        saveFrame();

      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }

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