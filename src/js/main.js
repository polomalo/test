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
let test1 = [
    'dimond',
    'spades',
    'hearts',
    'clubs'
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

let state = 0;
let container = new PIXI.Container();

app.stage.addChild(container);

let names = []
for (let i = 0; i < 6; i++) {
    let cardContainer = new PIXI.Container();
    let card = new PIXI.Sprite(textureCard);
    cardContainer.width = 160;
    cardContainer.height = 130;
    
    
    card.width = 160;
    card.height = 130;
    card.anchor.set(0.5);
    cardContainer.x = (i % 3) * 190;
    cardContainer.y = Math.floor(i / 3) * 140;
    card.interactive = true;
    card.islock = false;
    card.cursor = 'pointer';
    card.back = test1[Math.floor(Math.random() * test1.length)];

    
    if (pairs == 2){
        console.log('win')
    }else card
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
    cardContainer.addChild(card);
    container.addChild(cardContainer);
}

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
container.pivot.x = container.width / 3;
container.pivot.y = container.height / 3;

function onButtonDown() {
    if (this.islock){
        return
    } else{
        console.log(this)
        if (cards.length < 2){
            names.push(this)
            console.log(names)
            this.isdown = true;
            switching(this);
            this.islock = true
            this.interactive = true;
            this.alpha = 1;
            count = count + 1;
            console.log('count:' + count)
        }else{
            this.isdown = false;
            state = 0
            count = 0;
        }
    }
        
}

function onButtonUp(){
    if (count == 2){
        let llll = compare(cards);
        if (llll){
            console.log('yes')
            cards.length = 0;
            names.length = 0;
            count = 0;
            console.log('pairs: '+ pairs)
        } else{
            for (let i = 0; i < names.length; i++){
                names[i].islock = false
            }
            names.length = 0
            state = 0
            console.log('!!!!')
            console.log(names)
            this.isdown = false;
        }
    }
    
}    

function switching(sm){
    switch (sm.back){
        case 'dimond':
            sm.cardColor = 'dimond';
            sm.texture = slotTextures[0];
            cards.push(sm.cardColor)
            console.log(cards)
            break;
        case 'spades':
            sm.cardColor = 'spades';
            sm.texture = slotTextures[1];
            cards.push(sm.cardColor)
            console.log(cards)
            break;
        case 'hearts':
            sm.cardColor = 'hearts';
            sm.texture = slotTextures[2];
            cards.push(sm.cardColor)
            console.log(cards)
            break;
        case 'clubs':
            sm.cardColor = 'clubs';
            sm.texture = slotTextures[3];
            cards.push(sm.cardColor)
            console.log(cards)
            break;
    }
}



function compare(mas){
    for (let i = 0; i < mas.length; i++){
        if (mas[i] === mas[i+1]){
            console.log('new pair')
            pairs += 1
            console.log('cards:'+ pairs)
            names.length = 0
            return true;
        } else {
            for (let i = 0; i < names.length; i++){
                names[i].texture = textureCard;
                count = 0;
            }
            state = false
            console.log('cards:')
            console.log(names)
            console.log('cards:')
            console.log(cards)
            cards.length = 0
            console.log('fall')
            return false
        }
            
    }
}

function win(){
    if (pairs == 2){
        return true
    }
}
