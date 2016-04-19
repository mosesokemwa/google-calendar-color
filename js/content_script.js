function getStartWday() {
    var weekView = false;
    if (window.location.href.startsWith("https://calendar.google.com")) {
        var buttonElements = document.getElementsByClassName("goog-imageless-button-checked");
        if (buttonElements.length > 0) {
            var contentElements = buttonElements[0].getElementsByClassName("goog-imageless-button-content");
            if (contentElements.length > 0) {
                if (contentElements[0].textContent === "Week") {
                    weekView = true;
                }
            }
        }
    }
    
    var weekday = null;
    if (weekView) {
        var elements = document.getElementsByClassName("wk-daylink");
        if (elements.length > 0) {
            weekday = elements[0].textContent;
        }
    } else {
        var elements = document.getElementsByClassName("mv-dayname");
        if (elements.length > 0) {
            weekday = elements[0].textContent;
        }
    }

    if (weekday.startsWith("Mon") || weekday === "月") {
        weekday = "Mon";
    } else if (weekday.startsWith("Sat") || weekday === "土") {
        weekday = "Sat";
    } else if (weekday.startsWith("Sun") || weekday === "日") {
        weekday = "Sun";
    }

    chrome.runtime.sendMessage(null, weekday);
}

getStartWday();
