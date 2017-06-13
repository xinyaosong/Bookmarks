
function handleClick(){
   const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
      const tab = tabs[0];
      chrome.tabs.sendMessage(tab.id, {tab:tab})
  })

}

document.addEventListener('DOMContentLoaded', function() {  
  document.querySelector('#save').addEventListener(  
      'click', handleClick);  
});  
