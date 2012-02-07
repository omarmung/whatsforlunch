// takes xml and parses each xml item into html
function parse_post(element) {
	// console.log(element);
	var post = new Object();
	post.title = $(element).find("title").text();
	// post.title = post.title.is_this_today() // wow... this is bad... going to sleep now
	post.url = "";
	post.description = $("<div/>").html($(element).find("description")).text();
	// post.description = post.description.toUpperCase();
	post.description = post.description.replace(/ \- \$/g,"");
	post.description = post.description.replace(/<h4>/g,"<h5><span class='label success'>Free</span><span> </span>");
	post.description = post.description.replace(/<\/h4>/g,"<\/h5>");
	//console.log(post);
	return post;
}


// returns true if datetext is today, false if datetext !is today
function is_datetext_today(datetext)
{
 // today = new Date(); set in popup.html declarations			
	someday = new Date(datetext);  // testing "Mon, Jan 30 2012"
	today = new Date(); 
	
	if (someday.getDate() == today.getDate())
	{
		// $('#popup').append(today + "<br> = <br>" + someday);
		return true; // someday.getDate() + "is Today: " + today.getDate();					
	}
	else
	{
		if (someday.getTime() > today.getTime())
		{return true}
		
		// what we return when it's not today and not all these other things
		// $('#popup').append(today + "<br> != <br>" + someday);
		return false; // someday.getDate() + "is not Today: " + today.getDate();					
	}
}



function open_item(url) {
	chrome.tabs.create({url: url});
	chrome.browserAction.setBadgeText({text:''});
}


// bullshit
function bullshitnoconflict()
{
	var today = $(element).find("title").text("");
}


// bullshit i wrote before i went to sleep
function is_this_todaynoconflict(txtdate)
{
		// set the badge background	
		chrome.browserAction.setBadgeBackgroundColor({color:[0, 50, 0, 50]});		
		return true;
	  }
