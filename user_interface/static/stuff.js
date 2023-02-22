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
}

// Get a reference to the button element
var button = document.getElementById('door');

// Add a click event listener to the button
button.addEventListener('click', handleClick);

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
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }