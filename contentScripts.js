chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    html2canvas(document.body, {
        onrendered: function(canvas) {
            const img = Canvas2Image.convertToPNG(canvas, 250,170);
            chrome.runtime.sendMessage({src: img.src,tab: request.tab});
        }
    })
})