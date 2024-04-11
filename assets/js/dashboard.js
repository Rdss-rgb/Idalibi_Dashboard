var clientID = JSON.parse(localStorage.getItem("client")).ID;


// Liscense usage 
(async ()=>{    
    const apiUrl = `${baseurl}clientuser/?$f=id__count&client_id=${clientID}`;
    fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
        .then(response=>response.json())
        .then(response=>{
            let license = `${response.result[0].id__count}/50`;
            document.querySelector("[data-role='license-usage']").innerText = license;
            let licensePercentage = Math.round((response.result[0].id__count/50.0)*100.0);
            document.querySelector("[data-role='license-usage-percentage']").innerText = licensePercentage;
        });
})();

// Apps 
(async ()=>{
    const apiUrl = `${baseurl}app/?$f=id__count&client_id=${clientID}`;
    fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
        .then(response=>response.json())
        .then(response=>{
            let apps = `${response.result[0].id__count}/10`;
            document.querySelector("[data-role='apps-count']").innerText = apps;
            let appsPercentage = Math.round((response.result[0].id__count/10.0)*100.0);
            document.querySelector("[data-role='apps-count-percentage']").innerText = appsPercentage;
        });
})();

// Successful & Failed login
(async ()=>{
    const apiUrl = `${baseurl}userlogin/?$f=id__count,valid&$groupby=valid&client_id=${clientID}`;
    fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
        .then(response=>response.json())
        .then(response=>{
            var successfulLogins = 0;
            var failedLogins = 0;
            for (i in response.result) {
                if (response.result[i].valid) {
                    successfulLogins = response.result[i].id__count;
                } else {
                    failedLogins = response.result[i].id__count;
                }
            }
            console.log("successfulLogins ", successfulLogins)
            console.log("failedLogins ", failedLogins)
            let totalLogins = successfulLogins + failedLogins;
            let successfulLoginsPercentage = (()=>{return (totalLogins==0) ? 0 : successfulLogins/totalLogins*100.0})();
            let failedLoginsPercentage = (()=>{return (totalLogins==0) ? 0 : failedLogins/totalLogins*100.0})();
            console.log("successfulLoginsPercentage ", successfulLoginsPercentage)
            console.log("failedLoginsPercentage ", failedLoginsPercentage)
            document.querySelector("[data-role='successful-logins']").innerText = successfulLogins;
            document.querySelector("[data-role='successful-logins-percentage']").innerText = parseInt(successfulLoginsPercentage);
            document.querySelector("[data-role='failed-logins']").innerText = failedLogins;
            document.querySelector("[data-role='failed-logins-percentage']").innerText = parseInt(failedLoginsPercentage);
            // let appsPercentage = Math.round((response.result[0].id__count/10.0)*100.0);
            // document.querySelector("[data-role='apps-count-percentage']").innerText = appsPercentage;
        });
})();

// Geo chart
(async ()=>{
    const apiUrl = `${baseurl}userlogin/?$f=id__count,country,valid&$groupby=country,valid&client_id=${clientID}`;
    fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
        .then(response=>response.json())
        .then(response=>{
            var mapDataMap = {};
            for (i in response.result) {
                if (mapDataMap[response.result[i].country]==undefined) {
                    mapDataMap[response.result[i].country] = [response.result[i].country, 0, 0];
                }
                if (response.result[i].valid) {
                    mapDataMap[response.result[i].country][1] = response.result[i].id__count;
                } else {
                    mapDataMap[response.result[i].country][2] = response.result[i].id__count;
                }
            }

            var mapData = []
            for (i in mapDataMap) {
                mapData.push(mapDataMap[i]);
            }
            handleSelectChange(document, mapData);
        });
})();

// Login stacked chart
(async ()=>{
    const apiUrl = `${baseurl}userlogin/?$f=id__count,valid,created_at__date&$groupby=created_at__date,valid&client_id=${clientID}&$order=created_at`;
    fetch(apiUrl, {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
        .then(response=>response.json())
        .then(response=>{
         console.log(response)
        });
})();






// ! DASHBOARD PART 





/* Sidebar - Side navigation menu on mobile/responsive mode */
function toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle("hidden");
    document.getElementById(collapseID).classList.toggle("bg-white");
    document.getElementById(collapseID).classList.toggle("py-3");
    document.getElementById(collapseID).classList.toggle("px-6");
}
/* Function for dropdowns */
function openDropdown(event, dropdownID) {
    let element = event.target;

    var popper = Popper.createPopper(element, document.getElementById(dropdownID), {
        placement: "bottom-end"
    });

    document.getElementById(dropdownID).classList.toggle("hidden");
    document.getElementById(dropdownID).classList.toggle("block");
}


const togglebtn = document.querySelectorAll('.toggledark');
const html1 = document.querySelector('.dark');
var dm=localStorage.getItem("darkmode");
console.log('Theme mode:',dm)
if(dm=='true'){
    body.classList.add('dark');
    togglebtn.forEach(element => {
        element.classList.add('fa-moon-o');
    });

}
else{
    body.classList.remove('dark');
    togglebtn.forEach(element => {
        element.classList.remove('fa-moon-o');
        element.classList.add('fa-sun-o');
    });

}


togglebtn.forEach(theme => {
    theme.addEventListener("click", function () {
        console.log(localStorage.getItem("darkmode"))
        theme.classList.toggle('fa-moon-o');
        body.classList.toggle('dark');
        if(localStorage.getItem("darkmode")==='true'){
        
        localStorage.setItem("darkmode", false);
          
        }
        else{
          localStorage.setItem("darkmode", true);
        }




    });
});
var drp = 1;
function openDropdownmobile(event, dropdownID) {

    if (drp == 1) {
        document.getElementById(dropdownID).classList.remove("hidden");
        document.getElementById(dropdownID).classList.add("block");
        body.style.overflow = 'hidden';
        drp = 0;
    }
    else {
        document.getElementById(dropdownID).classList.remove("block");
        document.getElementById(dropdownID).classList.add("hidden");
        body.style.overflow = 'auto';
        drp = 1;
    }

}
function exit(e) {
    var parentexit = e.parentNode;
    parentexit.classList.remove("block");
    parentexit.classList.add("hidden");
    drp = 1;


}

google.charts.load('current', {
    'packages': ['geochart'],
});

document.addEventListener("DOMContentLoaded", (event) => {
    console.log(event.target)
    // handleSelectChange(event);
});

var globalMapData = null;

function handleSelectChange(event, mapData) {

    var selectElement = event.target;
    var value = 0;

    if (selectElement != undefined) {
        value = selectElement.value;
    }

    if (mapData != undefined) {
        globalMapData = mapData;
    }
    

    console.log(value)

    google.charts.setOnLoadCallback(drawRegionsMap);


    function drawRegionsMap(mapx, mapy) {
        let mapDataAll = [];
        globalMapData.forEach(i=>{
            var rate = (i[1]-i[2])/(i[1]+i[2]);
            rate = (rate + 1) / 2.0;
            rate = rate * 100;
            mapDataAll.push([i[0], rate]);
        });
        mapDataAll.unshift(['Country', 'Success Rate'])

        var defaultm = google.visualization.arrayToDataTable(mapDataAll);

        let mapDataSucess = [];
        globalMapData.forEach(i=>{
            mapDataSucess.push([i[0], i[1]]);
        });
        mapDataSucess.unshift(['Country', 'Success'])
        var Successful = google.visualization.arrayToDataTable(mapDataSucess);


        let mapDataFailed = [];
        globalMapData.forEach(i=>{
            mapDataFailed.push([i[0], i[2]]);
        });
        mapDataFailed.unshift(['Country', 'Failed'])
        var Failed = google.visualization.arrayToDataTable(mapDataFailed);

        var Successfuloptions = {
            colors: ['#86efac', '#4ade80', '#22c55e', '#16a34a'],
            backgroundColor: { fill: 'transparent' }

        };

        var Failedoptions = {
            colors: ['#f72b2b', '#d51c1c', '#a20909', '#850000'],
            backgroundColor: { fill: 'transparent' }

        };
        var defoptions = {
            colorAxis: {
                minValue: 0,
                maxValue: 100,
                colors: ['#f72b2b', '#d51c1c', 'FFE733', '#22c55e', '#16a34a']
            },
            backgroundColor: { fill: 'transparent' }

        };

        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
        if (value == 1) {
            mapx = Successful;
            mapy = Successfuloptions;

        }
        else if (value == 2) {
            mapx = Failed;
            mapy = Failedoptions;
        }
        else {
            mapx = defaultm;
            mapy = defoptions;
        }
        chart.draw(mapx, mapy);
    }


}

function stackedChart(data) {
    let response = {"result":[{"created_at__date":"2024-04-05","id__count":3,"valid":1},{"created_at__date":"2024-04-06","id__count":9,"valid":0},{"created_at__date":"2024-04-06","id__count":16,"valid":1}],"status":"ok"}

    data = {}
    for (i in response.result) {
        if (data[response.result[i].created_at__date] == undefined) {
            data[response.result[i].created_at__date] = [response.result[i].created_at__date, 0, 0];
        }
        if (response.result[i].valid) {
            data[response.result[i].created_at__date][1] = response.result[i].id__count;
        } else {
            data[response.result[i].created_at__date][2] = response.result[i].id__count;
        }
    }
    let sucessData = [];
    let failedData = [];
    for (i in data) {
        sucessData.push({x: new Date(data[i][0]), y:data[i][1]});
        failedData.push({x: new Date(data[i][0]), y:data[i][2]});
    }

    console.log("sucessData ", sucessData)
    console.log("failedData ", failedData)


    Highcharts.chart('container', {
        chart: {
            type: 'area',
            backgroundColor: 'rgba(255, 255, 255, 0.0)'
        },
        title: {
            text: 'Login Activity',
            align: 'left'
        },
        yAxis: {
            title: {
                useHTML: true,
                text: ''
            },
        },
        xAxis: {
            type: 'datetime'
        },
        tooltip: {
            shared: true,
            headerFormat: '<span style="font-size:12px"><b>{point.key}</b></span><br>'
        },
        plotOptions: {
            series: {},
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [{
            name: 'Failed',
            color: '#dc2626',
            data: failedData
    
        }, {
            name: 'Successful',
            color: '#22c55e',
            data: sucessData
        }]
    });
}

stackedChart();


Highcharts.chart('containerpie', {
    chart: {
        type: 'pie',
        backgroundColor: 'rgba(255, 255, 255, 0.0)'
    },
    title: {
        text: '',
        align: 'left'
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
            'Area (square km): <b>{point.y}</b><br/>' +
            'Population density (people per square km): <b>{point.z}</b><br/>'
    },
    exporting: {
        enabled: false
    },
    series: [{
        minPointSize: 10,
        innerSize: '70%',
        zMin: 0,
        name: 'countries',
        borderRadius: 1,
        data: [{
            name: 'Spain',
            y: 505992,
            z: 92
        }, {
            name: 'France',
            y: 551695,
            z: 119
        }, {
            name: 'Poland',
            y: 312679,
            z: 121
        }, {
            name: 'Czech Republic',
            y: 78865,
            z: 136
        }, {
            name: 'Italy',
            y: 301336,
            z: 200
        }, {
            name: 'Switzerland',
            y: 41284,
            z: 213
        }, {
            name: 'Germany',
            y: 357114,
            z: 235
        }],
        colors: [
            '#4caefe',
            '#3dc3e8',
            '#2dd9db',
            '#1feeaf',
            '#0ff3a0',
            '#00e887',
            '#23e274'
        ]
    }]
});
function logout(){
    clearLoginUser();
    // window.location.replace("/index.html");
}

function clearLoginUser() {
    eraseCookie("access-jwt");
    eraseCookie("session");
    localStorage.removeItem("user");
    window.location.href = "/index.html";
}

function eraseCookie(name){
    document.cookie = name + '=; Max-Age=0'
}

var xs=document.getElementById('namez');
var myuser = JSON.parse(localStorage.getItem('user'));
var fullname= myuser.first_name+ ' '+myuser.last_name;
xs.innerHTML='<b>'+fullname+'</b>';

function getParams() {
    if (location.search.length == 0) {
        return {};
    }
    let paramArray = location.search.substring(1).split("&");
    let params = {}
    for (i in paramArray) {
        let parts = paramArray[i].split("=");
        if (parts.length < 2) {
            params[parts[0]] = "";
        } else {
            params[parts[0]] = parts[1];
        }
    }
    return params
}