const h=document.querySelector(".js_cards-container"),u=document.querySelector(".js_favourites-container"),f=document.querySelector(".js_searchButton"),m=document.querySelector(".js_characterInput");let r=[],a=[];const _="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";function o(e){return e.imageUrl?`<article class="characters_card js_characters_card" data-id="${e._id}">
                        <div class="card_img_container">
                            <img class="card_img" src=${e.imageUrl} alt="">
                        </div>
                        <h2 class="card_text">${e.name}</h2>
                     </article>`:`<article class="characters_card js_characters_card" data-id="${e._id}">
                        <div class="card_img_container">
                            <img class="card_img" src=${_} alt="">
                        </div>
                        <h2 class="card_text">${e.name}</h2>
                     </article>`}function l(){let e="";for(const t of r)e+=o(t);h.innerHTML=e;const c=document.querySelectorAll(".js_characters_card");for(const t of c)t.addEventListener("click",g)}function d(){let e="";for(const c of a)e+=o(c);u.innerHTML=e}function g(e){const c=e.currentTarget;console.log(c),c.classList.toggle("favourite");const t=parseInt(c.dataset.id);console.log(t);const s=r.find(n=>n._id===t);console.log(s);const i=a.find(n=>n._id===t);i===void 0?(a.push(s),d()):(a.splice(i,1),d())}function v(e){e.preventDefault();const c=m.value;console.log(c),fetch(`//api.disneyapi.dev/character?name=${c}`).then(t=>t.json()).then(t=>{r=t.data,l()})}f.addEventListener("click",v);fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{r=e.data,l()});
//# sourceMappingURL=main.js.map
