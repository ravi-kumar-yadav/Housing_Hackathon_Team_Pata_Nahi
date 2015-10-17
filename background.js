chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	console.log("In Background.js Listener");
    console.log(request);
	query_text = request.coded_message;

	var x = new XMLHttpRequest();
	//x.open ("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyBnBZQ4bOWeOTcLoynj66BaXHfTUX4Ne-A&cx=004655086086434446616:7d7yxke8mis&fields=items(title)&q=qQGlySayAXo" + query_text, false);
	x.open ("GET", "https://www.googleapis.com/customsearch/v1?key=AIzaSyC8QLYcVR2VjFhIwiADY7aDXPEN6h284ck&cx=012443875275557263734:ahw4azb9jc0&fields=items(title)&q=" + query_text, false);
	x.send(null);
    
    console.log("Sending result in background");
    sendResponse({"result": hndlr(JSON.parse(x.responseText))});
});


// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if (request.greeting == "hello")
//       sendResponse({
//         msg: "goodbye!"
//       });
//   });


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

	if (typeof titles != 'undefined')
	{
		for (var i = 0; i < titles.length; i++) 
		{
		   	var res_text = titles[i]["title"];
		   	console.log(titles[i]);
		    all_texts.push(res_text);
		}
	}

	console.log("returning results");
	return all_texts;
	// var button = document.getElementById('#click');
	// button.addEventListener('click',function(event){
	// 	console.log("button click");
	// 	document.querySelector('#body').innerHTML("hi this is some test");

	// });
	// console.log(document.querySelector('#body').innerHTML("hi this is some test"));

	// console.log("all_texts");
	// chrome.runtime.sendMessage({"result_message": all_texts});
	// console.log(all_texts);
}