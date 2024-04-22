function obtain(){
    let mylist = document.getElementById("selectList");
    const optionId = mylist.options[mylist.selectedIndex].id;
    console.log(optionId);
    document.getElementById( optionId).name = "location";
    document.getElementById("option").value = optionId;
}
function check(){
    let name = document.getElementById("name").value;
    let location = document.getElementById("option").value;
    let change = document.getElementById("confirmPassword").value;
    let confirm = document.getElementById("changePassword").value;
    <!--Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters-->
    let reg= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    


    if(confirm == change || (confirm === "" && change==="")){
        let checkPwd = reg.test(change);
        if(confirm !== "" || change !== ""){
            if(checkPwd == false){
                layer.msg("密码无效！密码必须至少包含一个数字和一个大写和小写字母，以及至少 8 个或更多字符");
                return false;
            }
        }
        var data = {
            "name": name,
            "password":confirm,
            "location":location,
        }
        var msg = data.msg;

        $.ajax({
            url: "/vacbook/admin/setting/",
            data: data,
            type: "post",
            dataType: "json",
        });
        layer.msg("成功更改")

        return true;
    }

    if(confirm !== change){
        layer.msg("确认密码与更改密码不同")
        return false;
    }



}