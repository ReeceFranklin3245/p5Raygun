let basicSynth, filt, panner, reverb, distortion, laserGunImage, imgX, imgY;
let showLaser = false;

function preload() {
  laserGunImage = loadImage("media/raygun.jpg");
}

function setup() {
  createCanvas(400, 400);
  imgX = width / 2 - 50;
  imgY = height / 2 - 50;

  panner = new Tone.AutoPanner({
    frequency: 0.2,
    depth: 1,
  })
    .toDestination()
    .start();

  filt = new Tone.Filter(1200, "lowpass", -24).connect(panner);

  basicSynth = new Tone.Synth({
    oscillator: { type: "square" },
    envelope: {
      attack: 0.001,
      decay: 0.2,
      sustain: 0.0,
      release: 0.1,
    },
  }).connect(filt);

  distortion = new Tone.Distortion(0.6).toDestination();
  filt.connect(distortion);

  reverb = new Tone.Reverb({ decay: 1.5, wet: 0.5 }).toDestination();
  distortion.connect(reverb);
}

function draw() {
  background(0);
  if (showLaser) {
    image(laserGunImage, imgX, imgY, 100, 100);
  }
}

function mouseClicked() {
  let freq = random(800, 1200);

  basicSynth.triggerAttack(freq);

  basicSynth.oscillator.frequency.rampTo(freq * 0.2, 0.15);

  setTimeout(() => {
    basicSynth.triggerRelease();
  }, 200);
  showLaser = true;
  setTimeout(() => {
    showLaser = false;
  }, 300);
}
