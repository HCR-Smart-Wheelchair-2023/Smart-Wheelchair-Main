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
const image = document.getElementById("img");

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
    img.src = "static/door.png";
    inputField.value = "Sure, going to the door";
    post_dest('door');
    }

  function kitchen() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the kitchen';
    window.speechSynthesis.speak(msg);
    img.src = "static/kitchen.png";
    inputField.value = "Sure, going to the kitchen";
    post_dest('kitchen');
  }

  function table() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the table';
    window.speechSynthesis.speak(msg);
    img.src = "static/table.png";
    inputField.value = "Sure, going to the table";
    post_dest('table')
  }
  function bathroom() {
    const msg = new SpeechSynthesisUtterance();
    msg.text = 'Going to the bathroom';
    window.speechSynthesis.speak(msg);
    img.src = "static/bathroom.png";
    inputField.value = "Sure, going to the bathroom";
    post_dest('bathroom')
  }

  function startListening() {
    img.src = "static/mic.png";
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-UK';
    recognition.maxAlternatives = 1;
  
    recognition.onresult = function(event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      
      // if (transcript.includes("hello") && (transcript.includes("door"))) {
      //   inputField.value = "go to door";
      //   door();}
      // else if (transcript.includes("hello") && (transcript.includes("kitchen"))){
      //   inputField.value = "go to kitchen";
      //   kitchen();
      // }
      // else if (transcript.includes("hello") && (transcript.includes("table"))){
      //   inputField.value = "go to table";
      //   table();
      // }
      // else if (transcript.includes("hello") && (transcript.includes("bathroom"))){
      //   inputField.value = "go to bathroom";
      //   bathroom();
      // }
      // else {
      //   inputField.value = "error";
      // }
      if (transcript.includes("hello")&&transcript.includes("chair")&&transcript.includes("door")){
        inputField.value = "door";
        door();}

       else if (transcript.includes("hello")&&transcript.includes("chair") && (transcript.includes("kitchen"))){
         inputField.value = "go to kitchen";
         kitchen();
       }
       else if (transcript.includes("hello")&&transcript.includes("chair") && (transcript.includes("table"))){
         inputField.value = "go to table";
         table();
       }
       else if (transcript.includes("hello")&&transcript.includes("chair") && (transcript.includes("bathroom"))){
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
//---------------------------------------------------code for toggle-------------------------------------------------------
function toggleColor() {

  const button = document.getElementById('toggle');
  const currentColor = button.style.backgroundColor;
  const newColor = currentColor === 'white' ? 'rgb(29, 31, 161)' : 'white';
  button.style.backgroundColor = newColor;
  const currentColor_border = button.style.borderColor;
  const newColor_border = currentColor_border === 'yellow' ? 'rgb(0, 5, 77)' : 'yellow';
  button.style.borderColor = newColor_border;

  
  const button1 = document.getElementById('door');
  button1.style.backgroundColor = newColor;
  button1.style.borderColor = newColor_border;

  const button2 = document.getElementById('bathroom');
  button2.style.backgroundColor = newColor;
  button2.style.borderColor = newColor_border;

  const button3 = document.getElementById('kitchen');
  button3.style.backgroundColor = newColor;
  button3.style.borderColor = newColor_border;

  const button4 = document.getElementById('table');
  button4.style.backgroundColor = newColor;
  button4.style.borderColor = newColor_border;

  const button5 = document.getElementById('voice_recog');
  button5.style.backgroundColor = newColor;
  button5.style.borderColor = newColor_border;

  const button6 = document.getElementById('video');
  button6.style.backgroundColor = newColor;
  button6.style.borderColor = newColor_border;

  const body = document.querySelector("body");
  const currentColor_back = body.style.backgroundColor;
  const newColor_back = currentColor_back === 'black' ? 'rgb(173, 216, 230)' : 'black';
	body.style.backgroundColor = newColor_back;

  const title = document.querySelector("h1");
  const currentColor_h1 = h1.style.colour;
  const newColor_h1 = currentColor_h1 === 'black' ? 'rgb(173, 216, 230)' : 'black';
	h1.style.Color = newColor_h1;

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




