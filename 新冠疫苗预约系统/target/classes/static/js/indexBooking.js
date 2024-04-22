
//初始化booking相关参数
var userId = '';
var vaccineId = '';
var bookingTimezone = '';
var date = '';
/**
 *
 * @param t 列表的下标值
 */
function check(t){
    userId = $("#userId").val();
    let provider = $($("td[name='provider']")[t]).text();
    let brand = $($("select[name='brand'] option:selected")[t]).text();
    vaccineId = $($("select[name='brand'] option:selected")[t]).val();
    date = $($("input[name='date']")[t]).val();
    bookingTimezone = $($("input[name='time']")[t]).val();
    if(!vaccineId|| !date|| !bookingTimezone){
        layer.confirm('请选择您喜欢的疫苗和预订时间', {
            btn: ["OK"],
            icon: 2,
            title: "检查预订！"
        }, function () {
            //点击确后关闭提示框
            layer.closeAll('dialog');
        });
    }else{
        $("#confirm_provider").text(provider);
        $("#confirm_brand").text(brand);
        $("#confirm_date").text(date+' '+bookingTimezone);
        $("#confirm_provider1").text(provider);
        $("#confirm_brand1").text(brand);
        $("#confirm_date1").text(date+' '+bookingTimezone);
        let tt = $("#confirm_content").html();
        layer.open({
            type: 0 ,//选择默认Layer 0（信息框，默认）
            title: '确认您的预订',
            shade: 0.4,
            content: tt ,//支持获取DOM元素
            btn: ['Confirm', 'Cancel'], //设定按钮
            scrollbar: false ,
            yes: function(index){    //点击确定回调
                layer.close(index);
                saveBooking();//调用保存方法
                reduceVaccine(vaccineId);//
                console.log("yes")
                console.log(vaccineId)
            },
            btn2: function(){// 点击Cancel回调
                layer.closeAll();
            }
        })
    }
}
function reduceVaccine(vaccineId){
    var data = {
        "vaccineId": vaccineId,
    };
    $.ajax({
        url: "/vacbook/vaccine/reduceVaccine",
        data: data,
        type: "post",
        dataType: "json",
    });
}
function saveBooking(){
    var data = {"userId":userId,"vaccineId":vaccineId,"date":date,"bookingTimezone":bookingTimezone};
    $.ajax({
        url: "/vacbook/booking/fetch/",
        data: data,
        type: "post",
        success:function (data){
            if(data==true){
                let tt = $("#book-info").html(); //用于弹窗的代码部分
                sendConfirmEmail(userId, vaccineId, date, bookingTimezone);
                layer.open({
                    type: 0 ,  //选择默认Layer 0（信息框，默认）
                    title: '感谢您的预订',   //标题
                    shade: 0.4,
                    content: tt ,
                    btn: ['查看您的预订','返回主页面'], //按钮设置
                    scrollbar: false ,
                    yes: function(){  //点击确定回调
                        window.location.href ='/vacbook/booking/user/'+userId;
                    },
                    btn2: function(index){      // 点击Cancel回调
                        layer.close(index);
                    },
                })
            }else {
                layer.confirm('抱歉，您已经预订了疫苗，无法再次预订:)', {
                    btn: ["OK!"],
                    icon: 2,
                    title: "预订确认!"
                }, function () {
                    //点击确后关闭提示框
                    layer.closeAll('dialog');
                });
            }
        }
    });
}

function sendConfirmEmail(userId, vaccineId, date, bookingTimezone){
    var data = {
        "userId": userId,
        "vaccineId":vaccineId,
        "date": date,
        "bookingTimezone":bookingTimezone,
    }
    $.ajax({
        url: "/vacbook/booking/sendConfirmEmail/",
        data: data,
        type: "post",
        dataType: "json",
    });

}