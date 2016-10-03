function save(e) {

    var element;
    var colorSettings = {};

    element = document.getElementById("saturday-background-color");
    if (element) {
        colorSettings['sat_bg'] = element.value;
    }
    element = document.getElementById("saturday-font-color");
    if (element) {
        colorSettings['sat_font'] = element.value;
    }
    element = document.getElementById("sunday-background-color");
    if (element) {
        colorSettings['sun_bg'] = element.value;
    }
    element = document.getElementById("sunday-font-color");
    if (element) {
        colorSettings['sun_font'] = element.value;
    }
    chrome.storage.local.set(colorSettings);

    window.close();
}

document.addEventListener('DOMContentLoaded', function () {
    
    var element = document.getElementById('save');
    element.addEventListener('click', save);
    
    chrome.storage.local.get(null, function(colorSettings) {
        if (document.getElementById("saturday-background-color")) {
            document.getElementById("saturday-background-color").value = colorSettings['sat_bg'];
        }
        if (document.getElementById("preview-sat-bg")) {
            document.getElementById("preview-sat-bg").style.backgroundColor = colorSettings['sat_bg'];
        }
        if (document.getElementById("saturday-font-color")) {
            document.getElementById("saturday-font-color").value = colorSettings['sat_font'];
        }
        if (document.getElementById("preview-sat-font")) {
            document.getElementById("preview-sat-font").style.backgroundColor = colorSettings['sat_font'];
        }
        if (document.getElementById("sunday-background-color")) {
            document.getElementById("sunday-background-color").value = colorSettings['sun_bg'];
        }
        if (document.getElementById("preview-sun-bg")) {
            document.getElementById("preview-sun-bg").style.backgroundColor = colorSettings['sun_bg'];
        }
        if (document.getElementById("sunday-font-color")) {
            document.getElementById("sunday-font-color").value = colorSettings['sun_font'];
        }
        if (document.getElementById("preview-sun-font")) {
            document.getElementById("preview-sun-font").style.backgroundColor = colorSettings['sun_font'];
        }
    });
});
