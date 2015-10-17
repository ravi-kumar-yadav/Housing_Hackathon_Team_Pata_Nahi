
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
	query_text = request.coded_message;

	var x = new XMLHttpRequest();
	//x.open ("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyBnBZQ4bOWeOTcLoynj66BaXHfTUX4Ne-A&cx=004655086086434446616:7d7yxke8mis&fields=items(title)&q=qQGlySayAXo" + query_text, false);
	x.open ("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyBnBZQ4bOWeOTcLoynj66BaXHfTUX4Ne-A&cx=004655086086434446616:7d7yxke8mis&fields=items(title)&q=india", false);
	x.send(null);
    hndlr(JSON.parse(x.responseText));
});



function hndlr(res) {
	 // {
	 // "items": [
	 //  {
	 //   "title": "India | World news | The Guardian"
	 //  }, ... 
	 // }


	var titles = res["items"];
	console.log("titles");
	console.log(titles);
	all_texts = [];

	for (var i = 0; i < titles.length; i++) {
	   	var res_text = titles[i]["title"];
	   	console.log(titles[i]);
	    all_texts.push(res_text);
	}

	

	console.log("all_texts");
	console.log(all_texts);
}