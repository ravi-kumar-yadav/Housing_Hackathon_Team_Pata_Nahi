// alert("hello, this is content.js");
var all_deleted_videos = $("a:contains('Deleted Video')");

console.log("Starting Logs");
console.log(all_deleted_videos);

var song_url = "";

console.log("Printing all urls");
for(i=0; i<all_deleted_videos.length; i++)
{
	console.log(getUrlVars("" + all_deleted_videos[i])["v"]);
}

console.log("Ending Logs");




// Read a page's GET URL variables and return them as an associative array.
function getUrlVars(complete_url)
{
    var vars = [], hash;
    var hashes = complete_url.slice(complete_url.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


$(document).ready(function() {
    $('.pl-video').on('click', function(event) {

      if($(event.target).hasClass('allow_new_tab'))
        return true;
      var $tr = $(this);
      var text = $(this).attr('data-title');
      window.request_cached = false;
      var video_id = $(this).attr('data-video-id');
      console.log("Video_ID:");
      console.log(text);

      if (text === '[Deleted Video]' || text === '[Private Video]') {
      	console.log("video_id: " + video_id);
      	// alert(video_id);
      	// chrome.runtime.sendMessage({"coded_message": video_id});
        if (window.request_cached)
          return false;
        chrome.runtime.sendMessage({
            "coded_message": video_id
          },
          function(response) {
            window.request_cached = true;
            console.log("In content response");
            console.log(response);
            html_text = "";
            for(i=0; i<3; i++)
            {
              html_text += "<div title='" + response.result[i] + "'>  <a class='allow_new_tab' href='https://www.google.co.in/#q="+ response.result[i].substr(0, 31) +"' target='_blank'>" + response.result[i].substr(0, 28) + " ...</a>" + "</div>"; 

            }

            console.log(html_text);
            $tr.find('.pl-video-added-by').html(html_text);
          });
        return false;

      }

    });
});


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log("In Content.js Listener");
  console.log(request);
  message = request.result_message;
  console.log(message);
});