// This creates and maintains the communication channel between
// the inspectedPage and the dev tools panel.
//
// In this messages are JSON objects
// {
//   action: ['code'|'script'|'message'], // What action to perform on the inspected page
//   content: [String|Path to script|Object], // data to be passed through
//   tabId: [Automatically added]
// }

(function createChannel() {
    //Create a port with background page for continous message communication
    var port = chrome.extension.connect({
        name: "FlexUI HTML Helper" //Given a Name
    });

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
        document.querySelector('#results').innerHTML ="";
        document.querySelector('#results').innerHTML = message.content;

  [].forEach.call(
            document.querySelectorAll('.result-link'),
            function(el){

                el.addEventListener('click', function(e) {
                    var inspectionPoint = e.target.getAttribute("data-inspect");
                    //chrome.devtools.inspectedWindow.eval('inspect($("[inspect$=\'tab=wX\']"))');
                    chrome.devtools.inspectedWindow.eval(' inspect(document.querySelector("[inspect=\''+inspectionPoint+'\']")) ');
                    e.preventDefault();
                });
            }
        );     /* */

    });

}());

// This sends an object to the background page 
// where it can be relayed to the inspected page
function sendObjectToInspectedPage(message) {
    message.tabId = chrome.devtools.inspectedWindow.tabId;
    try{
        chrome.extension.sendMessage(message);
    }
    catch(e){
        alert(e)
    }
}