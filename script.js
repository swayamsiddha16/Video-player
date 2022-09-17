var canvas = document.getElementById("canvas-container");
var ctx = canvas.getContext("2d");
var video = document.getElementById("videoPlayer");

var videoFile = document.getElementById("video-file");
var audioTrack = document.getElementById("audio-track");
var seeker = document.getElementById("seeker");

var videoDuration = 0;

var subs = document.getElementById("audio-track");

console.log("subs", subs);

console.log(videoFile.baseURI);
console.log(videoFile);
console.log(videoFile.files);

function videoFileSelectHandler() {
  var vidFile = document.getElementById("video-file");
  console.log(vidFile.files[0]);
  var media = URL.createObjectURL(vidFile.files[0]);
  var videoPlayer = document.getElementById("videoPlayer");
  videoPlayer.src = media;
  console.log(vidFile);
  console.log(videoPlayer.duration);
  seeker.max = videoDuration;
  console.log(videoDuration);
  ctx.width = video.videoWidth;
  ctx.height = video.videoHeight;
  console.log(video);
}

function subsFileSelectHandler() {
  var subs = document.getElementById("subs-file");
  console.log(subs.files[0]);

  var trackMedia = URL.createObjectURL(subs.files[0]);
  audioTrack.src = trackMedia;
  console.log(audioTrack);
}

audioTrack.onloadedmetadata = function () {
  console.log(this);
};

video.onloadedmetadata = function () {
  videoDuration = this.duration;
  console.log(this.duration);
};

// video.addEventListener(
//   "play",
//   function () {
//     console.log("at listner", this);
//     var $this = video;
//     (function loop() {
//       if (!$this.paused && !$this.ended) {
//         ctx.drawImage($this, 0, 0, 500, 400);
//         setTimeout(loop, 1000 / 30);
//       }
//     })();
//   },
//   0
// );

var playButton = document.getElementById("playButton");
var backwardButton = document.getElementById("backwardButton");
var forwardButton = document.getElementById("forwardButton");

backwardButton.addEventListener("click", () => {
  video.currentTime -= 10;
});

forwardButton.addEventListener("click", () => {
  video.currentTime += 10;
});

playButton.addEventListener(
  "click",
  function () {
    seeker.max = video.duration;
    console.log(video.duration);
    if (!video.paused) {
      video.pause();
      return;
    }
    video.play();

    var $this = video;
    console.log("at listner", $this);
    (function loop() {
      if (!$this.paused && !$this.ended) {
        seeker.value = $this.currentTime;
        console.log(audioTrack.track.activeCues);
        ctx.drawImage($this, 0, 0, 700, 400);
        if (audioTrack.track.activeCues.length) {
          ctx.textAlign = "center"; 
          ctx.font= "20px Arial";
          ctx.fillStyle = "white";
          ctx.fillText(audioTrack.track.activeCues[0].text, 350, 350);
        }
        setTimeout(loop, 1000 / 30);
      }
    })();
  },
  0
);

function seekerOnchangeHandler() {
  console.log(seeker);
  video.currentTime = seeker.valueAsNumber;
}

// // playButton.addEventListener(
// //   "click",
// //   function () {
// //     console.log("at listner", this);
// //     var $this = video;
// //     console.log("at listner 2", $this);
// //     (function loop() {
// //       if (!$this.paused && !$this.ended) {
// //         ctx.drawImage($this, 0, 0, 500, 400);
// //         setTimeout(loop, 1000 / 30);
// //       }
// //     })();
// //   },
// //   0
// // );

// playButton.addEventListener(
//   "click",
//   function () {
//     console.log("here");
//     var videoElement = document.getElementById("videoPlayer");
//     (function loop() {
//       if (!videoElement.paused && !videoElement.ended) {
//         ctx.drawImage(videoElement, 0, 0, 500, 400);
//         setTimeout(loop, 1000 / 30);
//       }
//     })();
//   },
//   0
// );

// function playBtnHandler() {
//     console.log("here in vid");
//     setInterval(()=>{
//       if (!video.paused && !video.ended) {
//         ctx.drawImage(video, 0, 0, 500, 400);
//         setTimeout(loop, 1000 / 30);
//       }
//     },1000/30)

//     // (function loop() {
//     //     console.log("i")
//     //   if (!video.paused && !video.ended) {
//     //     ctx.drawImage(video, 0, 0, 500, 400);
//     //     setTimeout(loop, 1000 / 30);
//     //   }
//     // })();

// }
