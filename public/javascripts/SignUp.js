// const { response } = require("express");

var registerNewUser = () => {
    var userData = {}
    userData.accountId = $("#uId").val();
    userData.password = $("#uPassword").val();
    // userData.mailId = $("#mailId").val() ;

    $.ajax({
        url: '/add/newUserDetails',
        method:'POST',
        data : userData,
        dataType: 'JSON',
        success:(response)=>{
            console.log(response)
            $("#rblock").text('successfully got registered')
        },
        error:()=>{
            console.log(error)
            $("#rblock").text('Error while registering')
        }
    })
}