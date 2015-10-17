// alert("hello, this is content.js");
var all_deleted_videos = $("a:contains('Deleted Video')");

console.log("Starting Logs");
console.log(all_deleted_videos);

var song_url = "";
// console.log("0" + all_deleted_videos)
// console.log("1" + all_deleted_videos[0])
// console.log("2" + all_deleted_videos[0]["attributes"]);
// console.log("3" + all_deleted_videos[0].attributes);
// console.log("4" + all_deleted_videos[0].attributes["href"]);
// console.log("final-url " + getUrlVars("" + all_deleted_videos[0])["v"])

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
    $('tr').click(function(event) {
        var text = $(this).attr('data-title');
        var video_id = $(this).attr('data-video-id');

        if (text == '[Deleted Video]') {
        	console.log("video_id: " + video_id);
        	// alert(video_id);
        	chrome.runtime.sendMessage({"coded_message": video_id});
        	console.log('Done');


        	event.stopPropagation();
        	event.preventDefault();

        } else {
        	console.log("text" + text)
        	console.log('Sorry');
        }

    });
});