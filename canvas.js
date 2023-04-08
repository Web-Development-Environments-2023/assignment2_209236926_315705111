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
    boom.volume = 0.2;
    var weaponTimer = 0;
    var weaponCooldown = 100;
    var trigger = false;
    var speed = 1;
    var lives = 3;
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
    var enemyShots = [{x:0,y:0,active:false}, {x:0,y:0,active:false}]
    var whatshot = 0;
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
    var refreshRate = 0;
    // Define the game loop function
    function gameLoop() {
        
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);


        //check for collisions
        for (const eShot of enemyShots){
            if (eShot.active && detectCollision(x,y,eShot.x,eShot.y)){lives-=1; eShot.active=false; boom.play()}
        }
        for (const hShot of heroShots){
            for (let i = 0; i < enemyBox.length; i++) {
                for (let j = 0; j < enemyBox[0].length; j++) {
                    if(enemyBox[i][j] && detectCollision(eboxX + i*50,eboxY + j*50,hShot.x, hShot.y)){
                        enemyBox[i][j] = false;
                        hShot.kill = true;
                        var boom = new Audio("assets/boom.wav");
                        boom.volume = 0.1;
                        boom.play()
                    }
                }
            }
        }
        // Draw the game state
        for (let i = 0; i < enemyBox.length; i++) {
            for (let j = 0; j < enemyBox[0].length; j++) {
                if(enemyBox[i][j]){
                    ctx.drawImage(enemy,eboxX + i*50,eboxY + j*50);
                }
            }
        }
        for (const eShot of enemyShots){
            if (eShot.active){
                eShot.y+=1.5;
                ctx.drawImage(eProj, eShot.x, eShot.y)
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
        var shiprow = Math.floor(Math.random()*3.9);
        var shipcol = Math.floor(Math.random()*4.9);
        console.log(shiprow);
        console.log(shipcol);
        while(enemyBox[shiprow][shipcol] == false){
            console.log("hello");
            shiprow = Math.floor(Math.random(3)*10);
            shipcol = Math.floor(Math.random(4)*10);
        }
        
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
            const temp = {x:x+10, y:y-50, v:velocity, kill:false}
            heroShots.push(temp)
            var shoot = new Audio("assets/shoot.wav");
            shoot.volume = 0.1;
            shoot.play();
        }
        
        for (const shot of heroShots) {
            shot.x+=shot.v;
            shot.y-=5;
            ctx.drawImage(fProj,shot.x,shot.y)
            if( shot.y<0 || shot.x>=540 || shot.x<0 || shot.y>860){shot.kill = true}
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
    function detectEnemyCollision(ex, ey, px, py) {
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
    
    function detectCollision(hx,hy,px,py){      
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