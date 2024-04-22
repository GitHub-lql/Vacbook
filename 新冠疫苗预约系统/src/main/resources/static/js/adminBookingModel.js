/**
 * js for the adminBookingModel
 */
function del_booking(btn,id) {
    layer.confirm('您确定要立即删除此预订吗 <br> 并发送提醒电子邮件？?', {
        btn: ["Confirm", "Cancel"],
        icon: 2,
        title: "Delete Booking Warning!"
    }, function () {
        //点击确后关闭提示框
        layer.closeAll('dialog');

        /*$.get("/vacbook/booking/reject/"+id, function(result){
            if(result){
                $(btn).parent().parent().remove()
                layer.msg('The booking has been deleted !')
            }
        });*/
        $.ajax({
            url: "/vacbook/booking/reject/"+id,
            type: "get",
            beforeSend: function (){
                sendRejectEmail(id);
                addVaccine(id);
            },
            success:function (result){
                if(result){

                    $(btn).parent().parent().remove()
                    layer.msg('预订已被删除！<br>'
                        +"并且提醒电子邮件已成功发送")
                }
            },
        });
    });
}

function sendRejectEmail(id){
    var data = {
        "booking_id": id,
    }
    $.ajax({
        url: "/vacbook/booking/sendRejectEmail/",
        data: data,
        type: "post",
        dataType: "json",
    });

}

function addVaccine(id){
    var data = {
        "bookingID": id,
    };
    $.ajax({
        url: "/vacbook/vaccine/addVaccine",
        data: data,
        type: "post",
        dataType: "json",
    });
}
