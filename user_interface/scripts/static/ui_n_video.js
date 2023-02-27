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
    recognition.lang = 'en-UK';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.addEventListener('result', event => {
      const transcript = event.results[0][0].transcript;
      // inputField.value = transcript;
      // Perform action with transcript
    });
    recognition.onresult = function(event) {
      const result = event.results[0][0].transcript;
      //inputField.value = result;
      const keyword1 = "door";
      const keyword2 = "bathroom";
      const keyword3 = "table";
      const keyword4 = "kitchen";
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
    };
  }



  // -----------------------------------------------code to use camera---------------------------------------------------
  // Get the video element
  let video = null
  let canvas = null
  let context = null
  function startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoElement.srcObject = stream;
        //video.play();
        function saveFrame() {
          console.log('in save frame')
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          // console.log(document.getElementById('canvas').getContext('2d').drawImage(videoElement, 0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height));
          const dataURL = canvas.toDataURL('image/face.jpeg', 1.0);
          // console.log(dataURL)
          // const data = document.getElementById('canvas').getContext("2d").getImageData(10, 10, 50, 50);
          // console.log(data)
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
