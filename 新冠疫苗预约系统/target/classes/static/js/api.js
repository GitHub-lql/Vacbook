function checkCovidCase() {
    console.log("前端外部接口")
    let lga = document.getElementById('locationId').value
    console.log(lga)
    var data = {
        resource_id: '21304414-1ff1-4243-a5d2-f52778048b29', // the resource id
        limit: 5, // get 5 results
        q: lga
    };
    $.ajax({
        url: 'https://data.nsw.gov.au/data/api/3/action/datastore_search',
        data: data,
        dataType: 'json',
        success: function (data) {
            layer.msg('Total cases: ' + data.result.total)
            console.log(data)
        }
    });
}

function getData(){
    console.log("加载后端外部 API 数据 1")
    $.ajax({
        url: "/api/getData",
        type: "get",
        dataType: "json",
        success: function(result){
            console.log(result)
            let data = result.data[0];
            display = document.getElementById('covid_data')
            let element =
                '<div>在当地获得的新病例: ' + data.LocalCases_24hrs + '</div>'+
                '<div>外地获得的新病例: ' + data.OverseasCases_24hrs + '</div>'+
                '<div>住院病例:' + data.concurrentHospitalisations + '</div>' +
                '<div>重症监护室的病例:' + data.concurrentHospitalisationsIcu + '</div>'
            display.innerHTML = element
        },
    });
}

function loginWithSession(user_id, user_name, option, option1){
    getData()
    sessionStorage.clear();
    if (user_name != null) {
        console.log("用户登录");
        console.log(user_id);
        console.log(user_name);
        sessionStorage.setItem('user_name', user_name);
        sessionStorage.setItem('user_id', user_id);

        console.log(option);
        let profileURL = 'href=/vacBook/user/profile'
        let profileURL1 = 'href=/vacBook/user/logout'
        console.log(profileURL)
        let element = "<a class=\"nav-link\" style=\"color: black\" " + profileURL + ">你好, " + user_name + "</a>";
        let element1 = "<a class=\"nav-link\" style=\"color: black\" " + profileURL1 + ">退出登录" + "</a>";
        option.innerHTML = element
        option1.innerHTML = element1
    }
}