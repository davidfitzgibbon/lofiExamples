import anime from "animejs";

const play = document.querySelector(".animationControls .play");
const pause = document.querySelector(".animationControls .pause");
const restart = document.querySelector(".animationControls .restart");

// SIMPLE DEMO
// play.addEventListener("click", () => {
//   sketch.animating = true;
// });

// pause.addEventListener("click", () => {
//   sketch.animating = false;
// });

// restart.addEventListener("click", () => {
//   sketch.settings.playhead = 0;
// });

let animation = anime({
  targets: sketch.settings,
  playhead: "1",
  duration: 1000,
  loop: true,
  easing: "easeInOutSine",
  autoplay: false,
  update: function () {},
});

play.addEventListener("click", () => {
  console.log("play");
  animation.play();
});

pause.addEventListener("click", () => {
  console.log("pause");
  animation.pause();
});

restart.addEventListener("click", () => {
  console.log("pause");
  animation.restart();
  animation.pause();
});

let rand = () => Math.random();
let spookyDanceX = () => {
  if (sketch.settings.spookyDance) {
    anime({
      targets: sketch.pumpkin.position,
      x: () => Math.sin(rand() * Math.PI * 2) * 0.2,
      duration: 1100,
      easing: "easeInOutSine",
      complete: spookyDanceX,
    });
  } else {
    setTimeout(spookyDanceX, 1100);
  }
};
let spookyDanceY = () => {
  if (sketch.settings.spookyDance) {
    anime({
      targets: sketch.pumpkin.position,
      y: () =>
        Math.max(
          0.1,
          Math.cos(rand() * Math.PI * 2) + Math.sin(rand() * Math.PI * 2) * 0.2
        ),
      duration: 1300,
      easing: "easeInOutSine",
      complete: spookyDanceY,
    });
  } else {
    setTimeout(spookyDanceY, 1300);
  }
};
let spookyDanceZ = () => {
  if (sketch.settings.spookyDance) {
    anime({
      targets: sketch.pumpkin.position,
      z: () => Math.cos(rand() * Math.PI * 2) * 0.2,
      duration: 700,
      easing: "easeInOutSine",
      complete: spookyDanceZ,
    });
  } else {
    setTimeout(spookyDanceZ, 700);
  }
};
spookyDanceX();
spookyDanceY();
spookyDanceZ();
