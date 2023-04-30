$(document).ready(function () {
    w = screen.width;
    h = screen.height;
    console.log("hi")
    console.log(w,h)
    if(w<1400 || h <800){
        $("html").css("zoom", "0.67");
    }
    else{
        $("html").css("zoom", "1");
    }
    window.addEventListener("keydown", function (event) {
        if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight"|| event.key===" ") {
            event.preventDefault();
        }
    });
    let users = [{username:"p",password:"testuser",first:"test",last:"test",email:"email@email.email"}];
    $('#logo').animate({opacity: 0.01}, 500, function () {

        $(this).hide();
        $('#landing').fadeIn(1000);             

    });   
    window.onresize = function(){
        w = screen.width;
        h = screen.height;
        console.log("hi")
        console.log(w,h)
        if(w<1400 || h <800){
            $("html").css("zoom", "0.68");
        }
        else{
            $("html").css("zoom", "1");
        }
    };
    var menclick = 0;
    $(".tab").click(function(){
        if(menclick == 0){
            $(".menu").css("width","80px");
            $(".bar-button").css("display","block");
            menclick = 1;
        }
        else{
            $(".menu").css("width","0px");
            $(".bar-button").css("display","none");
            menclick = 0;
        }
    });
    function fading(){
        resetGame(true);
        $('#landing').fadeOut();
        $('#login').fadeOut();
        $('#register').fadeOut();
        $('#game').fadeOut();
        $('#scoreboard').fadeOut();
        $('#conf').fadeOut();
        lives = 0;
    }
    $("#mWelcome").click(function(){
        fading();
        $('#landing').delay(250).show(0);
    });
    $("#mLogin").click(function(){
        fading();
        $('#login').delay(250).show(0);
    });
    $("#mRegister").click(function(){
        fading();
        $('#register').delay(250).show(0);
    });
    $("#mAbout").click(function(){
        $('#myModal').css("display","block");
    });
    $('#login_b').click(function(){
        $('#landing').fadeOut();
        $('#login').delay(500).show(0);
        console.log(users);
    });
    setInterval(function(){
        if(lives == 0 && music){
            music.pause();
        }
        else{
            if(music && playing){
                music.play();
            }
        }
    },1000);
    $('#register_b').click(function(){
        $('#landing').fadeOut();
        $('#register').delay(500).show(0);
    });
    var number = /([0-9])/;
    var alphabets = /([a-zA-Z])/;
    var pwok = false;
    var fnok = false;
    var lnok = false;
    var valid = false;
    var emailok = false;
    var dateok = false;
    $('#pw1Reg').keyup(function(){
        let pw1 = $('#pw1Reg').val().trim();
        if(pw1.length < 8){
            $('#password-strength-status1').html("Weak (should be atleast 8 characters.)");
        }
        else{
            if ((pw1.match(number) && pw1.match(alphabets))) {
			    $('#password-strength-status1').html("Strong");
                valid = true;
            }
            else{
                $('#password-strength-status1').html("please use numbers and characters");
                valid = false;
            }
        }
    });
    $('#pw2Reg').keyup(function(){
        let pw2 = $('#pw2Reg').val().trim();
        let pw1 = $('#pw1Reg').val().trim();
        if(pw1 != pw2 || valid == false){
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
    $(".close-button").click((function(){
        $(this).closest('.page').fadeOut();
        $('#landing').delay(500).show(0);
        $('.inlog').val("");
        $('.inreg').val("");
    }))

    $('#register_submit').click(function(){
        let uname = $('#userReg').val();
        let pw1 = $('#pw1Reg').val().trim();
        let fname = $('#fnameReg').val().trim();
        let lname = $('#lnameReg').val().trim();
        let email = $('#emailReg').val().trim();
        // var date = document.get
        var date = new Date($('#date').val());
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        // alert([day, month, year].join('/'));
        if(email.indexOf("@") != -1){
            emailok = true;
        }
        if(!(Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)))
        {
            dateok = true;
        }
        if (pwok == true && fnok == true && lnok == true && emailok == true && dateok == true){
            let obj = {username:uname,password:pw1,first:fname,last:lname,email:email,date:[day, month, year].join('/')};
            console.log(users);
            users.push(obj);
            $('#register').fadeOut();
            $('#landing').delay(500).show(0);
            pwok = false;
            fnok = false;
            lnok = false;
            valid = false;
            emailok = false;
            dateok = false;
            $('.inreg').val("");
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
            users.forEach(element => {
                if(element["username"] == uname){
                    curruser = element;
                }
            });
            if(pw1 == curruser["password"]){
                $('#login').fadeOut();
                $('#conf').delay(500).show(0);
                loadInitialState();
                $('.inlog').val("");
            }
            else{
                window.alert("The user does not exist please try to insert right user or register╰（‵□′）╯");
            }

        } 
        else{
            alert("Please fill both username and password");
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
        setGameStartVars()
        $('#conf').fadeOut();
        $('#game').delay(500).show(0);
        start = true;
        startButton.hidden = false;

    })
    let timeInterval;
    var time = $('#gametime').find(":selected").val();



    
        // this.
    
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
        speed = 1;
        weaponCooldown = 50;
        lives = 3;
    })
    document.getElementById("shipCardButton2").addEventListener("click", function(){
        speed = 1.5;
        weaponCooldown = 100;
        lives = 3;

    })
    document.getElementById("shipCardButton3").addEventListener("click", function(){
        speed = 1;
        weaponCooldown = 100;
        lives = 4;
    })

    startButton = document.getElementById("startButton");
    var canvas;
    var ctx;
    var startButton;
    var y;
    var x;
    var hero;
    var enemy;
    var bg;
    var fProj;
    var eProj;
    var boom;
    var weaponTimer;
    var weaponCooldown;
    var trigger;
    var speed;
    var lives;
    var done;
    var playing = false;
    var u;
    var d;
    var l;
    var r;
    var enemyShots;
    var heroShots;
    var enemyBox;
    var enemiesCount;
    var eboxX;
    var eboxY;
    var score;
    var myScore;
    var movei;
    var scores;
    var refreshRate;
    var startTime;
    var speedup;
    var seconds;
    var minutes;
    var music;
    var reset;
    function loadInitialState(){ //everything that is "ill only need to load this once"
        canvas = document.getElementById("theCanvas");
        ctx = canvas.getContext("2d");
        $("#game").css("height",canvas.height+55)
        // ctx.scale(0.70,0.70);
        console.log(screen.width);
        console.log(screen.height);
        music = new Audio("assets/music.mp3");
        music.volume = 0.3;
        hero = new Image();
        enemy1 = new Image();
        enemy1.src = "assets/Ship_2.png";
        enemy2 = new Image();
        enemy2.src = "assets/Ship_3.png";
        enemy3 = new Image();
        enemy3.src = "assets/Ship_4.png";
        enemy4 = new Image();
        enemy4.src = "assets/Ship_5.png";
        enemyImages = [enemy1,enemy2,enemy3,enemy4]
        bg = new Image();
        fProj = new Image();
        eProj = new Image();
        boom = new Audio("assets/boom.wav");
        boom.volume = 0.2;
        hero.src = "assets/Ship_1.png";
        bg.src = "assets/space_bg.jpg";
        fProj.src = "assets/f_projectile.webp";
        eProj.src = "assets/e_projectile.png";
        scores = [];
        enemyBox = new Array(5);
        for (let i = 0; i < enemyBox.length; i++) {
            enemyBox[i] = new Array(4);
        }
        
        refreshRate = 0; // Set the refresh rate (in milliseconds)

        document.addEventListener('keydown',function(event){ // Check if the key has been pressed, if so signal the main loop that the ship is moving in a direction
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
        
        document.addEventListener('keyup',function(event){ // Once a key is no longer pressed remove the command for the main loop that signals movement
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

    function setGameStartVars(){
        reset = false;
        music.currentTime = 0;
        y = canvas.height-50;
        x = 524/2;
        weaponTimer = 0;
        trigger = false;
        done = false;
        u = 0;
        d = 0;
        l = 0;
        r = 0;
        enemyShots = []
        heroShots = [];
        enemiesCount = 20;
        eboxX = 0;
        eboxY = 0;
        score = 0;
        movei = 0;
        for (let i = 0; i < enemyBox.length; i++) {
            for (let j = 0; j < enemyBox[0].length; j++) {
                enemyBox[i][j] = true;
            }
        }
        startTime = null;
        speedup = 1;
        seconds = 0;
        minutes = 0;
    }
    
    var whatshot = 0;
    var timerCount = 0;
    var mins = 0;
    var sec = 0;




    // Set the refresh rate (in milliseconds)
    
    // Define the game loop function
    function gameLoop() {
        // timer()
        // music.play()
        if (!startTime){startTime = performance.now();}
        speedup = 1 + Math.floor((performance.now() - startTime)/1000/5)*0.3
        if (speedup > 2.2) {speedup = 2.2; console.log("max")}
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
        playing = true;
        let scoreText = document.getElementById("score");
        let lifes = document.getElementById("lifes");
        let timerdis = document.getElementById("timer");
        $('#score').show(0);
        $('#lifes').show(0);
        $('#timer').show(0);

        function component(width, height, color, x, y, type) {
            this.type = type;
            this.width = width;
            this.height = height;
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.update = function() {
                scoreText.innerHTML = this.text;
                lifes.innerHTML = "LIFES: " + lives;
            }
        }
        myScore = new component("30px", "Consolas", "red", 350, 40, "text");
        //check for collisions
        for (const eShot of enemyShots){
            if (eShot.active && detectCollision(x,y,eShot.x,eShot.y)){
                lives-=1; 
                eShot.active=false;
                var heroBoom = new Audio("assets/heroDamaged.wav");
                heroBoom.volume = 0.3;
                heroBoom.play();
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
                    ctx.drawImage(enemyImages[j],eboxX + i*50,eboxY + j*50);
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
            for (const shot of enemyShots){if (shot.y<500) {flag = true;}}
            if (!flag){
                var shiprow = Math.floor(Math.random()*3.9);
                var shipcol = Math.floor(Math.random()*4.9);
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
        if(y>=690){y=690;}
        if(y<550){y=550;}
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
            if( shot.y<0 || shot.x>=540 || shot.x<0 || shot.y>760){shot.kill = true}
        }
        heroShots = heroShots.filter(shot => !shot.kill)
        
        // Schedule the next frame
        if (lives != 0 && mins < time && score<250 && !reset){
            setTimeout(gameLoop, refreshRate);
            timerCount+=1
            if (5.5 * timerCount >= 1000)
                {
                    if(sec == 59){
                        sec = 0;
                        mins +=1
                    }
                    sec += 1 // decrement the timer
                    timerCount = 0; // reset the count
                    if(sec<10 && mins <10){
                        timerdis.innerHTML = "Time play: 0" + mins+":0"+sec;
                    }
                    else{
                        if(sec<10){
                            timerdis.innerHTML = "Time play:" + mins+":0"+sec;
                        }
                        else{
                            timerdis.innerHTML = "Time play:" + mins+":"+sec;
                        }
                    }
                } // end if
            startButton.hidden = true;
        }
        else if (!reset){done = true;}
        
        if(done){
            gameOver(score,minutes,lives);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

    }
    function gameOver(score,endtime,lifes){
        playing = false;
        lives = 0;
        music.pause();
        scores.push(score);
        scores.sort();
        scores.reverse();
        var table = document.getElementById("scoretable");
        var rowCount = $('#scoretable tr').length;
        for (let row = 1; row < rowCount; row++) {
            table.deleteRow(-1);
            
        }
        for (let i = 0; i < scores.length; i++) {
            var row = table.insertRow(-1);
            var place = row.insertCell(0);
            var name = row.insertCell(1);
            var num = row.insertCell(2);
            place.innerHTML = i+1;
            name.innerHTML = curruser["first"] +" " + curruser["last"];
            num.innerHTML = scores[i];
        }
        const allDivs = document.querySelectorAll(".shipCard");
        allDivs.forEach(div => {
            div.style.backgroundColor = "white";
        })
        if(lifes == 0){
            alert("You Lost");
        }
        else{
            if(score == 250){
                alert("Champion!");
            }
            else{
                if(score<100){
                    alert("you can do better than: " + score + " points");
                }
                else{
                    alert("Winner!");
                }
            }
            
        }
        $('#game').fadeOut();
        $('#scoreboard').delay(500).show(0);
        $('#score').hide(0);
        $('#lifes').hide(0);
        $('#timer').hide(0);

    }
    $("#resetGame").click(function(){resetGame()});
        
    function resetGame(full=false){
        playing = false;
        lives = 0;
        if (music){music.pause();}
        reset = true;
        $('#game').fadeOut();
        if (!full){
            $('#conf').delay(500).show(0);
        }
        if (ctx){ctx.clearRect(0, 0, canvas.width, canvas.height);}
        score = 0;
        mins = 0;
        sec = 0;
        const allDivs = document.querySelectorAll(".shipCard");
        allDivs.forEach(div => {
            div.style.backgroundColor = "white";
        })

    }
    $("#newGame").click(function(){
        $('#scoreboard').fadeOut();
        $('#conf').delay(500).show(0);
        score = 0;
        mins = 0;
        sec = 0;
    });
    
    function detectCollision(hx,hy,px,py){ // Check for collision
        if (
            px + 14 >= hx &&
            px <= hx + 32 &&
            py + 36 >= hy &&
            py <= hy + 32
            ){
            return true; // collision detected
            } 
        else {
            return false; // no collision detected
            }
    }

    startButton.onclick = gameLoop; // Start the game loop
});

