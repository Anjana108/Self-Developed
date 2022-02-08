var sheep, sheepGIF, sheepGraze;
var game, form, player;
var bg, bg2, bg3, bg4;
var database
var gameState, playerCount=0, buttonPress = 0;
var wolf, wolfGIF; 
var questionArray = [];
var q_a;
var sphinxCave;
var allPlayers;
var isMoving;
var sphinx, sphinxAnimation;
var theAnswer;

function preload() {
    sheepGIF = loadAnimation("./assets/sheep.gif");
    bg = loadImage("./assets/refugeCave.jpg");
    wolfGIF = loadImage("./assets/wolf.gif");
    sheepGraze = loadAnimation("./assets/sheepGraze.gif");
    bg2 = loadImage("./assets/runBg.jpg");
    sphinxAnimation = loadImage("./assets/sphinx.jpg");
    bg3 = loadImage("./assets/bg3.jpg");
    sphinxCave = loadSound("./Sounds/Quiz intro.m4a");
    bg4 = loadImage("./assets/bg4.gif");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();

    sheep = createSprite(width/4, height/1.3);
    sheep.addAnimation('sheepRun', sheepGIF);
    sheep.addAnimation('eatSheep', sheepGraze);
    sheep.visible  = false;

    wolf = createSprite(-120, height/2);
    wolf.addImage(wolfGIF);
    wolf.scale = 0.7;
    wolf.x += 50;
    wolf.visible = false;
    
    game = new Game();
    game.start();

    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", function(data) {
        playerCount = data.val();
        console.log(playerCount);
    })

    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
        gameState = data.val();
        
    })

    var buttonPressRef = database.ref("quizButtonCount");
    buttonPressRef.on("value", function(data) {
        buttonPress = data.val();
        console.log(buttonPress);
    })
}

function draw() {
    background(bg);
    drawSprites();
    if(gameState === 0) {
        sheep.changeAnimation('eatSheep');
        sheep.scale = 1;
    }
    if(playerCount === 2) {
        game.update(1);
    }
    if(gameState === 1) {
        background(bg2);
        game.play(); 
        if(isMoving) {
            moveIt(sheep);
            moveIt(wolf);
        }   
    } 
    if(buttonPress === 2) {
        game.update(2);
        gameState = 2;
    }
    if(gameState === 2) {
        game.quizInvite();
    }
    if(gameState === 3) {
        game.update(3);
        form.quizQA();  
    }

}

question = [ {question: "What gets wetter and wetter the more it dries?",
              score: 2,
              hint: "Hint: Wiper",
              answer: "TOWEL"
             },
             {question: "I have a tail, and I have a head, but I have no body. PS: **I am NOT a snake**. What am I?",
              score: 2,
              hint: "Hint: Heads or Tails?",
              answer: "COIN"
             },
             {question: "What has fourteen hearts, but no other organs?",
              score: 3,
              hint: "Hint: I ace in hearts (COLLECTIVE NOUN)",
              answer: "Hint: A DECK OF CARDS"
             },
             {question: "The more there is, the less you see. What is it?",
              score: 3,
              hint: "Hint: Light Bulb!",
              answer: "DARKNESS"
             },
             {question: "Kira's mother has three children. Their names are Huey, Dewey, and ... ?",
              score: 4,
              hint: "Hint: Not Louie",
              answer: "KIRA"
             },
             {question:"What word is spelled wrong in the dictionary? ",
              score: 4,
              hint: "Hint: It's in your Question",
              answer: "WRONG"
             },
             {question:"Where does Thursday come after Friday?",
              score: 5,
              hint: "Hint: Ever learnt about alphabets?",
              answer: "DICTIONARY"
             },
             {question:`I am weightless, but you can see me. 
             </br>Put me in a bucket, and I'll make it lighter. What am I? `,
              score: 5,
              hint: "Hint: Into the VOID",
              answer: "HOLE"
             },
             {question:"I never was, am always to be; everyone's looking, but no one sees me. What am I?",
              score: 6,
              hint: "Hint: There's always ________",
              answer: "TOMORROW"
             },
             {question:`A man looks at a painting and says,
             </br> “Brothers and sisters I have none, but that man's father is my father's son.” 
             </br>  Who is in the painting? His ______.`,
              score: 6,
              hint: "Sorry! NO HINTS",
              answer: "SON"
             }
]

function moveIt(sprite) {
    sprite.position.x += 20;
    sprite.velocityX = 1.5;
}