function check() {
    let firstName = document.getElementById("firstname").value;
    let age = document.getElementById("age").value;
    let lastName = document.getElementById("lastname").value;
    let password = document.getElementById("password").value;
    let phone = document.getElementById("phoneNumber").value;
    let passwordSecond = document.getElementById("passwordSecond").value;
    let gender = document.getElementById("gender").value;
    let address = document.getElementById("autocomplete").value;
    let email = document.getElementById("email").value;
    let account = document.getElementById("account").value;
    let question = document.getElementById("question").value;
    let key = document.getElementById("questionAnswer").value;
    <!--Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters-->
    let reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let checkPwd = reg.test(password);
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let checkEmail = re.test(email)





    if (password != passwordSecond) {
        layer.msg("错误的密码.");
        return false;
    }


    if (firstName.trim() == null || firstName == "") {
        layer.msg("名字不能为空");
        return false;
    }

    if (age == null || age == "") {
        layer.msg("年龄不能为空");
        return false;
    }
    if (age<=0||age>120) {
        layer.msg("年龄是错误的.");
        return false;
    }

    if (lastName.trim() == null || lastName == "") {

        layer.msg("姓氏不能为空");
        return false;
    }



    if (password == null || password == "") {
        layer.msg("密码不能为空");
        return false;
    }

    if (account== null || account== "") {
        layer.msg("账号不能为空");
        return false;
    }

    if (passwordSecond == null || passwordSecond == "") {
        layer.msg("密码确认不能为空");
        return false;
    }

    if(checkPwd == false){
        layer.msg("密码无效！密码必须至少包含一个数字和一个大写和小写字母，以及至少 8 个或更多字符");
        return false;
    }

    if (email.trim() == null || email == "") {
        layer.msg("电子邮件不能为空");
        return false;
    }

    if(!checkEmail){
        layer.msg("电子邮件无效");
        return false;
    }

    if (question == null || question == "") {
        layer.msg("问题不能为空");
        return false;
    }

    if (key == null || key == "") {
        layer.msg("答案不能为空");
        return false;
    }


    if ( address == "") {
        layer.msg("请选择您的地址！")
        return false;
    }

    if (gender == "Select" || gender == "") {
        layer.msg("请选择您的性别！")
        return false;
    }




    if (phone.trim() == null || phone == "") {
        layer.msg("手机不能为空");
        return false;
    }

    if(phone>9999999999){
        layer.msg("您的电话号码有误");
        return false;
    }

    if(password.length < 6 || password.length > 16){

        layer.msg("密码长度应在6-18之间");
        return false;
    }





    if (password == passwordSecond) {
        var data = {
            "userLastname": lastName,
            "userFirstname": firstName,
            "phoneNumber": phone,
            "email": email,
            "gender": gender,
            "address": address,
            "age": age,
            "userPassword": password,
            "userAccount": account,
            "userSafeKey": key,
            "userQuestion": question,
        }
        $.ajax({
            url: "/vacBook/user/register/",
            data: data,
            type: "post",
            dataType: "text",



            success: function(data){
                var code = data.code;
                console.log(code);
                console.log(data.status+"2");
                layer.msg("恭喜您注册，即将跳转" );
                setTimeout(function(){//两秒后跳转
                    location.href = "index";
                },2000);
            },
            error : function() {
                console.log(data.status+"1");
                layer.msg("您的帐户或电子邮件或电话已注册！",{icon: 5});
            }

        });


        return true;
    }
}