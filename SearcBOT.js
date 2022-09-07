// ==UserScript==
// @name         FoofelBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for search
// @author       Me
// @match        https://duckduckgo.com/*
// @icon         
// @grant        none
// ==/UserScript==

let links = document.links;
let srchBTN = document.getElementById("search_button_homepage");
let keywords=["10 самых популярных шрифтов от Google", "Взаимодействие PhP и MySQL", "отключение редакций и ревизий в wordpress"];
let keyword= keywords[getRandom(0, keywords.length)];


if (srchBTN !== null){
  document.getElementsByName("q")[0].value=keyword;
  srchBTN.click();
} else {

  for (let i=0; i<links.length; i++){
    if (links[i].href.indexOf("napli.ru")!==-1){
      console.log("Нашёл нужную строку "+links[i]);
      let link=links[i];
      link.click();
      break;
    }
    else {console.log("Не могу найти нужную строку!")}
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random()*(max-min)+min)
}
