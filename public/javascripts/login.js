var validedCaptchaText = () => {
    var value = $(".userCaptchaText").val()
    console.log(value)
    if(value.length){
        $("#loginBtn").removeAttr('disabled')
    }else{
        $("#loginBtn").attr('disabled', true)
    }
}

var validateUserDetails = () => {
    var uData = {};
    uData.accountId = $("#uid").val()
    uData.password = $("#accountPwd").val()
    console.log(uData);

    $.ajax({
        url : '/getdetails',
        method: 'POST',
        data : uData,
        dataType : 'JSON',
        success: (response)=>{
            console.log(response)
            if(response.msg == 'valid'){
                loadSelectedPage('pDetails')
            }else{
                $(".invalidCredentials").show()
            }
        },
        error:(error)=>{
            console.log(error)
        }
    })
}