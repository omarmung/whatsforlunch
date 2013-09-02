// takes xml and parses each xml item into html


function parse_post(element) {
  // console.log(element);
  var post = new Object();
  post.title = $(element).find("title").text();
  // post.title = post.title.is_this_today() // wow... this is bad... going to sleep now
  post.url = "";
  post.description = $("<div/>").html($(element).find("description")).text();
  // post.description = post.description.toUpperCase();
  // post.description = post.description.replace(/ \- \$/g,"");
  // post.meals = post.description.split('</p>');
  post.description = post.description.replace(/<h4>\[/g, "<h3 class='hide'>");
  post.description = post.description.replace(/\]/g, "</h3><h5><span class='label btn-success'>FREE</span><span> </span>");
  // post.description = post.description.replace(/<h4>/g,"<h5><span class='label success'>Free</span><span> </span>");
  post.description = post.description.replace(/<\/h4>/g, "<\/h5>");
  // post.description = post.description.replace(/<p>/g,"<p class='hide'>"); // hiding on/off
  post.description = post.description.replace(/<h3 class=\'hide\'>breakfast/, "<h3 class='show'>breakfast");
  post.description = post.description.replace(/<h3 class=\'hide\'>\@birdfeeder/, "<h3 class='show'>@birdfeeder");
  post.description = post.description.replace(/<h3 class=\'hide\'>\#tenderloin/, "<h3 class='show'>#tenderloin");
  post.description = post.description.replace(/<h3 class=\'hide\'>\#comfort/, "<h3 class='show'>#comfort");
  post.description = post.description.replace(/<h3 class=\'hide\'>\#sandwich/, "<h3 class='show'>#sandwich");
  post.description = post.description.replace(/<h3 class=\'hide\'>\#salad/, "<h3 class='show'>#salad");
  post.description = post.description.replace(/<h3 class=\'hide\'>soup/, "<h3 class='show'>soup");
  post.description = post.description.replace(/<h3 class=\'hide\'>dinner/, "<h3 class='show'>dinner");
  post.description = post.description.replace(/<h3 class=\'hide\'>global tea time/, "<h3 class='show'>global tea time");
  post.description = post.description.replace(/<h3 class=\'hide\'>hack week snack/, "<h3 class='show'>hack week snack");
  post.description = post.description.replace(/<h3 class=\'hide\'>happy hour/, "<h3 class='show'>happy hour =|;{>");



/* post.meals = post.description.split(/\n/);
		for (var i = 0; i < post.meals.length; i++) {
		   post.meals = post.meals.push(post.meals.textContent[i]);
		}
	*/

  //console.log(post);
  return post;
}


// returns true if datetext is today, false if datetext !is today


function is_datetext_today(datetext) {
  if (datetext == "Fri, 30 Aug 2013") return true;
  
  // today = new Date(); set in popup.html declarations			
  someday = new Date(datetext); // testing "Mon, Jan 30 2012"
  today = new Date();

  if (someday.getDate() == today.getDate()) {
    // $('#popup').append(today + "<br> = <br>" + someday);
    return true; // someday.getDate() + "is Today: " + today.getDate();					
  } else {
    if (someday.getTime() > today.getTime()) {
      return true
    }

    // what we return when it's not today and not all these other things
    // $('#popup').append(today + "<br> != <br>" + someday);
    return false; // someday.getDate() + "is not Today: " + today.getDate();					
  }
}



function open_item(url) {
  chrome.tabs.create({
    url: url
  });
  chrome.browserAction.setBadgeText({
    text: ''
  });
}
