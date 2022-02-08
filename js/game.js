class Game {
    constructor() {
        this.button = createButton("I am Ready");
        this.screen = loadImage("./assets/bg4.gif");
    }

    showButton() {
        this.button.position(width/1.5, height-150);
        this.button.size(200, 50);
        this.button.class("customButton");
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref("/").update({
            gameState: state
        })
    }

    start() {
        player = new Player();
        playerCount = player.getCount();

        form = new Form();
        form.display();
    }

    play() {
        form.hide();
        form.greeting.hide();

        sheep.changeImage('sheepRun');
        sheep.visible = true;
        sheep.position.x += 10;
        sheep.position.y = height/2+27;
        sheep.scale = 0.5;

        wolf.visible = true;
        isMoving = true;

        if(wolf.position.x > width && gameState === 1) {
            background("black");
            fill("white");
            textSize(50);
            text(`You guys fell into the pit...
        Wolf, I am really sorry for you.
        Sheep, that was a very close miss.
        I do not know whether or not this is good news,
        but, you have come to the cave of the Sphinx.
        She will let you go only if you answer her questions correctly.
        The winner, if Wolf: Will get to eat the sheep,
        and if sheep: can escape and never be harmed by wolves.
        So... Well, do well.
        All The Best!`, 50, 100);
            this.showButton();
            this.button.mousePressed(()=>{
                buttonPress += 1;
                player.updateButton(buttonPress);
                if(buttonPress === 1) {
                    fill("white");
                    textSize(20);
                    text("Wait for your opponent to declare that he is ready, please!", width/4, this.button.position.y);
                    console.log(buttonPress);
                }
            })
        }

        drawSprites();
    }

    quizInvite() {
        wolf.visible = false;
        sheep.visible = false;
        this.button.hide();
        background(bg3);
        sphinx = createSprite(width/2, height/2);
        sphinx.addImage('sphinx',sphinxAnimation);
        sphinx.scale = 3;
        drawSprites(); 
        if(!sphinxCave.isPlaying()){
            sphinxCave.play();
            sphinxCave.looping = false;
        }
        setTimeout(()=> {            
            gameState = 3; 
            console.log(gameState + ": gameState");    
            sphinxCave.setVolume(0);
            sphinxCave.stop();      
        }, 36000);
        
    }

    

    
}