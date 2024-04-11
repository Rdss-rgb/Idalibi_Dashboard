
//CONSTANT
const baseurl = 'http://192.168.148.247:8080/admin-portal/api/d/';
const jwt = localStorage.getItem("access-jwt");

//Checks the theme mode
const body = document.querySelector('body');
var dm = localStorage.getItem("darkmode");
console.log('Theme mode:', dm)
if (dm == 'true') {
    body.classList.add('dark');
}
else {
    body.classList.remove('dark');
}

//For page Spinner
if(document.querySelector('#spinner')!=undefined){
    document.querySelector('#spinner').classList.remove('hidden')
    document.body.style.overflow="hidden"
    setTimeout(() => {
    document.querySelector('#spinner').classList.add('opacity-0')
    
    document.body.style.overflow="auto"
    setTimeout(() => {
        document.querySelector('#spinner').classList.add('hidden')
    
    }, 1000);
    }, 2000);
}


