const SLICE_COUNT = 16;

function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false); //line on circle show
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
  pScope.load_image("pirate_ship", "png");
  pScope.load_image("wave", "png");
  pScope.load_image("wave2", "png");
  pScope.load_image("wave3", "png");
  pScope.load_image_sequence("cloud", "png", 15);
}

function setup_layers(pScope) {
  new PLayer(); //lets us draw the whole circle background, ignoring the boundaries

  //shy
  let sky = new PLayer(theSky);
  sky.mode(RING);

  //sea layer
  let sea = new PLayer(wave);
  sea.mode(RING);

  let sea2 = new PLayer(waveL2);
  sea2.mode(RING);

  let sea3 = new PLayer(waveL3);
  sea3.mode(RING);

  //the sun
  let skySun = new PLayer(sun);
  skySun.mode(SWIRL(1));
  skySun.set_boundary(5, 15);

  //cloud
  let cloudS = new PLayer(cloudL);
  cloudS.mode(RING);
  cloudS.set_boundary(0, 1000);

  //the ship
  let pirateShip = new PLayer(ship);
  pirateShip.mode(SWIRL(1));
  pirateShip.set_boundary(500, 510); //where the image start and stop.
}

function ship(x, y, animation, pScope) {
  let shipX = animation.wave(1) * 50;
  pScope.draw_image("pirate_ship", shipX, y);
}

function wave(x, y, animation, pScope) {
  //the wave
  scale(0.5);
  let waveX = animation.wave(1) * -50;
  pScope.draw_image("wave", waveX, -665);
}

function waveL2(x, y, animation, pScope) {
  //the second wave
  scale(0.5);
  let wave2X = animation.wave(1) * -50;
  pScope.draw_image("wave2", wave2X, -500);
}

function waveL3(x, y, animation, pScope) {
  //the third wave
  scale(0.4)
  let wave3X = animation.wave(1) * +50;
  pScope.draw_image("wave3", wave3X, -400);
}

function theSky(x, y, animation, pScope) {
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;
  //blue sky
  scale(2.5)
  fill(204, 254, 255); //blue background
  arc(x, y, 800, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
}

function sun(x, y, animation, pScope) {
  noStroke();
  fill(255, 255, 255);
  circle(0, 900, 180);

  fill(255, 255, 200);
  circle(0, 900, 140);

  fill(255, 255, 0);
  circle(0, 900, 95);
}

function cloudL(x, y, animation, pScope) {
  scale(0.9);
  pScope.draw_image_from_sequence("cloud", x, -950, animation.frame);
}