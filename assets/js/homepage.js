var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event) {
    event.preventDefault();
    // console.log(event);

    var username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value = "";
    }
    else{
        alert("Please enter a Github username");
    }
}

var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {//the then pretty much takes info, THEN, function with info fecthed
            //if request was successful
            if(response.ok){
                response.json().then(function(data) {//apiUrl became response, got turned into json, THEN, 
                    displayRepos(data, user);
                    //became data passed to displayRepos(), along with user received from calling function;
                });
            }
            //if request was not successful
            else{
                alert("Error: Github User Not Found");
            }

        })//end bracket of then method
        .catch(function(error){
            //Catch() is chained to then()
            alert("Unable to connect to GitHub");
        })
        
};

var displayRepos = function(repos, searchTerm){
    //clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    for(var i=0; i<repos.length; i++){//looping through all repos that a give user has
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append span to container, 
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append second span to container
        repoEl.appendChild(statusEl);

        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }

    console.log(repos);
    console.log(searchTerm);
}

userFormEl.addEventListener("submit", formSubmitHandler);