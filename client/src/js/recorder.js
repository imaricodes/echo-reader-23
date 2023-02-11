// import RecordRTC from  'recordrtc'



export const startWebMic = (socket) => {
  console.log ('useEffect running')

  const getUserMediaConstraints = {audio: {
    channelCount: 1,
    sampleRate: 16000,
  }, video: false}
  
  const mediaRecorderOptions = {
  mimeType: 'audio/webm; codecs=opus',
  
  }
  
  const reader = new FileReader();
  
  function sendRecorderDataWhenAvailable(e) {
    reader.readAsDataURL(e.data)
    reader.onload = () => {
      let base64data = reader.result.split("base64,")[1];
      console.log(`base64 ${base64data}`)
      socket.emit('incoming_stream', base64data)
    }
  }
  
  async function startRecorder() {
    console.log('async called')
    
    try {
      console.log('getting devices')
      await navigator.mediaDevices.getUserMedia(getUserMediaConstraints)
      
      // let track = stream.getAudioTracks()[0];
      // console.log(track.getCapabilities());
      .then((stream)=> {
        let mediaRecorder = new MediaRecorder(stream, mediaRecorderOptions); //pass in options
  
        mediaRecorder.start(250);
   
        console.log(`mediarecorder mime type `, mediaRecorder.mimeType)
        mediaRecorder.ondataavailable = sendRecorderDataWhenAvailable;
  
      })
      
    } catch (error) {
      //handle error here
    }
  }
    startRecorder()

    //TODO: return data to front end for display to user
}

















// export const startWebMic = (socket)  => {

// socket.emit("go", "go")
// }

// let recorder;

// export const startWebMic = (socket) => {

//   navigator.mediaDevices
//     .getUserMedia({ audio: true }) //this opens client media (asks permission first)
//     //pass the media stream to RecordRTC object
//     .then((stream) => {
//       recorder = new RecordRTC(stream, {
//         type: "audio",
//         mimeType: "audio/webm;codecs=pcm", 
//         timeSlice: 250, 
//         desiredSampRate: 16000,
//         numberOfAudioChannels: 1, 
//         bufferSize: 4096,
//         audioBitsPerSecond: 128000,

//         ondataavailable: (blob) => {
//           const reader = new FileReader();

//           reader.onload = () => {
//             //convert sream data (blob) audio to base64
//             let base64data = reader.result.split("base64,")[1];

//             // console.log('stream base62', JSON.stringify(base64data))
//             // console.log('stream base62', base64data.split('base64,')[1])
//             // console.log('stream base64',  base64data)

//             socket.emit("audioStream", base64data);
//           };
         
//           reader.readAsDataURL(blob);

//         },

//       });

//       socket.on("stop_recorder", (message) => {
//         recorder.stopRecording();
//         socket.emit("recorder_stopped", "recording stopped")
//         recorder = null;
//       });

//       if (recorder) {
//         recorder.startRecording();
//       }
//     })

//     .catch((err) => console.error(err));
// };


// export let startWebMic = (socket) => {

//     console.log(socket)
//   // messageEl.style.display = '';
//   navigator.mediaDevices
//     .getUserMedia({ audio: true }) //this opens client media (asks permission first)
//     //pass the media stream to RecordRTC object
//     .then((stream) => {
//       let recorder = new RecordRTC(stream, {
//         type: "audio",
//         mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
//         // recorderType: StereoAudioRecorder,
//         timeSlice: 250, // set 250 ms intervals of data that sends to AAI, data sent to 'ondataavailableblob' every 250 ms
//         desiredSampRate: 16000,
//         numberOfAudioChannels: 1, // real-time requires only one channel
//         bufferSize: 4096,
//         audioBitsPerSecond: 128000,
//         //read about ondataavailable here: https://www.w3.org/TR/mediastream-recording/
//         //ondataavailable is a method of the webRTC api, but is being used by recordRTC
//         ondataavailable: (blob) => {
//           const reader = new FileReader();

//           reader.onload = () => {
//             //convert sream data (blob) audio to base64
//             const base64data = reader.result.split("base64,")[1];

//             // console.log('stream base62', JSON.stringify(base64data))
//             // console.log('stream base62', base64data.split('base64,')[1])
//             // console.log('stream base64',  base64data)

//             socket.emit("recorder_started", 'recording has begun');
//             socket.emit("audioStream", base64data);
//           };
//           //this is how blob is passed to reader
//           reader.readAsDataURL(blob);
//         },
//       });

//       socket.on("stop_recorder", (message) => {
//         recorder.stopRecording();
//         socket.emit("recorder_stopped", "recording stopped")
//         // socket.emit("killSpeechClient", "Kill speech client command");
//         recorder = null;
//       });

//       if (recorder) {
//         recorder.startRecording();
//       }
//     })

//     .catch((err) => console.error(err));
// };
