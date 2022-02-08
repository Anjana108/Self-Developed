class Player {
    constructor() {
        this.name = null;
        this.index = 0;
        this.positionX = 0;
        this.positionY = 0;
        this.score = 0;
    }
    addPlayer() {
        var playerIndex = "players/player" + this.index;

        database.ref(playerIndex).set({
            name: this.name,
            index: this.index,
            positionX: this.positionX,
            positionY: this.positionY,
            score: this.score
        });
    }
    getCount() {
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value", data => {
          playerCount = data.val();
        });
    }

    updateCount(count) {
        database.ref("/").update({
            playerCount: count
        });
    }

    updateButton(press) {
        database.ref("/").update({
            quizButtonCount: press
        })
    }

    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).update({
          name: this.name,
          score: this.score
        });
    }

    getPlayersInfo() {
        var Info = database.ref("players");
        Info.on("value", function(data) {
            allPlayers = data.val();
        }) 
    }
} 