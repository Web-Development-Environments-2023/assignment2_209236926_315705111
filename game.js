$(document).ready(function () {
    let users = [{username:"a",password:"a",first:"test",last:"test",email:"email@email.email"}];
    $('#logo').animate({opacity: 0.01}, 500, function () {

        $(this).hide();
        $('#landing').fadeIn(1000);             

    });   
    $('#login_b').click(function(){
        $('#landing').fadeOut();
        $('#login').delay(500).show(0);
        console.log(users);
    });
    $('#register_b').click(function(){
        $('#landing').fadeOut();
        $('#register').delay(500).show(0);
    });
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    var pwok = false;
    var fnok = false;
    var lnok = false;
    $('#pw1Reg').keyup(function(){
        let pw1 = $('#pw1Reg').val().trim();
        if(pw1.length < 8){
            $('#password-strength-status1').html("Weak (should be atleast 8 characters.)");
        }
        else{
            if ((pw1.match(number) && pw1.match(alphabets))) {
			    $('#password-strength-status1').html("Strong");
            }
            else{
                $('#password-strength-status1').html("please use numbers and characters");
            }
        }
    });
    $('#pw2Reg').keyup(function(){
        let pw2 = $('#pw2Reg').val().trim();
        let pw1 = $('#pw1Reg').val().trim();
        if(pw1 != pw2){
            $('#password-strength-status2').html("does not match the password above");
            pwok = false;
        }
        else{
            $('#password-strength-status2').html("");
            pwok = true;
        }
    });
    $('#fnameReg').keyup(function(){
        let fname = $('#fnameReg').val().trim();
        if(fname.match(number)){
            $('#fnamealert').html("Please dont put numbers in your first name");
            fnok = false;
        }
        else{
            $('#fnamealert').html("");
            fnok = true;
        }
    });
    $('#lnameReg').keyup(function(){
        let lname = $('#lnameReg').val().trim();
        if(lname.match(number)){
            $('#lnamealert').html("Please dont put numbers in your last name");
            lnok = false;
        }
        else{
            $('#lnamealert').html("");
            lnok = true;
        }
    });
    (function() {
        $('form > input').keyup(function() {
            if (pwok && fnok && lnok)
            {
                $('#register_submit').removeAttr('disabled');
            } 
           else 
            {
                $('#register_submit').attr('disabled', 'disabled');
            }
        });
        })()
    function user(username,password,first,last,email){
        this.username = username;
        this.password = password;
        this.first = first;
        this.last = last;
        this.email = email
    }
    $('#register_submit').click(function(){
        let uname = $('#userReg').val();
        let pw1 = $('#pw1Reg').val().trim();
        let fname = $('#fnameReg').val().trim();
        let lname = $('#lnameReg').val().trim();
        let email = $('#emailReg').val().trim();


        if (pwok == true && fnok == true && lnok == true){
            // let obj = new user(uname,pw1,fname,lname,email);
            let obj = {username:uname,password:pw1,first:fname,last:lname,email:email};

            console.log(email);
            users.push(obj);
            console.log(users);
            $('#register').fadeOut();
            $('#landing').delay(500).show(0);
        }
        else{
            window.alert("attempt to register failed");
        }
        
    });
    var curruser;
    $('#login_submit').click(function(){
        let uname = $('#username').val();
        let pw1 = $('#password').val().trim();
        curruser = "pishoto";
        if (uname && pw1){
            console.log("hallo");
            users.forEach(element => {
                if(element["username"] == uname){
                    console.log("hello");
                    curruser = element;
                }
            });
            if(pw1 == curruser["password"]){
                $('#login').fadeOut();
                $('#conf').delay(500).show(0);
            }
            else{
                window.alert(curruser);
            }
        } 
    });
    //Configuration
    var chosen = " ";
    $("#shootChoose").one("keydown", function(event){
            chosen = event.key;
            alert("your shooting button is now: " + event.key);

        });
    $("#start").click(function(){
        if(!lives){return;}
        $('#conf').fadeOut();
        $('#game').delay(500).show(0);
        start = true;
        setupGameListeners();
    })
    let timeInterval;
    var time = $('#gametime').find(":selected").val();



    
        // this.
    
    // var b = getElementById("shoo")
    var modal = document.getElementById("myModal");

    var btn = document.getElementById("about_b");

    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
    modal.style.display = "block";
    }

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    document.addEventListener('keydown',function(event){
        if(event.key === "Escape"){
            modal.style.display = "none";
        }
    })

    var typeButtons = document.querySelectorAll(".shipCardButton")
    typeButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const allDivs = document.querySelectorAll(".shipCard");
            allDivs.forEach(div => {
                div.style.backgroundColor = "white";
            })
            const triggeringDiv = event.target.parentNode;
            triggeringDiv.style.backgroundColor = "yellow";
        })
    })
    document.getElementById("shipCardButton1").addEventListener("click", function(){
        hero.src = "assets/Ship_1.png";
        speed = 1;
        weaponCooldown = 50;
        lives = 3;
    })
    document.getElementById("shipCardButton2").addEventListener("click", function(){
        hero.src = "assets/Ship_2.png";
        speed = 1.5;
        weaponCooldown = 100;
        lives = 3;

    })
    document.getElementById("shipCardButton3").addEventListener("click", function(){
        hero.src = "assets/Ship_3.png";
        speed = 1;
        weaponCooldown = 100;
        lives = 4;
    })



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
    var weaponCooldown;
    var trigger = false;
    var speed;
    var lives;
    //hero.src = "assets/Ship_1.png";
    enemy.src = "assets/Ship_5.png";
    bg.src = "assets/space_bg.jpg";
    fProj.src = "assets/f_projectile.webp";
    eProj.src = "assets/e_projectile.png";

    var start = false;
    var done = false;
    var u = 0;
    var d = 0;
    var l = 0;
    var r = 0;
    var enemyShots = []
    var whatshot = 0;
    var heroShots = [];
    var enemyBox = new Array(5);
    var enemiesCount = 20;
    const eboxW = 250;
    const eboxH = 200;
    var eboxX = 0;
    var eboxY = 0;
    var score = 0;
    var myScore;
    var movei = 0;
    var scores = [];
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
    var startTime;
    var speedup = 1;
            let seconds = 0;
            let minutes = 0;
    
    // Define the game loop function
    function gameLoop() {

        if (!startTime){startTime = performance.now();}
        speedup = 1 + Math.floor((performance.now() - startTime)/1000/5)*0.3
        if (speedup > 2.2) {speedup = 2.2; console.log("max")}
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

        function component(width, height, color, x, y, type) {
            this.type = type;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.update = function() {
              if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
              } else {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
              }
            }
        }
        myScore = new component("30px", "Consolas", "red", 350, 40, "text");
        //check for collisions
        for (const eShot of enemyShots){
            if (eShot.active && detectCollision(x,y,eShot.x,eShot.y)){
                lives-=1; 
                eShot.active=false;
                var boom = new Audio("assets/boom.wav");
                boom.volume = 0.2;
                boom.play()
            }
        }
        for (const hShot of heroShots){
            for (let i = 0; i < enemyBox.length; i++) {
                for (let j = 0; j < enemyBox[0].length; j++) {
                    if(enemyBox[i][j] && detectCollision(eboxX + i*50,eboxY + j*50,hShot.x, hShot.y)){
                        enemiesCount-=1;
                        enemyBox[i][j] = false;
                        hShot.kill = true;
                        var boom = new Audio("assets/boom.wav");
                        boom.volume = 0.1;
                        boom.play()
                        if(j == 3){
                            score += 5;
                        }
                        else if(j == 2){
                            score += 10;
                        }
                        else if(j == 1){
                            score += 15;
                        }
                        else if(j == 0){
                            score += 20;
                        }
                    }
                }
            }
        }
        myScore.text = "SCORE: " + score;
        myScore.update();
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
                eShot.y+=1*speedup;
                ctx.drawImage(eProj, eShot.x, eShot.y)
                if( eShot.y<0 || eShot.x>=540 || eShot.x<0 || eShot.y>860){eShot.active = false}
            }
        }
        // const movement = ["r","d","l","u","rd","up","ld","u"];
        
        switch (movei){
            case 0:
                // console.log(Math.floor(Math.random(8)*10));
                eboxX += 0.5*speedup;
                if(eboxX +250 >= 560){
                    movei += 1;
                }
                break;
            case 1:
                eboxY += 0.5*speedup;
                if(eboxY +200 >= 400){
                    movei += 1;
                }
                break;
            case 2:
                eboxX -= 0.5*speedup;
                if(eboxX < 0){
                    movei += 1;
                }
                break;
            case 3:
                eboxY -= 0.5*speedup;
                if(eboxY < 0){
                    movei += 1;
                }
                break;
            case 4:
                eboxX += 0.5*speedup;
                eboxY += 0.5*speedup;
                if(eboxX +250 >= 560 || eboxY +200 >= 400){
                    movei += 1;
                }
                break;
            case 5:
                eboxY -= 0.5*speedup;
                if(eboxY < 0){
                    movei += 1;
                }
                break;
            case 6:
                eboxX -= 0.5*speedup;
                eboxY -= 0.5*speedup;
                if(eboxX <0 || eboxY < 0){
                    movei += 1;
                }
                break;
            case 7:
                eboxY -= 0.5*speedup;
                if(eboxY < 0){
                    movei = 0;
                }
                break;
        }
        enemyShots = enemyShots.filter(shot => shot.active)
        if (enemiesCount != 0 && enemyShots.length < 2){
            var flag = false;
            for (const shot of enemyShots){if (shot.y<600) {flag = true;}}
            if (!flag){
                var shiprow = Math.floor(Math.random()*3.9);
                var shipcol = Math.floor(Math.random()*4.9);
                console.log(shiprow);
                console.log(shipcol);
                while(enemyBox[shiprow][shipcol] == false){
                    shiprow = Math.floor(Math.random(3)*3.9);
                    shipcol = Math.floor(Math.random(4)*4.9);
                }
                enemyShots.push({x:eboxX + shipcol*50,y:eboxY + shiprow*50, active:true})
            }
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
            shot.x+=shot.v*speedup;
            shot.y-=5*Math.sqrt(speedup);
            ctx.drawImage(fProj,shot.x,shot.y)
            if( shot.y<0 || shot.x>=540 || shot.x<0 || shot.y>860){shot.kill = true}
        }
        heroShots = heroShots.filter(shot => !shot.kill)
        
        // Schedule the next frame
        if (lives != 0 && minutes < time && score<250){
            setTimeout(gameLoop, refreshRate);
            startButton.hidden = true;
        }
        else {done = true;}
        // if(score == 250){
        //     gameOver(score,minutes,lives);
        // }

        timer = () =>{

            timeInterval = setInterval(function() {
                seconds += 1;
                if(seconds == 60){
                    minutes += 1;
                }
                if(minutes == time){
                    seconds = 0;
                    minutes = 0;
                    done = true;
                    clearInterval(timeInterval);
                }
            }, 1000);
        }
        if(done){
            gameOver(score,minutes,lives);
        }


    }
    function gameOver(score,time,lifes){
        scores.push(score);
        scores.sort();
        var table = document.getElementById("scoretable");
        while(table.length > 1){
            table.deleteRow(-1);
        }
        for (let i = 0; i < scores.length; i++) {
            var row = table.insertRow(-1);
            var place = row.insertCell(0);
            var name = row.insertCell(1);
            var num = row.insertCell(2);
            place.innerHTML = i+1;
            name.innerHTML = curruser["first"] + curruser["last"];
            num.innerHTML = scores[i];
        }
        $('#game').fadeOut();
        $('#scoreboard').delay(500).show(0);



    }
    // function newGame(){
    //     $('#scoreboard').fadeOut();
    //     $('#conf').delay(500).show(0);
    //     score = 0;
    //     minutes = 0;
    // }
    // $("#newGame").click(newGame());
    // Check if the key has been pressed, if so signal the main loop that the ship is moving in a direction
    function setupGameListeners(){
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
            if (event.key === chosen) {trigger = true} 
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
            if (event.key === chosen) {trigger = false} 
        })
    }


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

    // Start the game loop
    startButton.onclick = gameLoop;
});

