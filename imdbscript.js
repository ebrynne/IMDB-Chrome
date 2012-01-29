function getScore(link) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", link.href, true);
    var res = "Unknown"
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var content = xhr.responseText
        var match = content.match(/"ratingValue">(\d.\d)<\/span>/);
        if (match != null){
        	res = match[1]
        }
       	link.innerHTML = link.innerHTML + " - <strong>" + res + "</strong>/10";
      }
    }
    xhr.send(null);
}

function addScores(){
	var links = document.querySelectorAll(".info strong a");
	for (var i  = 0; i < links.length; ++i) {
		score = getScore(links[i]);
	}
	setTimeout('document.addEventListener("DOMNodeInserted", nodeAddedHandler, false);', 1000);
}

function nodeAddedHandler(event){
	var target = event.target.innerHTML;
	target = target.trim(); 	
	var match = target.match("^<meta itemprop=\"numberofEpisodes\"");
	if(match != null){
		addScores();
	}
	//document.removeEventListener("DOMNodeInserted", nodeAddedHandler, false);	 
}

addScores()