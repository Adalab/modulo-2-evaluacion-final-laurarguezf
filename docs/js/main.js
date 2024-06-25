const e=document.querySelector(".js_cards-container");let t=[];const r="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";function s(a){return a.imageUrl?`<article class="characters_card">
                        <div class="card_img_container">
                            <img class="card_img" src=${a.imageUrl} alt="">
                        </div>
                        <h2 class="card_text">${a.name}</h2>
                     </article>`:`<article class="characters_card">
                        <div class="card_img_container">
                            <img class="card_img" src=${r} alt="">
                        </div>
                        <h2 class="card_text">${a.name}</h2>
                     </article>`}function i(){let a="";for(const c of t)a+=s(c);e.innerHTML=a}fetch("//api.disneyapi.dev/character?pageSize=50").then(a=>a.json()).then(a=>{t=a.data,i()});
//# sourceMappingURL=main.js.map
