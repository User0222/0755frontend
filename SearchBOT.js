// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Me
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let srchBTN = document.getElementById("search_icon");
let keywords=["10 самых популярных шрифтов от Google", "Взаимодействие PhP и MySQL" ,"отключение редакций и ревизий в wordpress", "Плагины VS Code"];
let keyword= keywords[getRandom(0, keywords.length)];
let nxtBTN=document.getElementsByClassName("sb_pagN")[0];
let srchInput=document.getElementsByName("q")[0];

if (srchBTN !== null){
  let i=0;
  let timerId=setInterval(function() {
    srchInput.value+=keyword[i];
    i++;
    if (i==keyword.length){
      clearInterval(timerId);
      setTimeout(function() {
        srchBTN.click();
      }, getRandom(1000, 3000));

    }
  },300);//вбивает текст по буквам с интервалом 0,3сек в поисковую строку

} else if (location.hostname=="napli.ru"){
  console.log("Я на целевом сайте! "+location.hostname);
  setTimeout(function() {
    let index=getRandom(0, links.length);
    if (getRandom(0, 100)>70) {
      location.href="https://www.bing.com/";
    }
    if (links[index].href.indexOf("napli.ru")!==-1){
      if (links[index].target == '_blank') links[index].removeAttribute('target');
      links[index].click();//кликать на ссылки только этого домена
    }
  }, getRandom(2000, 5000));
}
else {
  let nextPage=true;
  for (let i=0; i<links.length; i++){
    if (links[i].href.indexOf("napli.ru")!==-1){
      console.log("Нашёл нужную строку "+links[i]);
      let link=links[i];
      nextPage=false;
      setTimeout(function() {
        if (link.target == '_blank') link.removeAttribute('target');
        link.click();
      }, getRandom(3500, 4500));
      break;
    }
    //else {console.log("Не могу найти нужную строку!")}
  }
  if (document.querySelector(".sb_pagS").innerText=="4") {
    nextPage=false;
    location.href="https://www.bing.com/";
  }//дальше 4 страницы не искать и уходить на первую
  if (nextPage) {
    setTimeout(function() {
      nxtBTN.click();
    }, getRandom(4000, 5000));
  }
}
function getRandom(min, max) {
  return Math.floor(Math.random()*(max-min)+min)
}
