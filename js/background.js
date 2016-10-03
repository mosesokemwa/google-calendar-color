chrome.webNavigation.onCompleted.addListener(function(data) {
  if (typeof data) {
    if (data.url === "about:blank") {
      chrome.webNavigation.getFrame({tabId:data.tabId, processId:data.processId, frameId:0}, function(details) {
        if (details.url.indexOf("https://calendar.google.com") == 0 || details.url.indexOf("https://mail.google.com") == 0) {
          applyColorSettingsToGTasksCalendar(data.tabId, data.frameId);
        }
      });
    }
  }
});

function storeDefaultColorSettings() {
    chrome.storage.local.clear();
    var defaultColorSettings = {
        firstDay: 'Auto',
        sat_bg:'#F0F3FC',
        sat_font:'#22F',
        sun_bg:'#FFF0EE',
        sun_font:'#E22'
    };
    chrome.storage.local.set(defaultColorSettings);
}

function doApplyColorSettingsToGTasksCalendar(tabId, frameId, colorSettings) {
    var code = "";
    code += ".J-JB-KA-JB.J-JB-KA-a6O-Zq:not(.J-JB-KA-Ku-Kk),";
    code += "table#_tbl .dp-cell.dp-weekend.dp-onmonth.dp-day-right,";
    code += "table#_tbl .dp-cell.dp-weekend-selected.dp-onmonth-selected.dp-day-right {";
    code += "color: " + colorSettings['sat_font'] + " !important;";
    code += "}";
    code += ".J-JB-KA-JB.J-JB-KA-a6O-Zj:not(.J-JB-KA-Ku-Kk),";
    code += "table#_tbl .dp-cell.dp-weekend.dp-onmonth.dp-day-left,";
    code += "table#_tbl .dp-cell.dp-weekend-selected.dp-onmonth-selected.dp-day-left {";
    code += "color: " + colorSettings['sun_font'] + " !important;";
    code += "}";

    if (tabId && frameId) {
        // TODO: Use 'frameId' once Chrome 51 is released
        chrome.tabs.insertCSS(tabId, {allFrames:true, code:code, matchAboutBlank:true});
        // chrome.tabs.insertCSS(tabId, {allFrames:true, frameId:frameId, code:code, matchAboutBlank:true});
    } else {
        chrome.tabs.insertCSS(null, {allFrames:true, code:code, matchAboutBlank:true});
    }
}

function doApplyColorSettingsToCalendar(tabId, colorSettings, startWday) {
    var indexForSaturday;
    var indexForSunday;
    if (startWday == "Mon") {
        indexForSaturday = 6;
        indexForSunday = 7;
    } else if (startWday == "Sat") {
        indexForSaturday = 1;
        indexForSunday = 2;
    } else if (startWday == "Sun") {
        indexForSaturday = 7;
        indexForSunday = 1;
    }
    var selectorsForSaturdayFont = "";
    selectorsForSaturdayFont += ".st-dtitle:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayFont += ".tg-weekend:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayFont += "#weekViewAllDayBgwk .st-bg:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayFont += ".dp-dayh:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayFont += ".dp-weekend.dp-onmonth:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayFont += ".dp-weekend-selected.dp-onmonth-selected:nth-child(" + indexForSaturday + ")";

    var selectorsForSundayFont = "";
    selectorsForSundayFont += ".st-dtitle:nth-child(" + indexForSunday + "),";
    selectorsForSundayFont += ".tg-weekend:nth-child(" + indexForSunday + "),";
    selectorsForSundayFont += "#weekViewAllDayBgwk .st-bg:nth-child(" + indexForSunday + "),";
    selectorsForSundayFont += ".dp-dayh:nth-child(" + indexForSunday + "),";
    selectorsForSundayFont += ".dp-weekend.dp-onmonth:nth-child(" + indexForSunday + "),";
    selectorsForSundayFont += ".dp-weekend-selected.dp-onmonth-selected:nth-child(" + indexForSunday + ")";

    var selectorsForSaturdayBackground = "";
    selectorsForSaturdayBackground += ".st-bg-table .st-bg:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayBackground += ".tg-weekend:nth-child(" + indexForSaturday + "),";
    selectorsForSaturdayBackground += "#weekViewAllDayBgwk .st-bg:nth-child(" + indexForSaturday + ")";

    var selectorsForSundayBackground = "";
    selectorsForSundayBackground += ".st-bg-table .st-bg:nth-child(" + indexForSunday + "),";
    selectorsForSundayBackground += ".tg-weekend:nth-child(" + indexForSunday + "),";
    selectorsForSundayBackground += "#weekViewAllDayBgwk .st-bg:nth-child(" + indexForSunday + ")";

    var code = "";
    code += selectorsForSaturdayFont + "{ color:" + colorSettings['sat_font'] + "}";
    code += selectorsForSundayFont + "{ color:" + colorSettings['sun_font'] + "}";
    code += selectorsForSaturdayBackground + "{ background-color:"  + colorSettings['sat_bg'] + "}";
    code += selectorsForSundayBackground + "{ background-color:"  + colorSettings['sun_bg'] + "}";
    chrome.tabs.insertCSS(tabId, {code:code});
}

function applyColorSettingsToGTasksCalendar(tabId, frameId) {
    chrome.storage.local.get(null, function(colorSettings) {
        doApplyColorSettingsToGTasksCalendar(tabId, frameId, colorSettings);
    });
}

function applyColorSettingsToCalendar(tabId, startWday) {
    chrome.storage.local.get(null, function(colorSettings) {
        doApplyColorSettingsToCalendar(tabId, colorSettings, startWday);
    });
}

chrome.runtime.onMessage.addListener(function(wday, sender) {
    applyColorSettingsToCalendar(sender.tab.id, wday);
});

storeDefaultColorSettings();
