const SLICE_COUNT = 16;

function setup_pScope(pScope) {
  pScope.output_mode(ANIMATED_DISK);
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false); //line on circle show
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
  pScope.load_image("pirate_ship", "png");
}

function setup_layers(pScope) {
  new PLayer(); //lets us draw the whole circle background, ignoring the boundaries

  let sky = new PLayer(theSky);
  sky.mode(RING);

  let sea = new PLayer(wave);
  sea.mode(RING);

  let skySun = new PLayer(sun);
  skySun.mode(SWIRL(1));
  skySun.set_boundary(60, 40);

  let pirateShip = new PLayer(ship);
  pirateShip.mode(SWIRL(1));
  pirateShip.set_boundary(500, 530); //where the image start and stop.
}

function ship(x, y, animation, pScope) {
  
  pScope.draw_image("pirate_ship", x, y);
}

function wave(x, y, animation, pScope) {
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;
  //sea
  fill(69, 212, 245);
  arc(x, y, 800, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  //the wave
  fill(255)
  rect(-10, -300 - animation.wave() * 50, 20, 20) // .wave is a cosine wave btw
}

function theSky(x, y, animation, pScope) {
  // this is how you set up a background for a specific layer
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;
  //blue sky
  scale(2.5)
  fill(204, 254, 255); //blue background
  arc(x, y, 800, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background
  //white part
  scale(0.7);
  fill(255); //blue background
  arc(x, y, 800, 800, backgroundArcStart, backgroundArcEnd); // draws "pizza slice" in the background

}

function sun(x, y, animation, pScope) {
  fill(255, 255, 0);
  circle(0, 900, 80);
}