var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");


var getRepoIssues = function(repo){//repo format --> username/reponame
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //if fetch request is successful
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data);

                //check if api has paginated issues --> will be true if more than 30 issues exist
                if(response.headers.get("Link")){
                    displayWarning(repo);
                }
            })
        }
        else{
            document.location.replace("./index.html");
        }
    })
}

var getRepoName = function(){
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];

    //if some value for repoName exists
    if(repoName){
        //give text to the span element in the header title in the html file
        repoNameEl.textContent = repoName;
        //create the issues with the username/reponame coming from the right side of the = to the right of the ? in the url
        getRepoIssues(repoName);
    }
    else{//go to main to try to get some value
        document.location.replace("./index.html");
    }

    
};

var displayIssues = function(issues){
    if(issues.length === 0){//notify user if repo searched has no issues
        issueContainerEl.textContent = "This repo has no open issues!";
        return
    }

    for(var i=0; i<issues.length; i++){//for all issues, create link containers and append to page's div
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

var displayWarning = function(repo){
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
}

getRepoName();