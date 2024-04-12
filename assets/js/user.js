    var clientID = JSON.parse(localStorage.getItem("client")).ID;
    let cardTemplate = document.getElementById("user-card-tmpl");
    let cardContainer = document.getElementById("card-container");
    var apiUrl = `${baseurl}clientuser/?client_id=${clientID}`;
    var tempCard;
function api(url){
   
    fetch(url, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access-jwt")
        }
    })
        .then(response => response.json())
        .then(response => {
            console.log(response["result"]);
            for (i in response["result"]) {
                console.log(response["result"][i].Roles)
                let clientuser = response["result"][i];
                let tempCard = cardTemplate.cloneNode(true);
                tempCard.id = "clientuser-" + clientuser["ID"];
                tempCard.classList.remove("hidden");
                tempCard.querySelector("[data-role='full-name']").innerText = clientuser["FirstName"] + " " + clientuser["LastName"];
                if (!clientuser["Active"]) {
                    tempCard.querySelector("[data-role='active']").classList.remove("dark:bg-lime-400", "dark:text-lime-900", "dark:animate-pulse")
                    tempCard.querySelector("[data-role='active']").classList.add("dark:bg-red-400", "dark:text-red-900")
                    tempCard.querySelector("[data-role='card-main-content']").classList.add("opacity-40")
                }
                tempCard.querySelector("[data-role='department']").innerText = clientuser["Department"];
                tempCard.querySelector("[data-role='job-title']").innerText = clientuser["JobTitle"];

                let roles = clientuser["Roles"].split(",");
                let rolesContainer = tempCard.querySelector("[data-role='roles']")
                for (j in roles) {
                    let tempRole = tempCard.querySelector("[data-role='role']").cloneNode(true);
                    tempRole.innerText = roles[j];
                    tempRole.classList.remove("hidden");
                    rolesContainer.appendChild(tempRole);
                }
                if (clientuser["LastLogin"] != null) {
                    tempCard.querySelector("[data-role='last-login']").classList.remove("invisible");
                    let lastLogin = moment(clientuser["LastLogin"]);
                    tempCard.querySelector("[data-role='last-login-time']").innerText = lastLogin.fromNow();
                    tempCard.querySelector("[data-role='last-login-location']").innerText = clientuser["LastLoginLocation"];

                    if (!clientuser["LastLoginResult"]) {
                        tempCard.querySelector("[data-role='last-login']").classList.remove("dark:text-lime-500");
                        tempCard.querySelector("[data-role='last-login']").classList.add("dark:text-red-500");
                    }
                }

                cardContainer.appendChild(tempCard);
     

            }
        });
}
api(apiUrl)





        

          
            var search_data =  document.getElementById("default-search"); 

            search_data.addEventListener('input', ()=> {
       
            
                
                
                cardContainer.innerHTML="";
            var searchValue = search_data.value;
            console.log(searchValue)
    
            if (searchValue !== "") {
                document.querySelector('#spinner').classList.remove('hidden')
                document.querySelector('#spinner').classList.remove('opacity-0')
                document.body.style.overflow="hidden"
                setTimeout(() => {
                    document.querySelector('#spinner').classList.add('opacity-0')
                
                document.body.style.overflow="auto"
                setTimeout(() => {

                    document.querySelector('#spinner').classList.add('hidden')                
                }, 200);
                }, 500);
                api(`${baseurl}clientuser/?client_id=${clientID}&$q=${searchValue}`)
            }
            else{
                api(apiUrl)
            }
        });
        console.log(apiUrl)