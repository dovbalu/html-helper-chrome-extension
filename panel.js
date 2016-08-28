// This one acts in the context of the panel in the Dev Tools
//
// Can use
// chrome.devtools.*
// chrome.extension.*


var getFormData = function () {
    /*var unindexed_array = form.serializeArray();
     var indexed_array = {};
     $.map(unindexed_array, function (n, i) {

     indexed_array[n['name']] = n['value'];
     });

     return indexed_array;*/
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
    }

}, false);

/*
 document.getElementById('insertscript').addEventListener('click', function(e) {
 sendObjectToInspectedPage({action: "script", content: "inserted-script.js"});
 e.preventDefault();
 }, false);
 */

/*
 document.querySelector('#insertmessagebutton').addEventListener('click', function() {

 sendObjectToInspectedPage({action: "code", content: "document.body.innerHTML='<button>Send message to DevTools</button>'"});
 sendObjectToInspectedPage({action: "script", content: "messageback-script.js"});
 }, false);
 */


window.onload = function() {
    function goToSource(){
        chrome.devtools.inspectedWindow.eval('inspect($("a[href$=\'tab=wX\']"))');
    }




    [].forEach.call(
      document.querySelectorAll('.result-link'),
      function(el){
          el.addEventListener('click', function(e) {
              try{
                  //var attr = e.target.getAttribute("data-link");
                  //var cmd= "inspect($('a[href$='"+attr+"']'))"
                  // var cmdStr = ("\"a[href=\'"+attr+"\']\"");
                  //   var cmd = 'inspect($('+cmdStr+'))';
                  // alert(cmd);
                  // document.querySelector('.results').innerHTML(cmd);
                  // sendObjectToInspectedPage({action: "code", content: "runInContentWindow()"});
                  console.log(" this ", e.target)
                  chrome.devtools.inspectedWindow.eval('inspect($("[data-inspect$=\'tab=wX\']"))');
                  //alert( $('.result-link'));
                  //goToSource()
                  console.log("==== ", $('.result-link').toString())
                  document.querySelector('#results').innerHTML =  (document.querySelector('.result-link').toString());
              }
              catch(e){
                  alert(e);
              }

          });
      })
};