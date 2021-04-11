const container = document.querySelector('.card-con')
const keyword = document.querySelector('.keyword')
const region = document.querySelector('select');

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
                    // await getBor('../Country name/country-name.json',e.borders)
                    dummy += `<div class="card">
                    <img src="${e.flag}">
                    <div class="content">
                    <span class="name">${e.name}</span>
                    <span class="population"><span class="bold">Population : </span>${e.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                    <span class="region"><span class="bold">Region : </span>${e.region}</span>
                    <span class="borders"><span class="bold">Border : </span>${str}</span
                    <span class="capital"><span class="bold">Capital : </span>${e.capital}</span>
                    </div>
                    </div>`
    
                })
                 }else{
                     await getBor('../Country name/country-name.json',data.borders)
                     console.log(str)
                     console.log(data.borders)
                     dummy += `<div class="card">
                     <img src="${data.flag}">
                     <div class="content">
                     <span class="name">${data.name}</span>
                     <span class="population"><span class="bold">Population : </span>${data.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                     <span class="region"><span class="bold">Region : </span>${data.region}</span>
                     <span class="borders"><span class="bold">Border : ${str}</span></span>
                     <span class="capital"><span class="bold">Capital : </span>${data.capital}</span>
                     </div>
                     </div>`
                }


            container.innerHTML = dummy
        })
}

// getData(`https://restcountries.eu/rest/v2/alpha/idn`)
let str = ''
async function getBor(url,data){
    return fetch(url)
        .then(response => response.json())
        .then(response => {
 
            const arr = response.filter(item => data.includes(item.code))
            arr.map(e => str += `<span class="border">${e.name}</span>`)
            console.log(str)
        })
}