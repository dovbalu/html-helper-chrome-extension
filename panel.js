// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*

var getFormData = function () {

    var data = {};
    var inputs = [].slice.call(document.getElementsByTagName('input'));
    inputs = inputs.concat([].slice.call(document.getElementsByTagName('textarea')));

    [].forEach.call(
      inputs,
      function(el){
          //console.log(el);
          data[el.name] = el.value;
      }
    )
    console.log(data)
    return data;

};




document.getElementById("executescript").addEventListener("click", function(e) {

    e.preventDefault();
    var formObj= JSON.stringify(getFormData()); //(getFormData($('form')).toString() );
    console.log("+++++", formObj);
//{"tags":"input,table,a","have":"0","entity":"attribute","entity-title":"id"}
    try{
        sendObjectToInspectedPage({action: "code", content: " var links = enumerateObjectsByCriteria('"+formObj+"', null) ; chrome.extension.sendMessage({content:links.toString()}, function(message){});"});
    }
    catch(e){
        alert(e);
        sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
        sendObjectToInspectedPage({action: "code", content: " var links = enumerateObjectsByCriteria('"+formObj+"', null) ; chrome.extension.sendMessage({content:links.toString()}, function(message){});"});

    }

}, false);



window.onload = function() {
    function goToSource(){
        chrome.devtools.inspectedWindow.eval('inspect($("a[href$=\'tab=wX\']"))');
    }




    [].forEach.call(
      document.querySelectorAll('.result-link'),
      function(el){
          el.addEventListener('click', function(e) {
              try{
                  chrome.devtools.inspectedWindow.eval('inspect($("[data-inspect$=\'tab=wX\']"))');
                  console.log("==== ", $('.result-link').toString())
                  document.querySelector('#results').innerHTML =  (document.querySelector('.result-link').toString());
              }
              catch(e){
                  alert(e);
              }

          });
      })
};