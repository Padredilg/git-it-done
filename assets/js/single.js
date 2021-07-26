var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo){//repo format --> username/reponame
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //if fetch request is successful
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data);
            })
        }
        else{
            alert("There was a problem with your request!");
        }
    })
}

var displayIssues = function(issues){
    if(issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return
    }

    for(var i=0; i<issues.length; i++){
        //create link element for each issue
        var issueEl = document.createElement("a");//this will be our container as well as a link itself
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");//this makes link open new tab instead of replacing page

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        /*append to container*/
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");
        //check if issue is an actual issue or a pull request
        if(issues[i].pull_request){
            typeEl.textContent = "(Pull request)";
        }
        else{
            typeEl.textContent = "(Issue)";
        }

        /*append to container*/
        issueEl.appendChild(typeEl);

        /*append container to pages' div*/
        issueContainerEl.appendChild(issueEl);
    }
}

getRepoIssues("padredilg/code-quiz");