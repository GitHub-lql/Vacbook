/**
 * js for the adminVaccineModel
 */


$(document).on("click", ".editModal", function () {
    var myVaccineId = $(this).data('id');
    $(".modal-body #stock").val( myVaccineId );

});

function showAmount(amount, vaccineId) {
    console.log(vaccineId);
    console.log(amount);
    document.getElementById('stock').value = amount;
    document.getElementById('update_id').value = vaccineId;
}

function getDelete(vaccineId) {
    console.log(vaccineId);
    document.getElementById('delete_id').value = vaccineId;
}


function vaccine_del(delete_id) {
    layer.confirm('您确定要删除库存中的此疫苗吗？', {
        btn: ["Confirm", "Cancel"],
        icon: 2,
        title: "删除疫苗警告！"
    }, function () {
        //点击确后关闭提示框
        layer.closeAll('dialog');
        vaccineDel(delete_id);
    });
}

function vaccineDel(delete_id) {
    //调ajax
    var data = {
        "delete_id": delete_id,
    }
    var msg = data.msg;
    $.ajax({
        url: "/vacbook/admin/vaccines/delete/",
        data: data,
        type: "post",
        success:function (data){
            $("#id_vac_container").html(data);
            layer.msg('疫苗已被删除！')
        },
        error:function (){
            layer.msg('对不起，您现在无法删除此疫苗！<br> 因为这种疫苗已经被预订！')
        }

    });

}

function vaccine_add() {
    layer.prompt({btn: ["Confirm", "Cancel"],title: '请输入新的疫苗类型', formType: 3}, function (type, index) {

        layer.close(index);
        layer.prompt({btn: ["Confirm", "Cancel"],title: '请输入新疫苗名称', formType: 3}, function (vaccineName, index) {
            layer.close(index);
            layer.prompt({btn: ["Confirm", "Cancel"],title: '请输入新疫苗库存', formType: 3}, function (stock, index) {
                const re = /^[0-9]+$/;
                if(!(re.test(stock))){
                    layer.close(index);
                    layer.msg('请输入0或正整数！');
                }
                else {layer.close(index);
                    layer.msg('添加成功' + '<br>新型疫苗：' + type + '<br>新疫苗名称：' + vaccineName + '<br>新疫苗库存：' + stock);

                    var data = {
                        // name, String type, Integer amount
                        "type": type,
                        "name": vaccineName,
                        "amount": stock,
                    }


                    $.ajax({
                        url: "/vacbook/admin/vaccines/add",
                        data: data,
                        type: "post",
                        success:function (data){
                            $("#id_vac_container").html(data); //
                        }

                    });}



            });
        });

    });


}

function vaccine_update(vaccine_amount,update_id) {
    console.log('dd') //test
    //Integer stock, Integer update_id
    layer.prompt({value:vaccine_amount,btn: ["Confirm", "Cancel"],title: '请输入新的疫苗库存', formType: 3}, function (stock, index) {
        const re = /^[0-9]+$/;
        if(!(re.test(stock))){
            layer.close(index);
            layer.msg('请输入0或正整数！');
        }
        else{
            layer.close(index);
            layer.msg('更新成功' + '<br>新疫苗库存：' + stock);
            var data = {
                // name, String type, Integer amount
                "update_id": update_id,
                "stock": stock,
            }
            $.ajax({
                url: "/vacbook/admin/vaccines/update",
                data: data,
                type: "POST",
                success:function (data){
                    $("#id_vac_container").html(data);//
                }
            });
        }




    });

}

