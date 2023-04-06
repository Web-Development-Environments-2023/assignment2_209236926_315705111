$(document).ready(function () {
    var users = [];
    $('#logo').animate({opacity: 0.01}, 500, function () {

        $(this).hide();
        $('#landing').fadeIn(1000);             

    });   
    $('#login_b').click(function(){
        $('#landing').fadeOut();
        $('#login').delay(500).show(0);
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
    var emailok = false;
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
    $('#register_submit').click(function(){
        let uname = $('#userReg').val();
        let pw1 = $('#pw1Reg').val().trim();
        let fname = $('#fnameReg').val;
        let lname = $('#lnameReg').val;
        let email = $('#emailReg').val;
        // if(email.includes("@")){
        //     emailok = true;
        // }
        console.log(pwok);
        console.log(fnok);
        console.log(lnok);
        console.log(emailok);

        if (pwok && fnok && lnok){
            let obj = {"uname":uname,"password":pw1,"fname":fname,"lname":lname,"email":email};
            users.push(obj);
            console.log(users);
        }
        else{
            console.log("attempt to register failed");
        }
        
    });
    $('#login_submit').click(function(){
        let uname = $('#username').val();
        let pw1 = $('#password').val().trim();
        let user = "pishoto";
        if (uname && pw1){
            users.forEach(element => {
                if(element["uname"] == uname){
                    let user = element;
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
});