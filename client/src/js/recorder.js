import RecordRTC from  'recordrtc'

export let startWebMic = (socket) => {

    console.log(socket)
  // messageEl.style.display = '';
  navigator.mediaDevices
    .getUserMedia({ audio: true }) //this opens client media (asks permission first)
    //pass the media stream to RecordRTC object
    .then((stream) => {
      let recorder = new RecordRTC(stream, {
        type: "audio",
        mimeType: "audio/webm;codecs=pcm", // endpoint requires 16bit PCM audio
        // recorderType: StereoAudioRecorder,
        timeSlice: 250, // set 250 ms intervals of data that sends to AAI, data sent to 'ondataavailableblob' every 250 ms
        desiredSampRate: 16000,
        numberOfAudioChannels: 1, // real-time requires only one channel
        bufferSize: 4096,
        audioBitsPerSecond: 128000,
        //read about ondataavailable here: https://www.w3.org/TR/mediastream-recording/
        //ondataavailable is a method of the webRTC api, but is being used by recordRTC
        ondataavailable: (blob) => {
          const reader = new FileReader();

          reader.onload = () => {
            //convert sream data (blob) audio to base64
            const base64data = reader.result.split("base64,")[1];

            // console.log('stream base62', JSON.stringify(base64data))
            // console.log('stream base62', base64data.split('base64,')[1])
            // console.log('stream base64',  base64data)

            // socket.emit("audioStream", base64data);
            socket.emit("recorder_started", 'recording has begun');
          };
          //this is how blob is passed to reader
          reader.readAsDataURL(blob);
        },
      });

      socket.on("stop_recorder", (message) => {
        recorder.stopRecording();
        socket.emit("recorder_stopped", "recording stopped")
        // socket.emit("killSpeechClient", "Kill speech client command");
        recorder = null;
      });

      if (recorder) {
        recorder.startRecording();
      }
    })

    .catch((err) => console.error(err));
};
