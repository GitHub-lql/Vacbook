function login() {
    const name = $("#account").val();//输入的用户名
    const password = $("#password").val();//输入的密码
    console.log(name);
    console.log(password)
    var data = {userAccount: name, userPassword: password}
    $.ajax({
        url: "http://localhost:8080/vacBook/user/login",
        data: data,
        type: "POST",
        dataType: "text",
        success: function (data) {
            console.log(typeof data)
            if(data === "true"){
                console.log(data + "200");
                layer.msg("登录成功！" );
                setTimeout(function () {
                    location.href = "index/booking";
                }, 2000);
            }else{
                console.log(data + "240");
                layer.msg("您的帐户或密码错误！",{icon: 5});
                return false;
            }
        },
        error: function () {
            location.href = "login";
        }
    });
    return true;
}
