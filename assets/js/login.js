const togglebtn = document.querySelectorAll('.toggledark');
const html1 = document.querySelector('.dark');
var dm=localStorage.getItem("darkmode");
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

async function submit(e){
  e.preventDefault();
  e.stopPropagation();
  var email=document.getElementById('email').value;
  var password=document.getElementById('password').value;

  // API endpoint for creating a new user
  const apiUrl = `${baseurl}auth/login/`;
  let formData = new FormData();
  formData.append('username',email)
  formData.append('password',password);
  

  fetch(apiUrl,{
    method: 'POST',
    body: formData,
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('New User Data:', response);

      if (response["status"] != "ok") {
        // TODO: handle known errors
        if (response["err_msg"]!="") {
          let loginError = document.getElementById("login-error");
          let loginErrorMessage = document.getElementById("login-error-message");

          loginErrorMessage.innerText = response["err_msg"];
          loginError.classList.remove("hidden");

          return;
        }
        throw new Error('API status was not ok. the status was: ('+response["status"]+') with an error message "'+response["err_msg"]+'"');
      }

      // Login was ok
      setLoginUser(response);
    })
    .catch(error => {
      console.error('Error3:', error);
    });
    // window.location.replace("/dashboard.html");
    return false;
}
if (document.getElementById("login-form") != undefined) {
  document.getElementById("login-form").addEventListener("submit", submit);
}

// document.getElementById("btn-submit").addEventListener("click", submit);










var sign_btn=document.getElementById('signupbtn')

function  submitpage(e) {
  e.preventDefault();
  e.stopPropagation();
  // document.getElementById("signup-form")
  var f_name=document.getElementById('f_name').value;
  var l_name=document.getElementById('L_name').value;
  var email=document.getElementById('email').value.toLowerCase();
  var pass=document.getElementById('password').value;

  // API endpoint for creating a new user
const apiUrl = `${baseurl}auth/signup/`;


  let formData = new FormData();
  // formData.append('username',email)
  // formData.append('first_name',f_name);
  // formData.append('last_name',l_name)
  // formData.append('email',email)
  // formData.append('password',pass)
  
  console.log(f_name);
  var signup_data ={
    username:email,
    first_name:f_name,
    last_name:l_name,
    email:email,
    password:pass
  }
  
  for (let i = 0; i < Object.keys(signup_data).length; i++) {
    formData.append(Object.keys(signup_data)[i], Object.values(signup_data)[i]);
  }
  console.log(formData);

  // Make a POST request using the Fetch API
  fetch(apiUrl,{
    method: 'POST',
    body: formData,
  })
    .then(response => {
      return response.json();
    })
    .then(response => {
      console.log('New User Data:', response);

      if (response["status"] != "ok") {
        // TODO: handle known errors
        if (response["err_msg"]=="username taken") {
          let email = document.getElementById("email");
          let emailLabel = document.getElementById("email-label");
          let emailError = document.getElementById("email-error");

          emailLabel.classList.add("font-medium", "text-red-700" ,"focus:text-red-700" , "dark:text-red-500");
          emailError.innerText = "This email is already associated with another user";
          emailError.classList.remove("invisible");
          email.classList.remove("dark:text-white");
          emailLabel.classList.remove("dark:text-white");
          email.classList.add("border-red-500", "text-red-700", "focus:border-red-500" ,"focus:text-black","dark:focus:text-white", );
        
          return;
        }
        throw new Error('API status was not ok. the status was: ('+response["status"]+') with an error message "'+response["err_msg"]+'"');
      }

      // Login was ok
      setLoginUser(response);
    })
    .catch(error => {
      console.error('Error for signup:', error);
    });
    return false;
}
if (document.getElementById("signup-form") != undefined) {
  document.getElementById("signup-form").addEventListener("submit", submitpage);
}

function setLoginUser(user) {
  document.cookie = "access-jwt="+user["jwt"]+";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Strict";
  document.cookie = "session="+user["session"]+";expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=Strict";
  localStorage.setItem("session", user["session"]);
  localStorage.setItem("access-jwt", user["jwt"]);
  localStorage.setItem("user", JSON.stringify(user.user));
  localStorage.setItem("client", JSON.stringify(user.client));
  window.location = "/dashboard.html";
}

function clearLoginUser() {
  eraseCookie("access-jwt");
  eraseCookie("session");
  localStorage.removeItem("user");
  window.location = "/index.html";
}

function eraseCookie(name){
  document.cookie = name + '=; Max-Age=0'
}



function idalibi(){
  window.location = "https://delicate-raindrop-e37c7c.netlify.app/";
}