const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const dropdown = document.getElementById("dropdown");
const suggestionList = document.getElementById("suggestionList");

//dummy data to render
const products = [
  "usb",
  "usb hub",
  "usb cable",
  "usb c adapter",
  "mobile",
  "mouse",
  "monitor",
  "macbook",
  "keyboard",
  "gaming laptop"
];


//to rest the timer
let debounceTimer = null;


//timer update
searchInput.addEventListener("input", function(){
    const query = searchInput.value.trim(); //trim extra spaces
    
    //cancel any pending timer
    clearTimeout(debounceTimer);

    //start the timer and store into variable
    debounceTimer = setTimeout(function () {
        performSearch(query);
    }, 500);
});



//search
function performSearch(query){

    //if nothing is typed, hide the suggestions dropdown
    if(query === ""){
        hideDropdown();
        return;
    }

    const results = [];

    //render the data from the list based on user query
    for(let i = 0 ; i < products.length ; i++){
        if(products[i].toLowerCase().includes(query.toLowerCase())){
            results.push(products[i]);
        }
    }

    renderSuggestions(results); //pass the results to render the suggestion
}



function renderSuggestions(items){
    suggestionList.innerHTML = ""; //clearing first so that we never update partially, always re-render

    if(items.length === 0){
        hideDropdown();
        return;
    }

    for(let i = 0 ; i < items.length ; i++){
        let li = document.createElement("li"); //create li for dropdown dynamically
        li.textContent = items[i];

        li.addEventListener("click", function(){
            searchInput.value = items[i];
            hideDropdown();
        });

        suggestionList.appendChild(li); //add in the list if matching
    }

    showDropdown();
}

function showDropdown(){
    dropdown.style.display = "block";
}

function hideDropdown(){
    dropdown.style.display = "none";
    suggestionList.innerHTML="";
}

//form submit on entering key
searchForm.addEventListener("submit", function(event){
    event.preventDefault(); //stop page reload

    hideDropdown();
    console.log("search submitted", searchInput.value);
})

//hiding dropdown on outside click
document.addEventListener("click", function(event){
    if(!searchForm.contains(event.target)){
        hideDropdown();
    }
})