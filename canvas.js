$(document).ready(function () {

    var canvas = document.getElementById("theCanvas");
    var ctx = canvas.getContext("2d");
    var startButton = document.getElementById("startButton");
    // Set up the game state
    var y = canvas.height-50;
    var x = 524/2;
    var hero = new Image();
    var enemy = new Image();
    var bg = new Image();
    var fProj = new Image();
    var eProj = new Image();
    var weaponTimer = 0;
    var trigger = false;
    hero.src = "assets/Ship_1.png";
    enemy.src = "assets/Ship_5.png";
    bg.src = "assets/space_bg.jpg";
    fProj.src = "assets/f_projectile.webp";
    eProj.src = "assets/e_projectile.png";

    var start = false;
    var u = 0;
    var d = 0;
    var l = 0;
    var r = 0;
    var enemyShotOne = {x:0,y:0,active:false}
    var enemyShotTwo = {x:0,y:0,active:false}
    var heroShots = [];
    var enemyBox = new Array(5);
    const eboxW = 250;
    const eboxH = 200;
    var eboxX = 0;
    var eboxY = 0;

    var movei = 0;
    for (let i = 0; i < enemyBox.length; i++) {
        enemyBox[i] = new Array(4);
    }
    for (let i = 0; i < enemyBox.length; i++) {
        for (let j = 0; j < enemyBox[0].length; j++) {
            enemyBox[i][j] = true;
        }
        
    }
    
    // Set the refresh rate (in milliseconds)
    var refreshRate = 5;
    // Define the game loop function
    function gameLoop() {
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        // Draw the game state
        for (let i = 0; i < enemyBox.length; i++) {
            for (let j = 0; j < enemyBox[0].length; j++) {
                if(enemyBox[i][j]){
                    ctx.drawImage(enemy,eboxX + i*50,eboxY + j*50);
                }
            }
        }
        // const movement = ["r","d","l","u","rd","up","ld","u"];
        switch (movei){
            case 0:
                // console.log(Math.floor(Math.random(8)*10));
                eboxX += 0.5;
                if(eboxX +250 >= 560){
                    movei += 1;
                }
                break;
            case 1:
                eboxY += 0.5;
                if(eboxY +200 >= 400){
                    movei += 1;
                }
                break;
            case 2:
                eboxX -= 0.5;
                if(eboxX < 0){
                    movei += 1;
                }
                break;
            case 3:
                eboxY -= 0.5;
                if(eboxY < 0){
                    movei += 1;
                }
                break;
            case 4:
                eboxX += 0.5;
                eboxY += 0.5;
                if(eboxX +250 >= 560 || eboxY +200 >= 400){
                    movei += 1;
                }
                break;
            case 5:
                eboxY -= 0.5;
                if(eboxY < 0){
                    movei += 1;
                }
                break;
            case 6:
                eboxX -= 0.5;
                eboxY -= 0.5;
                if(eboxX <0 || eboxY < 0){
                    movei += 1;
                }
                break;
            case 7:
                eboxY -= 0.5;
                if(eboxY < 0){
                    movei = 0;
                }
                break;
        }
        // moving logic
        y+=(d-u);
        x+=(r-l);
        if(y>=790){y=790;}
        if(y<600){y=600;}
        if(x>=525){x=525;}
        if(x<0){x=0;}

        ctx.drawImage(hero, x, y);


        // Process hero shooting logic
        if (weaponTimer>0){weaponTimer-=1}
        if (weaponTimer==0 && trigger) {
            weaponTimer=100;
            let velocity = 0;
            if (l&&r){velocity = 0}
            else if (r&&x!=525) {velocity = 1}
            else if (l&&x!=0) {velocity = -1}
            else {velocity = 0}
            const temp = {X:x+10, Y:y-50, v:velocity, kill:false}
            heroShots.push(temp)
        }
        
        for (const shot of heroShots) {
            shot.X+=shot.v;
            shot.Y-=5;
            ctx.drawImage(fProj,shot.X,shot.Y)
            if( shot.Y<0 || shot.X>=540 || shot.X<0 || shot.Y>860){shot.kill = true}
        }
        heroShots = heroShots.filter(shot => !shot.kill)
        
        // Schedule the next frame
        
        setTimeout(gameLoop, refreshRate);
        startButton.hidden = true;

    }
    // Check if the key has been pressed, if so signal the main loop that the ship is moving in a direction
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
        if (event.key === " ") {trigger = true} 
    })
    // Once a key is no longer pressed remove the command for the main loop that signals movement
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
        if (event.key === " ") {trigger = false} 
    })


    // check for fire button

    // Start the game loop
    startButton.onclick = gameLoop;
    function a(){}
    function detectCollision(thisX, thisY, thisWidth, thisHeight, otherX, otherY, otherWidth, otherHeight) {
        // Check for horizontal overlap
        if (thisX + thisWidth >= otherX && thisX <= otherX + otherWidth) {
          // Check for vertical overlap
          if (thisY + thisHeight >= otherY && thisY <= otherY + otherHeight) {
            // The objects are colliding
            return true;
          }
        }
        return false;
      }
});