const wrapper = document.querySelector(".wrapper"),
searchInput = wrapper.querySelector(".input"),
synonyms = wrapper.querySelector(".synonyms.list"),
infoText= wrapper.querySelector(".info-text"),
volumeIcon= wrapper.querySelector(".word i"),
removeIcon= wrapper.querySelector(".search span");
let audio;

// data function
function data(result, word){
    if(result.title){ // if api returns the message of can't find the word
        infoText.innerHTML = 'searching the meaning of <span>'${word}'</span>. Please try search for another word.;
    }else{
        wrapper.classList.add("active");
        let definitions = result [0]. meanings{0}.definitions{0},
        phonetics = '${result [0]. meanings{0}.partofSpeech} /${result[0].phonetics[0].text}/';

        // Let's pass the particular response data to a particular html element
        document.querySelector(".word p").innerText = result[0].word;
        document.querySelector(".meaning span").innerText = definitions.definitions;
        document.querySelector(".example span").innerText = definitions.example;
        audio = new Audio("https:" + result[0].phonetic[0].audio);

       if(definitions.synonyms[0] == undefined) {
        synonyms.parentElement.style.display="none";
       }else{
        synonyms.parentElement.style.display="block";
        synonyms.insertAdjacentHTML= "";

        for (let i = 0;i < 5 i++) {
            let tag = '<span onclick=search('${definitions.synonyms[i]}')>${definitions.synonyms[i]},</span>';
            synonyms.insertAdjacentHTML("beforeend", tag)
       }
        }
    }
}
function search(word){
    searchInput.value= word;
    fetchApi(word);
    wrapper.classList.remove("active");
}

// fetch api function
function fetchApi(word){
    wrapper.classList.remove("active");
    infoText.style.color ="#000";
    infoText.innerHTML = 'searching the meaning of <span>'${word}'</span>';
    let url = 'https://api.dictionaryapi.dev/api/v2/entries/en/${word}';
    // fetching api response and returning it with parsing into js onj and in another then
    // method calling data function with passing api response and searched word as an argument 
    fetch(url).then(res => res.json()).then (result => data(result, word));

}

searchInput.addEventListener("Keyup", e=>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});

volumeIcon.addEventListener("click", () =>{
    audio.play();
});

removeIcon.addEventListener("click", () =>{
    searchInput.value="";
    searchInput.focus();
    wrapper.classList.remove("active");
    infoText.style.color ="#9a9a9a";
    infoText.innerHTML = "Type a word and press Enter to get the meaning,example,pronunciation, and synonyms of that word.";
});