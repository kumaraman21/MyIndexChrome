
function updateBadge() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://query.yahooapis.com/v1/public/yql?q=select%20PercentChange%20from%20yahoo.finance.quotes%20where%20symbol%20in%20(%22%5EGSPC%22)&env=store://datatables.org/alltableswithkeys&format=json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            var percentChange = resp.query.results.quote.PercentChange;
            var percentChangeNumber = percentChange.substr(1, percentChange.length - 2);
            var badgeColor = percentChange.startsWith('-') ? [255, 0, 0, 255] : [0, 255, 0, 255];

            chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
            chrome.browserAction.setTitle({title: percentChange});
            chrome.browserAction.setBadgeText({text: percentChangeNumber});
        }
    }
    xhr.send();
}

chrome.browserAction.onClicked.addListener(updateBadge);