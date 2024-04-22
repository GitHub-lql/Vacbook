function checkRegister() {
    let locationId = document.getElementById("locationId").value;
    let password = document.getElementById("password").value;
    let passwordSecond = document.getElementById("passwordSecond").value;
    let adminName = document.getElementById("adminName").value;
    let account = document.getElementById("account").value;
    <!--Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters-->
    let reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let checkPwd = reg.test(password);

    console.log(password);




    if (password != passwordSecond) {
        layer.msg("密码错误");
        return false;
    }

    if (adminName =="") {
        layer.msg("提供者不能为空");
        return false;
    }

    if (account== null || account== "") {
        layer.msg("帐户不能为空");
        return false;
    }

    if (password == null || password == "") {
        layer.msg("密码不能为空");
        return false;
    }

    if(checkPwd == false){
        layer.msg("密码无效！密码必须至少包含一个数字和一个大小写字母，以及至少8个或更多字符");
        return false;
    }



    if (passwordSecond == null || passwordSecond == "") {
        layer.msg("密码确认不能为空");
        return false;
    }



    if ( locationId == "") {
        layer.msg("请选择您的地址！")
        return false;
    }


    if (password == passwordSecond) {
        console.log(password);
        var data = {
            "adminName": adminName,
            "adminAccount": account,
            "adminPassword": password,
            "locationId": locationId,
        }
        $.ajax({
            url: "/vacbook/admin/register/",
            data: data,
            type: "post",
            dataType: "text",



            success: function(data){
                var code = data.code;
                console.log(code);
                console.log(data.status+"2");
                layer.msg("恭喜您注册，请稍候。" );
                setTimeout(function(){//两秒后跳转
                    location.href = "index";
                },2000);
            },
            error : function() {
                console.log(data.status+"1");
                layer.msg("您的帐户、电子邮件或电话已注册",{icon: 5});
            }

        });


        return true;
    }
}