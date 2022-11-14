"use strict";const characterList=document.querySelector(".js_character_list"),favoriteList=document.querySelector(".js-favorite-list"),searchBtn=document.querySelector(".js_btn"),searchInput=document.querySelector(".js_search"),searchStatus=document.querySelector(".js_status"),form=document.querySelector(".js_form"),resetBtn=document.querySelector(".js_reset_btn"),searchMessage=document.querySelector(".js_search_message");let allCharacters=[],favoritesCharacters=[];function handleClick(e){e.currentTarget.classList.toggle("selected");const r=allCharacters.find(r=>r.char_id===parseInt(e.currentTarget.id)),a=favoritesCharacters.findIndex(r=>r.char_id===parseInt(e.currentTarget.id));-1===a?favoritesCharacters.push(r):favoritesCharacters.splice(a,1),localStorage.setItem("favoriteCharacter",JSON.stringify(favoritesCharacters)),renderfavoriteCh()}function renderOneCharacter(e){let r="";const a=favoritesCharacters.findIndex(r=>r.char_id===parseInt(e.char_id));favoritesCharacters.find(r=>r.char_id===parseInt(e.char_id));return r=-1===a?"":"selected",`<li>\n      <article class="js_article ${r} card" id="${e.char_id}"> \n   \n      <span class="card__photobox">\n        <img class="card__img"\n          src="${e.img}"\n          alt="characterImage">\n          </span>\n          <div class ="text">\n            <h3 class="card__name">${e.name}</h3>\n            <h3 class="card__status">${e.status}</h3>\n          </div>\n      </article>\n      </li>`}function addCharacterListeners(){const e=document.querySelectorAll(".js_article");for(const r of e)r.addEventListener("click",handleClick)}function renderAllCharacters(e){let r="";for(const a of e)r+=renderOneCharacter(a);characterList.innerHTML=r,addCharacterListeners()}function renderfavoriteCh(){let e="";for(const r of favoritesCharacters)e+=renderOneCharacter(r);favoriteList.innerHTML=e}addCharacterListeners(),fetch("https://breakingbadapi.com/api/characters").then(e=>e.json()).then(e=>{allCharacters=e,renderAllCharacters(allCharacters)}),form.addEventListener("submit",e=>{e.preventDefault()}),searchBtn.addEventListener("click",()=>{const e=searchInput.value.toLowerCase(),r=searchStatus.value;if(e&&"All"!==r){const a=allCharacters.filter(r=>r.name.toLowerCase().includes(e)).filter(e=>e.status.includes(r));renderAllCharacters(a),console.log(a)}else if(e){renderAllCharacters(allCharacters.filter(r=>r.name.toLowerCase().includes(e))),searchMessage.innerHTML=""}else if(r){const e=allCharacters.filter(e=>"All"===r||e.status.includes(r));console.log(e),renderAllCharacters(e),searchMessage.innerHTML=""}});const savedFavorites=JSON.parse(localStorage.getItem("favoriteCharacter"));null!==savedFavorites&&(favoritesCharacters=savedFavorites,renderfavoriteCh()),resetBtn.addEventListener("click",e=>{e.preventDefault(),favoritesCharacters=[];favoriteList.innerHTML="",localStorage.removeItem("favoriteCharacter"),renderAllCharacters(allCharacters),searchInput.value=""});