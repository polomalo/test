import * as PIXI from 'pixi.js'

let app = new PIXI.Application({
  // width: 720,
  // height: 1280,
  //backgroundColor: 0x1099bb,
  view: document.querySelector('#scene'),
  resolution: window.devicePixelRatio || 1,
  antialias: true
});

let pairs = 0;
let count = 0;

let textureCard = PIXI.Texture.from('assets/card.png');
let background = PIXI.Texture.from('assets/back.png');
let back = new PIXI.Sprite(background);
let cards = [];
let slotTextures = [
  PIXI.Texture.from('assets/dimond.png'),
  PIXI.Texture.from('assets/spades.png'),
  PIXI.Texture.from('assets/hearts.png'),
  PIXI.Texture.from('assets/clubs.png'),
];

back.width = app.screen.width;
back.height = app.screen.height;
app.stage.addChild(back);

let top = new PIXI.Graphics();
top.beginFill(0xDE3249);
top.drawRect(0, 0, app.screen.width, 70);
top.endFill();
app.stage.addChild(top);

let headerText = new PIXI.Text('Play 2 times a day!\nto keep yor brain healthy');
headerText.x = Math.round((top.width - headerText.width) / 2);
top.addChild(headerText);
app.stage.addChild(top);


let container = new PIXI.Container();

app.stage.addChild(container);

let names = []
for (let i = 0; i < 6; i++) {
  let card = new PIXI.Sprite(textureCard);
  card.width = 160;
  card.height = 130;
  card.anchor.set(0.5);
  card.x = (i % 3) * 190;
  card.y = Math.floor(i / 3) * 140;
  card.interactive = true;
  card.cursor = 'pointer';
  
  if (pairs == 2){
    console.log('you win!')
  } else {
    card
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
  }
  container.addChild(card);
}

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
container.pivot.x = container.width / 3;
container.pivot.y = container.height / 3;


function onButtonDown() {

  if (count == 2){
    let test = compare(cards)
    this.interactive = false;
    if (test){
      cards.length = 0;
      count = 0;
      this.isdown = true;
      this.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
      this.alpha = 1;
      count = count + 1;
      cards.push(this.texture);
    }
  } else {
    if (cards.length < 2){
      this.isdown = true;
      let aaa = this.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
      this.alpha = 1;
      count = count + 1;
      cards.push(this.texture);
    }else {
      for (let i = 0; i < cards.length; i++){
        cards[i].baseTexture.cacheId = 'assets/card.png'
      }
    }
    
    console.log(cards)
    
    // console.log(aaa)
    // names.push(aaa)
  }
  //console.log(cards)
}

function onButtonUp(){
  this.isdown = false;
  this.interactive = false;
}

function compare(mas){
  for (let i = 0; i < mas.length; i++){
    if (mas[i].baseTexture.cacheId == mas[i+1].baseTexture.cacheId){
      console.log('new pair')
      pairs = 1;
      return true;
    } else 
      mas.length = 0;
      console.log('fall')
      return false
  }
}
