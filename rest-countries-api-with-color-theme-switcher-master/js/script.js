const container = document.querySelector('.card-con')
const keyword = document.querySelector('.keyword')
const region = document.querySelector('select');
const modBtn = document.querySelector('nav .con')
const nav = document.querySelector('nav')

region.addEventListener('change', async function(){
    await getData(`https://restcountries.eu/rest/v2/region/${region.value}`)
})

const form = document.querySelector('form')
getData('https://restcountries.eu/rest/v2/all')

form.addEventListener('submit', async function(e){
    e.preventDefault();
    await getData(`https://restcountries.eu/rest/v2/name/${keyword.value}`)
})


function getData(url){
    
    return fetch(url)
        .then(response => response.json())
        .then(async data => {
            let dummy = '';
            if(Array.isArray(data)){
                data.map(async e => {
                    let langName = ''
                    let mataName = ''
                    await getBor('rest-countries-api-with-color-theme-switcher-master/Country name/country-name.json',e.borders)
                    e.languages.forEach((el,i) => i + 1 === e.languages.length ? langName += el.name : langName += `${el.name}, `)
                     e.currencies.forEach((el,i) => i + 1 === e.currencies.length ? mataName += el.name : mataName += `${el.name}, `)
                    container.insertAdjacentHTML('beforeend', `<div class="card">
                    <div class="card-val" onclick ="tes(this)">
                    <img src="${e.flag}">
                    <div class="content">
                    <span class="name">${e.name}</span>
                    <span class="population"><span class="bold">Population : </span>${e.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    <span class="region"><span class="bold">Region : </span>${e.region}</span>
                    <span class="capital"><span class="bold">Capital : </span>${e.capital}</span>
                    </div>
                    </div>
                    <div class="fixed">
                    <div class="container">
                    <button class="tutup" onclick=tutup(this)><div class="panah"></div>Back</button>
                    <div class="val">
                    <div class="center">
                    <img src="${e.flag}" alt="bendera" class="bendera" width=500>
                    </div>
                    <div class="center">
                    <div class="name">${e.name}</div>
                    <div class="fl">
                    <div class="kiri">
                    <span class="nativename"><span class="bold">Native Name : </span>${e.nativeName}</span>
                    <span class="population"><span class="bold">Population : </span>${e.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    <span class="region"><span class="bold">Region : </span>${e.region}</span>
                    <span class="subregion"><span class="bold">Subregion : </span>${e.subregion}</span>
                    <span class="capital"><span class="bold">Capital : </span>${e.capital}</span>
                    <span class="borders"><span class="bold">Border Countries : </span><div class="kon">${str}</span></div>
                    </div>
                    <div class="kanan">
                    <span class="topleveldomain"><span class="bold">Top Level Domain : </span>${e.topLevelDomain[0]}</span>
                    <span class="currencies"><span class="bold">Currencies : </span>${mataName}</span>
                    <span class="language"><span class="bold">Languages : </span>${langName}</span>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    </div>
                    `)
    
                })
                 }else{
                    let langName = ''
                    let mataName = ''
                     await getBor('rest-countries-api-with-color-theme-switcher-master/Country name/country-name.json',data.borders)
                     
                     data.languages.forEach((e,i) => i + 1 === data.languages.length ? langName += e.name : langName += `${e.name}, `)
                     data.currencies.forEach((e,i) => i + 1 === data.currencies.length ? mataName += e.name : mataName += `${e.name}, `)

                     console.log(str)
                     console.log(data.borders)
                     dummy += `<div class="card">
                     <div class="card-val" onclick="tes(this)">
                     <img src="${data.flag}">
                     <div class="content">
                     <span class="name">${data.name}</span>
                     <span class="population"><span class="bold">Population : </span>${data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                     <span class="region"><span class="bold">Region : </span>${data.region}</span>
                     <span class="capital"><span class="bold">Capital : </span>${data.capital}</span>
                     </div>
                     </div>
                     <div class="fixed">
                     <div class="container">
                     <button class="tutup" onclick=tutup(this)><div class="panah"></div>Back</button>
                     <div class="val">
                     <div class="center">
                     <img src="${data.flag}" alt="bendera" class="bendera" width=500>
                     </div>
                     <div class="center">
                     <div class="name">${data.name}</div>
                     <div class="fl">
                     <div class="kiri">
                     <span class="nativename"><span class="bold">Native Name : </span>${data.nativeName}</span>
                     <span class="population"><span class="bold">Population : </span>${data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                     <span class="region"><span class="bold">Region : </span>${data.region}</span>
                     <span class="subregion"><span class="bold">Subregion : </span>${data.subregion}</span>
                     <span class="capital"><span class="bold">Capital : </span>${data.capital}</span>
                     <span class="borders"><span class="bold">Border Countries : </span>${str}</span>
                     </div>
                     <div class="kanan">
                     <span class="topleveldomain"><span class="bold">Top Level Domain : </span>${data.topLevelDomain[0]}</span>
                     <span class="currencies"><span class="bold">Currencies : </span>${mataName}</span>
                     <span class="language"><span class="bold">Languages : </span>${langName}</span>
                     </div>
                     </div>
                     </div>
                     </div>
                     </div>
                     </div>
                     </div>`
                     console.log(data)
                }


            container.innerHTML = dummy
        })
}

getData(`https://restcountries.eu/rest/v2/alpha/idn`)
let str = ''
async function getBor(url,data){
    return fetch(url)
        .then(response => response.json())
        .then(response => {
            str = ''
            const arr = response.filter(item => data.includes(item.code))
            arr.map(e => str += `<span class="border">${e.name}</span>`)
            console.log(str)
        })
}

function tes(e){
    e.nextElementSibling.classList.add('tampil')
    // e.style.display = 'none'
}

function tutup(e){
    e.parentElement.parentElement.classList.remove('tampil')
}



document.addEventListener('click', function(e){
    if(e.target.classList.contains('border')){
        const name = e.target.textContent
        getData(`https://restcountries.eu/rest/v2/name/${name}`)
    }
})
// fetch('./Country name/country-name.json')
//     .then(response => console.log(response.json()))
//     .then(data => console.log(data))

modBtn.addEventListener('click', function(e){
    document.body.classList.toggle('darkMode')
    modBtn.classList.toggle('dark')
    nav.classList.toggle('gelap')
})