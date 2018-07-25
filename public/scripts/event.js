/* 
    Main client side javascript file that will handle XML requests regarding events page which will be dynamically loaded to provide the illusion of an application
    as opposed to a website. 
*/

const baseEventURL = "https://www.wdbears.me/event/";

function main(){

    console.log("loaded script");

    //handleEventAdd
    //handleEventDelete
    //handleEventGoing
    //handleEventNotGoing
}

function elementWithContent(tagType, text){
    
    let tag = document.createElement(tagType);
    tag.appendChild(document.createTextNode(text));
    return tag;
}

document.addEventListener("DOMContentLoaded", main);