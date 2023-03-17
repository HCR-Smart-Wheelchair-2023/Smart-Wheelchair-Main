// Register the service worker
if ('serviceWorker' in navigator)
{window.addEventListener('load', () => {navigator.serviceWorker.register('/serviceworker.js');
});}

//-----------------------------------------roslibJS stuff ------------------------------------------------------------------------------------------------

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

  function post_dest(_goal){
    fetch('/goal_dest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ goal: _goal })
    })
    .then(response => response.text())
    .then(result => {
      console.log('Result:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  function door() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the door';
    window.speechSynthesis.speak(msg);
    post_dest('door');
    }

  function kitchen() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the kitchen';
    window.speechSynthesis.speak(msg);
    post_dest('kitchen');
  }

  function table() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the table';
    window.speechSynthesis.speak(msg);
    post_dest('table')
  }
  function bathroom() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the bathroom';
    window.speechSynthesis.speak(msg);
    post_dest('bathroom')
  }

  function startListening() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-UK';
    recognition.maxAlternatives = 1;
  
    recognition.onresult = function(event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      
      if (transcript.includes("hello") && (transcript.includes("door"))) {
        inputField.value = "go to door";
        door();}
      else if (transcript.includes("hello") && (transcript.includes("kitchen"))){
        inputField.value = "go to kitchen";
        kitchen();
      }
      else if (transcript.includes("hello") && (transcript.includes("table"))){
        inputField.value = "go to table";
        table();
      }
      else if (transcript.includes("hello") && (transcript.includes("bathroom"))){
        inputField.value = "go to bathroom";
        bathroom();
      }
      else {
        inputField.value = "error";
      }
    };
    
    recognition.onend = function() {
      startRecognition();// start again when the recognition ends
    };
  
    recognition.start();
    stopButton.addEventListener('click', () => {
          recognition.stop();
        });
  }


  // -----------------------------------------------code to use camera---------------------------------------------------
  // Get the video element
  let video = null
  let canvas = null
  let context = null

  function startStream(){
    
    function getImage(){
      //Webcam.attach( 'videoElement' );
      Webcam.snap( function(data_uri) {
      // display results in page
      //document.getElementById('results').innerHTML = '<img src="'+data_uri+'"/>';
      console.log(data_uri)
      fetch('/process-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data: data_uri , width: videoElement.videoWidth, heigth:  videoElement.videoHeight})
      })
      .then(response => response.text())
      .then(result => {
        console.log('Result fetch:', result);
      })
      .catch(error => {
        console.error('Error fetch:', error);
      }); 
      })
    };

    setInterval(getImage, 1000 /1) 
 };



  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {

        console.log(videoElement)
        Webcam.set({
          width: videoElement.videoWidth,
          height: videoElement.videoHeight,
          image_format: 'png',
          png_quality: 90
        });
        Webcam.attach( 'videoElement' );
        console.log('Now iterate...')
        startStream()
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }




