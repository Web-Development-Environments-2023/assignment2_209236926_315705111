$(document).ready(function () {
    let users = [{username:"p",password:"testuser",first:"test",last:"test",email:"email@email.email"}];
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
    $('#login_submit').click(function(){
        let uname = $('#username').val();
        let pw1 = $('#password').val().trim();
        let user = "pishoto";
        if (uname && pw1){
            console.log("hallo");
            users.forEach(element => {
                if(element["username"] == uname){
                    console.log("hello");
                    user = element;
                }
            });
            if(pw1 == user["password"]){
                window.alert("you are logged in");
            }
            else{
                window.alert(user);
            }
        } 
    });
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
});