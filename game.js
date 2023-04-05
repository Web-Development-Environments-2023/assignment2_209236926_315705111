$(document).ready(function () {
    var list = []
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
    $('#register_submit').click(function(){
        let uname = $('#userReg').val();
        let pw1 = $('#pw1Reg').val();
        let pw2 = $('#pw1Reg').val();
        let fname = $('#fnameReg').val;
        let lname = $('#lnameReg').val;
        let email = $('#emailReg').val;
        if (uname && pw1 && pw2 && fname && lname && email){
            let uname = $('#userReg').val();
            console.log(uname);
        }
        // if ($('#pw1Reg').val() === $('#pw2Reg').val()){
        //     if
        // }
        
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