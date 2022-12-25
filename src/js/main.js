import * as PIXI from 'pixi.js';
import { gsap } from "gsap";
import { Howl } from 'howler';
import { Timeline } from 'gsap/gsap-core';


let app = new PIXI.Application({
    view: document.querySelector('#scene'),
    resolution: window.devicePixelRatio || 1,
    antialias: true
});

let pairsCount = 0

let textureCard = PIXI.Texture.from('assets/cards/card.png');
let background = PIXI.Texture.from('assets/back.png');
let back = new PIXI.Sprite(background);
let cards = [];
let names = [];
let allCards = [];
let slotTextures = [
    PIXI.Texture.from('assets/cards/dimond.png'),
    PIXI.Texture.from('assets/cards/spades.png'),
    PIXI.Texture.from('assets/cards/hearts.png')
];
let buttonTexture = PIXI.Texture.from('assets/button.png');
let button = new PIXI.Sprite(buttonTexture);
let textureColor = [
    'dimond',
    'spades',
    'hearts'
];

let dimond = 0,
    spades = 0,
    hearts = 0;

back.width = app.screen.width;
back.height = app.screen.height;
app.stage.addChild(back);



let top = new PIXI.Graphics();
top.beginFill(0xFFFFFF);
top.drawRect(0, 0, app.screen.width, 70);
top.endFill();


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
let backMusic = new Howl({
    src: ['../assets/sounds/backmusic.mp3'],
    volume: 0.2,
    autoplay: true,
    loop: true
});



backMusic.play()

let header = new PIXI.Container();
header.x = 0
header.y = 0
header.width = app.screen.width
header.addChild(top)
app.stage.addChild(header)



let firstLine = new PIXI.Container();
let firstWord = new PIXI.Text('PLAY 2 TIMES A DAY!',firstStyle);
firstLine.x = 0
firstLine.y = 10
firstLine.width = app.screen.width
firstWord.x = Math.round((header.width - firstWord.width) / 2)
firstLine.addChild(firstWord)
header.addChild(firstLine)


let secondLine = new PIXI.Container();
let secondWord = new PIXI.Text('TO KEEP YOUR BRAIN HEALTHY', secondStyle);
secondLine.x = 0
secondLine.y = 35
secondLine.x = Math.round((header.width - secondWord.width) / 2)
secondLine.addChild(secondWord)
header.addChild(secondLine)

gsap.fromTo(header, {y: -100}, {y: 0, duration: 1, delay: 1});


let container = new PIXI.Container();
container.x = app.screen.width / 4;
container.y = app.screen.height / 2.5;

app.stage.addChild(container);
let filter = new PIXI.filters.ColorMatrixFilter();

let noteContainer = new PIXI.Container();
let tapNoteShape = new PIXI.Graphics();
noteContainer.width = 300;
noteContainer.height = 300;
noteContainer.x = 50;
noteContainer.y = 75;
tapNoteShape.beginFill(0xCFBD8F);
tapNoteShape.drawRoundedRect(0, 0, 150, 60, 30);
tapNoteShape.moveTo(90, 60);
tapNoteShape.lineTo(120, 60);
tapNoteShape.lineTo(105, 75);
tapNoteShape.lineTo(90, 60);
tapNoteShape.closePath();
tapNoteShape.endFill();

let tapTextStyle = new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontWeight: 900,
    fontSize: 15,
    fill: 0XBB3131,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 3,
    dropShadowAngle: Math.PI / 4,
    dropShadowDistance: 4,
})

let tapText = new PIXI.Text('TAP TO MATCH\nPAIRS!', tapTextStyle)
tapText.x = 15;
tapText.y = 11;
tapNoteShape.addChild(tapText)
noteContainer.addChild(tapNoteShape);
app.stage.addChild(noteContainer)
noteContainer.visible = false

for (let i = 0; i < 6; i++) {
    let cardContainer = new PIXI.Container();
    cardContainer.width = 110;
    cardContainer.height = 160;
    cardContainer.x = (i % 3) * 120;
    cardContainer.y = Math.floor(i / 3) * 180;
    let card = new PIXI.Sprite(textureCard);
    
    card.anchor.set(0.5);
    card.interactive = false;
    card.islock = false;
    card.cursor = 'pointer';
    card.front = true

    if (dimond === 2){
        textureColor.forEach((item, i, arr) => {
            if (item === 'dimond'){
                textureColor.splice(i, 1)
            } else return
        })
    }
    if (spades === 2){
        textureColor.forEach((item, i, arr) => {
            if (item === 'spades'){
                textureColor.splice(i, 1)
            } else return
        })
    }
    if (hearts === 2){
        textureColor.forEach((item, i, arr) => {
            if (item === 'hearts'){
                textureColor.splice(i, 1)
            } else return
        })
    }
    let cardColorBack = textureColor[Math.floor(Math.random() * textureColor.length)];
    switch (cardColorBack){
        case 'dimond':
            dimond++;
            card.back = cardColorBack;
            break;
        case 'spades':
            spades++;
            card.back = cardColorBack;
            break;
        case 'hearts':
            hearts++;
            card.back = cardColorBack;
            break;
    }
    allCards.push(card)
    container.interactive = false;
    card
        .on('pointerdown', onButtonDown)
    
    cardContainer.addChild(card);
    container.addChild(cardContainer);
}

allCards.forEach((item,i) => {
    
    if (i < 3) {
        gsap.fromTo(item, {x: 1000}, {x: 0 + i * 80, duration: 1, ease: "back.out(1.2)", delay: 1 + i*0.1})
    }
    if (i >= 3) {
        gsap.fromTo(item, {x: -1000}, {x: 0 + (i - 3) * 80, duration: 1, ease: "back.out(1.2)", delay: 1 + i*0.1}).eventCallback('onComplete', () => {
            for (let i = 1; i < allCards.length; i++){
                allCards[0].interactive = false
                allCards[i].interactive = false
                let noneActive = new PIXI.Graphics();
                noneActive.beginFill(0x000000);
                noneActive.drawRect(-55, -80, 110, 160);
                noneActive.endFill();
                noneActive.alpha = 0;
                allCards[i].addChild(noneActive)
                gsap.to(noneActive, {alpha: 0.2, duration: 1} )
                
            }
            container.interactive = true;
            
            
            gsap.to(noteContainer, {alpha: 1, duration: 1, visible: true})
            gsap.to(noteContainer, {alpha: 0.6, repeat: -1, yoyo: true, duration: 0.6})
            gsap.to(filter, {greyscale: 0.3, duration: 2}).eventCallback('onComplete',() => {
                allCards[0].interactive = true
            })
            back.filters = [filter]
            
        })
    }

    
})

function onButtonDown() {
    let click = new Howl({
        src: ['../assets/sounds/click.wav'],
        volume: 0.5,
    });

    if (this.islock || names.length > 1 || pairsCount === 2){
        return
    } 
    
    container.interactiveChildren = false
    names.push(this)

    gsap.fromTo(this, {width: 110}, {width: 0, duration: 0.2}).eventCallback('onComplete', () => {
        if (this.front){
            click.play();
            switching(this)
            this.front = false
            allCards.forEach((item) => {
                item.interactive = true
            })
            gsap.fromTo(this, {width: 0}, {width: 110, duration: 0.2}).eventCallback('onComplete', () => {
                container.interactiveChildren = true
                filter.enabled = false
                noteContainer.visible = false
                allCards.forEach((item) => {
                    item.children.forEach((item) => {
                        gsap.to(item, {alpha: 0, duration: 1})
                    })
                })
                
            })
        }

        if (names.length === 2) {
            if (names[0].cardColor === names[1].cardColor){
                let match = new Howl({
                    src: ['../assets/sounds/match.wav'],
                    volume: 0.5
                });
                match.play();
                console.log('same');
                names[0].islock = true;
                names.forEach((elem) => {
                    gsap.to(elem, {rotation: 0.1, ease: 'power1.in'});
                    
                })
                names = [];
                cards = [];
                pairsCount++;
                if (pairsCount === 2){
                    setTimeout(() => {
                        allCards.forEach((item, i) => {
                            if (i < 3) {
                                gsap.to(item, {x: 1000, duration: 2, ease: "back.inOut(3)"})
                            }
                            if (i >= 3) {
                                gsap.to(item, {x: -1000, duration: 2, ease: "back.inOut(3)"}).eventCallback('onComplete', () => {
                                    console.log('finish');
                                    let win = new Howl({
                                        src: ['../assets/sounds/win.wav'],
                                        volume: 0.5
                                    })
                                    backMusic.stop();
                                    win.play();
                                })
                            }
                            
                        })
                        setTimeout(() => {
                            back.width = app.screen.width;
                            back.height = app.screen.height;
                            back.alpha = 0;
                            gsap.to(back, {alpha: 1, duration: 1})
                            app.stage.addChild(back);
                            let winContainer = new PIXI.Container();
                            winContainer.width = 400;
                            winContainer.alpha = 0;
                            winContainer.height = app.screen.height;
                            winContainer.x = Math.round((back.width - 400) / 2)
                            let winTextStyle = new PIXI.TextStyle({
                                fontFamily: 'Creolia',
                                fontWeight: 900,
                                fontSize: 40,
                                fill: 0XC2BEB4,
                                stroke: '#444444',
                                strokeThickness: 2,
                            })
                            let winText = new PIXI.Text('YOU WIN!', winTextStyle);
                            winText.x = Math.round((400 - winText.width) / 2)
                            winText.y = Math.round((app.screen.height - winText.height) / 6)
                            winContainer.addChild(winText)

                            let prizeBoxTexture = new PIXI.Texture.from('assets/prizebox.png')

                            let prizeBox = new PIXI.Sprite(prizeBoxTexture);
                            prizeBox.anchor.set(0.5)
                            prizeBox.x = 0

                            let starTexture = PIXI.Texture.from('assets/star1.png');

                            let particleContainer = new PIXI.Container();
                            particleContainer.x = Math.round((400 - prizeBox.width) / 2);
                            particleContainer.y = Math.round((app.screen.height - prizeBox.height) / 2)
                            
                            setInterval(() => {
                                let stars = [];
                                for (let i = 0; i < 70; i++){
                                    let star = new PIXI.Sprite(starTexture);
                                    star.x = 0;
                                    star.y = 0;
                                    star.anchor.set(0.5);
                                    star.width = 0;
                                    star.height = 0;
                                    star.alpha = 0;
                                    particleContainer.addChild(star);
                                    particleContainer.addChild(prizeBox);
                                    stars.push(star);
                                }
                                for (let k = 0; k < stars.length; k++){
                                    let star = stars[k];
                                    let size = Math.random() * 30;
                                    let deg = Math.random() * Math.PI * 2;
                                    let distance = Math.random() * 150 + 1;
                                    gsap.to(star, { width: size,
                                                    height: size,
                                                    alpha: 1,
                                                    x: Math.cos(deg) * distance,
                                                    y: Math.sin(deg) * distance,
                                                    duration: 1}).eventCallback('onComplete', () => {
                                                        gsap.to(star, {alpha: 0, duration: 0.4}).eventCallback('onComplete', () => {
                                                            particleContainer.removeChild(star);
                                                        });
                                                    });
                                };
                                stars = [];
                            }, 400)
                            winContainer.addChild(particleContainer);

                            let buttonTStyle = new PIXI.TextStyle({
                                fontFamily: 'Creolia',
                                fontWeight: 900,
                                fontSize: 20,
                                fill: 0XC2BEB4,
                                stroke: '#444444',
                                strokeThickness: 2,
                            })
                            let buttonT = new PIXI.Text('INSTALL NOW', buttonTStyle)
                            buttonT.x = Math.round((180 - buttonT.width) / 2)
                            buttonT.y = Math.round((50 - buttonT.height) / 2)
                            button.y = app.stage.height - 100
                            let heights = app.stage.height - 110
                            gsap.to(button, {y: heights, repeat: -1, yoyo: true, duration: 0.6})
                            app.stage.addChild(buttonContainer);
                            gsap.to(winContainer, {alpha: 1, duration: 1})
                            app.stage.addChild(winContainer)
                            winContainer.alpha = 0;
                            gsap.to(winContainer, {alpha: 1, duration: 1})
                        }, 1500)
                        
                        
                    }, 1000)
                }
            } else {
                console.log('different')
                setTimeout(() => {
                    let matchFail = new Howl({
                        src: ['../assets/sounds/matchfail.wav'],
                        volume: 0.5
                    });
                    matchFail.play()
                    names.forEach((elem) => {
                        elem.islock = false;
                        elem.front = true;
                        gsap.fromTo(elem, {width: 110}, {width: 0, duration: 0.2}).eventCallback('onComplete', () => {
                            elem.texture = textureCard
                            gsap.fromTo(elem, {width: 0}, {width: 110, duration: 0.2})
                        })
                        
                    })
                    names = [];
                    cards = [];
                }, 1000)
            }
        }
    }, ['width'])
    return;
}

function switching(sm){
    switch (sm.back){
        case 'dimond':
            sm.cardColor = 'dimond';
            sm.texture = slotTextures[0];
            sm.front = false
            sm.islock = true
            cards.push(sm.cardColor)
            break;
        case 'spades':
            sm.cardColor = 'spades';
            sm.texture = slotTextures[1];
            sm.front = false
            sm.islock = true
            cards.push(sm.cardColor)
            break;
        case 'hearts':
            sm.cardColor = 'hearts';
            sm.texture = slotTextures[2];
            sm.front = false
            sm.islock = true
            cards.push(sm.cardColor)
            break;
    }
}

let buttonContainer = new PIXI.Container();

buttonContainer.width = 180;
buttonContainer.height = 50;

button.x = Math.round((app.stage.width - 180) / 2)
button.y = app.stage.height - 70
buttonContainer.interactive = true;
buttonContainer.cursor = 'pointer';

let buttonTextStyle = new PIXI.TextStyle({
    fontFamily: 'Creolia',
    fontWeight: 900,
    fontSize: 20,
    fill: 0XC2BEB4,
    stroke: '#444444',
    strokeThickness: 2,
})
let buttonText = new PIXI.Text('INSTALL NOW', buttonTextStyle)
buttonText.x = Math.round((180 - buttonText.width) / 2)
buttonText.y = Math.round((50 - buttonText.height) / 2)
buttonContainer.alpha = 0;
gsap.fromTo(buttonContainer, {y: 100}, {y: 0, duration: 1, delay: 1, alpha: 1})

buttonContainer.on('pointerdown', () => {
    window.open('https://pixijs.com/')
})
button.addChild(buttonText)
buttonContainer.addChild(button)
app.stage.addChild(buttonContainer);