var url = 'http://legacy.cafebonappetit.com/rss/menu/403';
var lunchRss = "lunchRss";
var lunchRssLastFetched = "lunchRssLastFetched";
var lunchInfo = [lunchRss, lunchRssLastFetched];

// Tell the background page to refetch now, 
// for use when the regularly-scheduled feed didn't work
// or network problems, etc.
function re_fetch() {
  ii = 0; // 0 is the first time through the loop, needed to clear the popup of any prior stuff
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      // set the RSS in local storage
      chrome.storage.local.set({
        lunchRss: xhr.responseText,
        lunchRssLastFetched: new Date()
      });
    }
  }
  
  // Note that any URL fetched here must be matched by a permission in
  // the manifest.json file!
  xhr.open('GET', url, true);
  xhr.send();
}


// Parse XML data passed back from the background page 
function display_stories(lunchStorageResult, refetch) {
  $xml = $(lunchStorageResult[lunchRss]);

  var items = $xml.find("item");

  //$('#popup').append("<hr><p>Is Today " + today + "</p><br> " + "<p>Someday? " + someday.getUTCDate() + "</p>"); // find_today());
  // var days = $xml.find("title");
  items.each(function(index, element) {

    // grab the title text from each item (this is where date is kept)
    today_title = is_datetext_today($(element).find("title").text());

    // ask if the title matches today's date
    if (today_title == true) {

      // $('#popup').append(today_title);
      // if (is_datetext_today( $(element).find("title").text() )
      var post = parse_post(element);
      var item = '';
      var class2 = '';

      if (index >= localStorage['unread_count']) {
        // // console.log('visited');
        item += '<div class="post read">';
      } else {
        item += '<div class="post">'
      }
      item += '<div id="' + post.id + '" class="item">\
							<h2 class="grey">' + post.title + '</h2>\
							<span class="description">' + post.description + '</span>\
						</div>\
					';
      item += '</div>';
      // <img src="' + post.img + '" width="107" height="60" />\  ;
      // onclick="open_item(\'' + post.url + '\');"
      //							<a href="' + post.url + '">\
      //
      // append data if not a refetch, if refetch, clear old data
      if (refetch == true) {
        // if this is a refetch
        // popup is already open so we need to:
        // clear the div the first time through
        // then append data the rest of the cycles
        // note: i was so tired when i did this
        if (ii == 0) {
          pinwheel = '<span class="label btn-primary">CURRENT</span>'
          pp = $('#popup').html(pinwheel);
          ii++
        }

        // replace data
        p = $('#popup').append(item);

      } else {
        // for regular fetch
        // popup is opening for the first time
        // append data
        p = $('#popup').append(item);
      }

    }
    if (today_title == "delorean") {
      $('#popup').append("<p>Error &#8734;: You Are A Muthafuckin' Time Traveller</p>");
    }
  });
}

function re_render_from_storage() {
  chrome.storage.local.get(lunchInfo, function(storageResult) {
    display_stories(storageResult, true);
  });
}

function open_item(url) {
  chrome.tabs.create({
    url: url
  });
  chrome.browserAction.setBadgeText({
    text: ''
  });
  window.close();
}

function addClickEvent(id, handler) {
  document.getElementById(id).addEventListener('click', handler);
}
function addLink(id, link) {
  addClickEvent(id, function() {
    open_item(link);
  });
}


function bindUiElementActions() {
  addLink("go_whatsforlunch_link", "http://go/whatsforlunch");
  addClickEvent("refetch_button", re_fetch);
  addLink("omarmung_link", "https://twitter.com/omarmung");
  addLink("clove_link", "https://twitter.com/clove");
  addLink("niels_link", "https://twitter.com/niels");
  addLink("bonappetit_link", "http://www.cafebonappetit.com/menu/your-cafe/twitter/cafes/details/403/weekly-menu");
}


chrome.storage.onChanged.addListener(function(changes) {
  re_render_from_storage();
});

// when popup.html finishes loading, render 
$(document).ready(function() {
  bindUiElementActions();
  re_render_from_storage();
  re_fetch();
});
