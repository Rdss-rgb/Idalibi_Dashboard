    let cardTemplate = document.getElementById("user-card-tmpl");
    let cardContainer = document.getElementById("card-container");

    const apiUrl = `${baseurl}clientuser/?client_id=${clientID}`;
    fetch(apiUrl, {
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
       

                var searchUser = document.getElementById('default-search');
        
            searchUser .addEventListener('input', ()=> {
            var  b = document.querySelectorAll("[data-role='full-name']");
            var searchValue = searchUser .value.toLowerCase();

    
            if (searchValue !== "") {
                for (let j = 0; j <  b.length; j++) {
                    var elementId =  b[j].textContent.toLowerCase();
                    console.log(b[j].textContent, b[1].parentElement.parentElement.parentElement)
                    if (elementId.indexOf(searchValue) !== -1) {
                        b[j].parentElement.parentElement.parentElement.style.display = "block";
                    } else {
                        b[j].parentElement.parentElement.parentElement.style.display = "none";
                    }
                }
            } else {
                for (let ji = 1; ji < b.length; ji++) {
                    b[ji].parentElement.parentElement.parentElement.style.display = "block";
                }
            }
        });

            }
        });