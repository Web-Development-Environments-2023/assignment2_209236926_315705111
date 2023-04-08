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
    var boom = new Audio("assets/boom.wav");
    var weaponTimer = 0;
    var weaponCooldown = 100;
    var trigger = false;
    var speed = 1;
    var lives = 3;
    hero.src = "assets/Ship_1.png";
    enemy.scr = "assets/Ship_5.png"
    bg.src = "assets/space_bg.jpg"
    fProj.src = "assets/f_projectile.webp"
    eProj.src = "assets/e_projectile.png"

    var start = false;
    var u = 0;
    var d = 0;
    var l = 0;
    var r = 0;
    var enemyShots = [{x:0,y:0,active:false}, {x:0,y:0,active:false}]
    var heroShots = [];

    // Set the refresh rate (in milliseconds)
    var refreshRate = 0;
    // Define the game loop function
    function gameLoop() {
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);


        //check for collisions
        for (const eShot of enemyShots){
            if (eShot.active && detectHeroCollision(x,y,eShot.x,eShot.y)){lives-=1; eShot.active=false; boom.play()}
        }
        // Draw the game state

        // moving logic
        y+=(d-u)*speed;
        x+=(r-l)*speed;
        if(y>=790){y=790;}
        if(y<600){y=600;}
        if(x>=525){x=525;}
        if(x<0){x=0;}

        ctx.drawImage(hero, x, y);


        // Process hero shooting logic
        if (weaponTimer>0){weaponTimer-=1}
        if (weaponTimer==0 && trigger) {
            weaponTimer=weaponCooldown;
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
        if (event.key === "1") {hero.src = "assets/Ship_1.png"; speed = 2; weaponCooldown = 100}
        if (event.key === "2") {hero.src = "assets/Ship_2.png"; speed = 1; weaponCooldown = 25}
        if (event.key === "3") {hero.src = "assets/Ship_3.png"}
        if (event.key === "4") {hero.src = "assets/Ship_4.png"}
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
    
      function detectHeroCollision(hx,hy,px,py){      
        // Check for collision
        if (
          px + 14 >= hx &&
          px <= hx + 32 &&
          py + 36 >= hy &&
          py <= hy + 32
          ){
          return true; // collision detected
          } 
        else {
          return false;
          }
        }
});