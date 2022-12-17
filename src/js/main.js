import * as PIXI from 'pixi.js'
import { gsap } from "gsap";

// let font = new FontFaceSetLoadEvent('Lyonesse',{})
// font.load.then(() =>{
    
// }, () => {
//     console.log('Unable to load required font!')
// })

let app = new PIXI.Application({
    view: document.querySelector('#scene'),
    resolution: window.devicePixelRatio || 1,
    antialias: true
});

let count = 0;
let pairsCount = 0

let textureCard = PIXI.Texture.from('assets/card.png');
let background = PIXI.Texture.from('assets/back.png');
let back = new PIXI.Sprite(background);
let cards = [];
let names = []
let slotTextures = [
    PIXI.Texture.from('assets/dimond.png'),
    PIXI.Texture.from('assets/spades.png'),
    PIXI.Texture.from('assets/hearts.png'),
    PIXI.Texture.from('assets/clubs.png'),
];
let textureColor = [
    'dimond',
    'spades',
    'hearts',
    'clubs'
];



back.width = app.screen.width;
back.height = app.screen.height;
app.stage.addChild(back);

let top = new PIXI.Graphics();
top.beginFill(0xFFFFFF);
top.drawRect(0, 0, app.screen.width, 70);
top.endFill();
//app.stage.addChild(top);


let firstStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontWeight: 600,
    fontSize: 20,
    fill: 0XBB3131
})

let secondStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontWeight: 900,
    fontSize: 20,
    fill: 0XBB3131
    
})

let header = new PIXI.Container();
header.x = 0
header.y = 0
header.width = app.screen.width
header.addChild(top)
app.stage.addChild(header)



let firstLine = new PIXI.Container();
let firstWord= new PIXI.Text('PLAY 2 TIMES A DAY!',firstStyle);
firstLine.x = 0
firstLine.y = 10
firstLine.width = app.screen.width
firstWord.width = 400
console.log(firstWord.width)
firstWord.x = Math.round((header.width - firstWord.width) / 2)
firstLine.addChild(firstWord)
app.stage.addChild(firstLine)


let secondLine = new PIXI.Container();
let secondWord = new PIXI.Text('TO KEEP YOUR BRAIN HEALTHY', secondStyle);
secondLine.x = 0
secondLine.y = 35
secondWord.width = 700
secondLine.x = Math.round((header.width - secondWord.width) / 2)
secondLine.addChild(secondWord)
app.stage.addChild(secondLine)

gsap.fromTo(firstLine, {x: -600}, {x: 0, duration: 1, delay: 1});


let container = new PIXI.Container();
app.stage.addChild(container);
let keks = []

for (let i = 0; i < 6; i++) {
    let cardContainer = new PIXI.Container();
    cardContainer.width = 170;
    cardContainer.height = 130;
    cardContainer.x = (i % 3) * 200;
    cardContainer.y = Math.floor(i / 3) * 120;
    let card = new PIXI.Sprite(textureCard);
    card.width = 170;
    card.height = 100;
    card.anchor.set(0.5);
    card.interactive = true;
    card.islock = false;
    card.cursor = 'pointer';
    keks.push(card)
    card.front = true
    card.back = textureColor[Math.floor(Math.random() * textureColor.length)];
    console.log(card.back)
    card
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
    cardContainer.addChild(card);
    container.addChild(cardContainer);
}

let tl = gsap.timeline()

container.x = app.screen.width / 2;
container.y = app.screen.height / 2;
container.pivot.x = container.width / 3;
container.pivot.y = container.height / 4;
let timer

function onButtonDown() {
    if (this.islock){
        return
    } else{
        //tl.fromTo(this, {width: 170}, {width: 0})
        if (cards.length < 2){
            
            names.push(this)
            tl.fromTo(this, {width: 170}, {width: 0, duration: 0.2})
            setTimeout(() => {
                if (this.front) {
                    switching(this)
                    this.front = false
                    tl.fromTo(this, {width: 0}, {width: 170, duration: 0.2})
                    
                }
            }, 400)
            this.interactive = true
            console.log(this)
            count++;
            console.log('count: ' + count)
        }else{
            count = 0;
        }
    }
        
}

function onButtonUp(){
    if (count == 2){
        setTimeout(() => {
            let llll = compare(cards);
            if (llll){
                //tl.fromTo(sm, {width: 0}, {width: 170, duration: 2})
    
                cards.length = 0;
                names.length = 0;
                count = 0;
                pairsCount++;
                console.log(pairsCount)
                if (pairsCount === 2) {
                    console.log('finish');
                    let finishScreen = new PIXI.Graphics().beginFill(0xff0000).drawRect(-1000, -1000, 2000, 2000);
                    app.stage.addChild(finishScreen);
                }
            } else{
                
                for (let i = 0; i < names.length; i++){
                    names[i].islock = false
                    names[i].front = true
                    
                    names[i].texture = textureCard;
                    
                    
                }
                
                console.log(names)
                names.length = 0
            }
        }, 1000)
        
    }
    
}    

function switching(sm){
    switch (sm.back){
        case 'dimond':
            sm.cardColor = 'dimond';
            sm.texture = slotTextures[0];
            sm.front = false
            sm.islock = true
            //sm.interactive = false
            //container.interactive = false
            //tl.fromTo(sm, {width: 0}, {width: 170})
            // tl.fromTo(sm, {alpha: 0}, {alpha: 1})
            cards.push(sm.cardColor)
            break;
        case 'spades':
            sm.cardColor = 'spades';
            sm.texture = slotTextures[1];
            sm.front = false
            sm.islock = true
            //sm.interactive = false
            //container.interactive = false
            //tl.fromTo(sm, {width: 0}, {width: 170})
            // tl.fromTo(sm, {alpha: 0}, {alpha: 1})
            cards.push(sm.cardColor)
            break;
        case 'hearts':
            sm.cardColor = 'hearts';
            sm.texture = slotTextures[2];
            sm.front = false
            sm.islock = true
            //sm.interactive = false
           // container.interactive = false
            //tl.fromTo(sm, {width: 0}, {width: 170})
            // tl.fromTo(sm, {alpha: 0}, {alpha: 1})
            cards.push(sm.cardColor)
            break;
        case 'clubs':
            sm.cardColor = 'clubs';
            sm.texture = slotTextures[3];
            sm.front = false
            sm.islock = true
            //sm.interactive = false
            //container.interactive = false
            //tl.fromTo(sm, {width: 0}, {width: 170})
            //tl.fromTo(sm, {alpha: 0}, {alpha: 1})
            cards.push(sm.cardColor)
            break;
    }
}

function compare(mas){
    for (let i = 0; i < mas.length; i++){
        if (mas[i] === mas[i+1]){
            names.length = 0
            return true;
        } else {
            
            count = 0
            cards.length = 0
            console.log('fall')
            return false
        }
            
    }
}

