chrome.webNavigation.onCompleted.addListener(function(data) {
  if (typeof data) {
    if (data.url === "about:blank") {
			chrome.webNavigation.getFrame({tabId:data.tabId, processId:data.processId, frameId:0}, function(details) {
				if (details.url.indexOf("https://calendar.google.com") == 0 || details.url.indexOf("https://mail.google.com") == 0) {
					chrome.tabs.insertCSS(data.tabId, {allFrames:true, file:"gtasks.css", matchAboutBlank:true});
		      // chrome.tabs.insertCSS(data.tabId, {allFrames:true, frameId:data.frameId, file:"gtasks.css", matchAboutBlank: true});
				}
			});
    }
  }
});

chrome.runtime.onMessage.addListener(function(msg) {
  if (msg === "Mon") {
    chrome.tabs.insertCSS(null, {file: "monday.css"});
  } else if (msg === "Sun") {
    chrome.tabs.insertCSS(null, {file: "sunday.css"});
  } else if (msg === "Sat") {
    chrome.tabs.insertCSS(null, {file: "saturday.css"});
  }
});
