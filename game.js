window.addEventListener("load", init);

function init(){
  startGame();
}

function startGame(){
  let GameConfig = {
    type: Phaser.AUTO,
    width: 480,
    height: 480,
    parent: document.querySelector(".gameContainer"),
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Scene1 ],
    backgroundColor: 0x50aaca
  };
  let Game = new Phaser.Game( GameConfig );
}

class Scene1 extends Phaser.Scene{
  constructor(){
    super( "Scene1" );
  }

  create(){
    // this.line = new Line( this, 0,  0, 200, 10 );
    this.line = new Line2( this, 10, 10, 10, 10, 450, 450);

    this.input.on( "pointerdown", pointerDown, this.line );
  }

  update(){

  }
}

function pointerDown( pointer ){
  let clickPoint = {
    x: Math.round( pointer.x ),
    y: Math.round( pointer.y ),
  }
  // console.log( `x: ${clickPoint.x}, y: ${clickPoint.y}` );
  this.movePointOne( clickPoint.x, clickPoint.y );
  return;
}

class Line extends Phaser.GameObjects.Rectangle{
  constructor( scene, x, y, lineLength = 10, lineWidth, Color = 0x000000 ){
    // the lineWidth is represented by the rectangle heignt
    // the lineLength is represented by the rectangle width
    super( scene, x, y, lineLength, lineWidth, Color );

    // add to scene
    scene.add.existing( this );
  }
}

class Line2 extends Phaser.GameObjects.Line{
  constructor( scene, x = 0, y = 0, x1 = 0, y1 = 0, x2 = 0, y2 = 0, Color = 0x000000 ){
    // the lineWidth is represented by the rectangle heignt
    // the lineLength is represented by the rectangle width
    super( scene, x, y, x1, y1, x2, y2, Color );
    this.points = {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
    }

    // add to scene
    scene.add.existing( this );
    this.setOrigin(0, 0);
    this.setLineWidth( 3 );
  }

  movePointOne(x, y){
    this.points.x1 = x;
    this.points.y1 = y;
    this.setTo( this.points.x1, this.points.y1, this.points.x2, this.points.y2 );
    return;
  }

  movePointTwo(x, y){
    this.points.x2 = x;
    this.points.y2 = y;
    this.setTo( this.points.x1, this.points.y1, this.points.x2, this.points.y2 );
    return;
  }
}