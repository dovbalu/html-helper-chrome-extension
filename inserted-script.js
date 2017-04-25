// This is included and executed in the inspected page
console.log("HTML helper extension is loaded");

var objectsFound =[];

function enumerateObjectsByCriteria(formObj, criteria){

    console.log("formObj ", formObj);
    if(!formObj || formObj.tags){
        return "No criteria for search was received"
    }

    formObj = JSON.parse(formObj);

    var inspectObjs = formObj["tags"].split(",");
    var inspectTags = formObj["tags"];
    var doesHave = (formObj["have"] === "1");
    var attributeToInspect = formObj["attr"];
    var attributeValue = formObj["attr-value"]
    var oCollection;
    var found = [];
    //reset page after prev. search
    for(var i= 0; i<objectsFound.length;i++){
        objectsFound[i].removeAttribute("inspect");
        objectsFound[i].style.removeProperty ("background-color");
    }

    var qSelector ="";
    for(var i =0; i< inspectObjs.length; i++){
        qSelector += inspectObjs[i];
        if(doesHave){
            if (attributeValue.trim().length >0){
                qSelector+="["+attributeToInspect+"~='"+attributeValue.trim()+"']";
            }
            else{
                qSelector+="["+attributeToInspect+"]";
            }

        }
        else{
            qSelector += ":not(["+attributeToInspect+"])"
        }
        if(inspectObjs[i+1]){
            qSelector+=",";
        }
    }

    oCollection = document.querySelectorAll(qSelector);
    if(oCollection.length <1){

        return "<h2  class='search-term no-results'>Your search term <i>'"+qSelector+"'</i> returned no results</h2>"
    }
    found.push(" <h2  class='search-term'>Search term:'"+qSelector+"'</h2>");
    var strPos, str, tagName = "";
    for(var i =0; i< oCollection.length; i++){
        if(oCollection[i].tagName!=tagName){
            found.push("<h3 class='tag-title'>"+oCollection[i].tagName.toUpperCase()+ " elements </h3>");
        }
        tagName = oCollection[i].tagName;
        strPos = oCollection[i].outerHTML.toString().indexOf(">")
        str = oCollection[i].outerHTML.toString();

        found.push("<a  href='#' ><xmp class='result-link'   data-inspect='inspect"+i+"' >"+str.substr(0, strPos+1).toLowerCase()+"...</"+oCollection[i].tagName.toLowerCase()+"></xmp></a>");
        oCollection[i].setAttribute("inspect","inspect"+i);
        oCollection[i].style.backgroundColor= 'yellow';
        objectsFound.push(oCollection[i]);
    }

    return  found.join(" ");
}

window.addEventListener("error", function (e) {
    if(e.error){
      alert("Error occured: " + e.error.message);
    }

    return false;
})

//console.log("found ", found)