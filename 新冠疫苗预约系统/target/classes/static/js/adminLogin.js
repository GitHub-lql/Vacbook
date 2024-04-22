function checkLogin() {
    let account = document.getElementById("adminAccount").value;
    let password = document.getElementById("adminPassword").value;

    console.log(account);
    console.log(password);


    if (account.trim() == null || account == "") {
        layer.msg("请输入您的帐户！");
        return false;
    }

    if(password == ""){
        layer.msg("请输入您的密码！");
        return false;
    }



    if (password !="") {
        var data = {
            "account": account,
            "password": password,
        }
        $.ajax({
            url: "/vacbook/admin/login",
            data: data,
            type: "post",
            dataType: "text",
            success: function(data){
                console.log(typeof data)
                console.log(data)
                if(data === "true"){
                    layer.msg("欢迎使用管理系统！" );
                    setTimeout(function(){//两秒后跳转
                        location.href = "/vacbook/admin/base";
                    },2000);
                }else{
                    layer.msg("您的帐户或密码错误！",{icon: 5});
                    return false;
                }

            },
            error : function() {
                location.href = "login";
            }

        });


        return true;
    }

}