// backend 
// html lenguaje de hipertexto
// css paginas de estilo en cascada
// javascript estructura y la logica 
//IDE entorno de desarrollo integrado -visual studio code
//dreamweaver programa que permite diseñar y crear sitios web
//visual studio, muy completo
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
//Query-Consulta
let query=""
const pokemonList= document.getElementById("pokemonList")
const pokemonDetail=document.getElementById("pokemonDetail")
const backBTN=document.getElementById("backBTN")
const pokemonInfo= document.getElementById("pokemonInfo")


//Necesito hacer una peticion
//fetch es buscar
async function fetchPokemonData(pokemonID){
     //await es esperar
    const response= await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}/`)
    //Esto quiere decir espera a que se resuelva lo anterior y luego si hazme el proceso
    const pokemon= await response.json()
    return pokemon
}

//Para mostrar el nombre del pokemon
function displayPokemon(pokemon){
    const pokemonCard=document.createElement("div")
    pokemonCard.classList.add("pokemonCard")
    pokemonCard.innerHTML =`
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
    `
    pokemonCard.addEventListener ("click", ()=>showPokemonDetail(pokemon))
    pokemonList.appendChild(pokemonCard)
}


function showPokemonDetail (pokemon){
    console.log(pokemon)
    //
    pokemonList.style.display="none"
    pokemonDetail.style.display= "block"
    let abilities=" "
    for(let i=0; i<pokemon.abilities.length; i++){
        abilities= abilities+pokemon.abilities[i].ability.name+" "
    }

    let statsToPrint= ""
    pokemon.stats.forEach(stat => {
        console.log(stat.base_stat)
        // console.log(stat.stat.name)
        statsToPrint = statsToPrint + `<li>${stat.stat.name}: ${stat.base_stat}</li>`
    });

    let movesToPrint=""
    pokemon.moves.forEach(move => {
        movesToPrint = movesToPrint + `<li class="moves">${move.move.name}</li>`
    });
    //inerHTML siempre va a ir con una string
    pokemonInfo.innerHTML=`
    <h3>${pokemon.name}</h3>
    <img src=${pokemon.sprites.front_default} alt="${pokemon.name}">
    <h4>${abilities}</h4>
    <h4>stats </h4>
    <ul>
    ${statsToPrint}
    </ul>
    <h4>${movesToPrint}<h4>
    `
    // console.log(pokemonCard)
}
// console.log(pokemonCard)
    backBTN.addEventListener("click", ()=>{
        pokemonDetail.style.display="none"
        pokemonList.style.display= "block"
    })

    //Espacio busqueda
searchInput.addEventListener("input", (evento)=>{
        query = evento.target.value;
})

async function searchPokemon(){
     //gestion de errores, si el dato no se consulta puede que todo el flujo tenga un problema, parecido al if.. else,
     //O se cumple o se rechaza
    try {
        //fetchPokemonData busca en la pokeapi
const pokemon= await fetchPokemonData(query)  
        showPokemonDetail(pokemon)
    } catch (error) {
        alert("Pokemon no encontrado, intenta con otro ID o nombre")
}
}
//Busqueda
searchBtn.addEventListener("click", ()=>{
        console.log(query)
        searchPokemon()
})

    async function loadPokedex(){
        for(let i=1; i<51; i++){
            dato = await fetchPokemonData(i)
            // console.log(dato)
            displayPokemon(dato)
        } 
    }

loadPokedex()