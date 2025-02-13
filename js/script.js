let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] }
];
//displaying pokemon names with heights with for loop
for (let i = 0; i < pokemonList.length; i++) {
    let output = "<p>" + pokemonList[i].name + " (height: " + pokemonList[i].height + ")";
    //finding special pokemon
    if(pokemonList[i].height<0.7){
        output += " - Aww! It's so cute";

    }
    output+="</p>"
document.write(output);
}
