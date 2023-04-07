$(document).ready(function () {

    var canvas = document.getElementById("theCanvas");
    var ctx = canvas.getContext("2d");
    var startButton = document.getElementById("startButton");

    // Set up the game state
    var y = canvas.height-50;
    var x = 524/2;
    var img = new Image();
    img.src = "assets/Ship_1.png";
    var bg = new Image();
    bg.src = "assets/space_bg.jpg"
    var start = false;
    var u = 0;
    var d = 0;
    var l = 0;
    var r = 0;
    var enemy_shot_one = {x:0,y:0,active:false}
    var enemy_shot_one = {x:0,y:0,active:false}

    // Set the refresh rate (in milliseconds)
    var refreshRate = 5;
    // Define the game loop function
    function gameLoop() {
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height)

        // Draw the game state

        // moveing logic
        y+=(d-u);
        x+=(r-l);
        if(y>=790){y=790;}
        if(y<600){y=600;}
        if(x>=525){x=525;}
        if(x<0){x=0;}



        ctx.drawImage(img, x, y);

        // Schedule the next frame
        
        setTimeout(gameLoop, refreshRate);
        startButton.hidden = true;

    }
    document.addEventListener('keydown',function(event){
        if(event.key === "ArrowUp"){
            u=1;
        }
        if(event.key === "ArrowDown"){
            d=1;
        }
        if(event.key === "ArrowLeft"){
            l=1;
        }
        if(event.key === "ArrowRight"){
            r=1;
        }

        
    })
    document.addEventListener('keyup',function(event){
        if(event.key === "ArrowUp"){
            u=0;
        }
        if(event.key === "ArrowDown"){
            d=0;
        }
        if(event.key === "ArrowLeft"){
            l=0;
        }
        if(event.key === "ArrowRight"){
            r=0;
        }
    })

    // Start the game loop
    startButton.onclick = gameLoop;
    function a(){}
});