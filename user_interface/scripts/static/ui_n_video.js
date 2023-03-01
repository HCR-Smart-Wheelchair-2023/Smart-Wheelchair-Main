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

  //------------------------------------------- code to do speech to text might be useful after---------------------------
  function startListening() {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-UK';
    //recognition.maxAlternatives = 1;

    recognition.start();

    recognition.addEventListener('result', event => {
      const transcript = event.results[0][0].transcript;
      // inputField.value = transcript;
      // Perform action with transcript
    });
    recognition.onresult = function(event) {
      const result = event.results[event.results.length - 1][0].transcript;
      //inputField.value = result;
      const keyword1 = "door";
      const keyword2 = "bathroom";
      const keyword3 = "table";
      const keyword4 = "kitchen";
      if (result.includes("chair")){
        if (result.includes(keyword1)) {
          console.log(`The string contains the keyword '${keyword1}'`);
          inputField.value = "door " 
        door()
        }
        else if (result.includes(keyword2)){
          inputField.value = "bathroom " 
          bathroom()
      }
        else if (result.includes(keyword3)){
          inputField.value = "table" 
          table()
      }
         else if (result.includes(keyword4)){
          inputField.value = "kitchen" 
          kitchen()
      }
        else {
          inputField.value = "error" 
      }
     }
    };
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
        //videoElement.srcObject = stream;
        //video.play();

        //var data_uri = Webcam.snap();
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




