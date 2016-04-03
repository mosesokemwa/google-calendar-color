var elements = document.getElementsByClassName("mv-dayname");
if (elements.length > 0) {
  chrome.runtime.sendMessage(elements[0].textContent);
}
