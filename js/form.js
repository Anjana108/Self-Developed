class Form {
    constructor() {
        this.heading = createElement("h2");
        this.subheading = createElement("h1");
        this.input = createInput("").attribute("placeholder", "What's your name?");
        this.playButton = createButton("Go!");   
        this.greeting = createElement("h1");
        
    }
    
    elementSettings() {
        this.heading.position(width/2-300, -100);
        this.heading.html("Wolf vs Sheep");
        this.heading.class("gameTitle");

        this.subheading.position(this.heading.x+100, this.heading.y+200);
        this.subheading.html("Where the rivals clash");
        this.subheading.class("greeting");

        this.input.position(width/2-100, height/2-25);
        this.input.size(200, 50);
        this.input.class("customInput");

        this.playButton.position(width/2-50, height/2+50);
        this.playButton.size(100, 50);
        this.playButton.class("customButton");
    }

    display() {
        this.elementSettings();
        if(this.input.value() !== undefined) {
        this.goButton();
        }
        else{
            fill("red");
                text("Sorry? I did not get that...");
                setTimeout(()=> {
                    location.reload();
                },1000);
        }
        //this loop is not working.
    }

    hide() {
        this.heading.hide();
        this.subheading.hide();
        this.playButton.hide();
        this.input.hide();
    }

    goButton() 
    {
        this.playButton.mousePressed(()=> {
            
            this.hide();
            this.greeting.html(`Hello Sheep ${this.input.value()}! 
            </br> Enjoy grazing!
            </br> ...t-t-till
            </br>the wolf arrives...`);
            this.greeting.position(width/2.2, height/2);
            this.greeting.class("greetingCustom");   
            sheep.visible = true;
            player.name = this.input.value();
            playerCount+=1;
            player.index = playerCount;
            player.updateCount(player.index);
            player.addPlayer();
            })
    }

    quizQA() {
        // console.log("inside QA function");
        sphinxCave.setVolume(0);
        sphinxCave.stop();
        // sphinx.visible = false;
        for(var i = 0; i < questionArray.length; i++) {
            q_a = createElement("h1")
            q_a.position(width/2-400, height/3);
            q_a.class("greeting")
            q_a.html(questionArray[i].question);

            theAnswer = createInput("").attribute("placeholder", questionArray[i].hint);
            theAnswer.position(width/2-400, height/2);
            theAnswer.size(800, 400);
            theAnswer.class("customInput");

            if(this.answer.value() === questionArray[i].answer){
            player.score += questionArray[i].score;
            player.update();
            }
        }
    }
    
    

}