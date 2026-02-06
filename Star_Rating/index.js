const stars = document.querySelectorAll(".rating i");
console.log(stars);

//to print the rating
const ratingText = document.getElementById("ratingText");

let selectedIdx = -1;

function fillStars(idx){

    for(let i = 0 ; i < stars.length; i++){
        if(i <= idx){
            stars[i].classList.remove("bi-star");
            stars[i].classList.add("bi-star-fill");
        }
        else{
            stars[i].classList.remove("bi-star-fill");
            stars[i].classList.add("bi-star");

        }
    }
}

function clearStars(){

    for(let i = 0 ; i < stars.length ; i++){
        stars[i].classList.remove("bi-star-fill");
        stars[i].classList.add("bi-star");
    }
}

//hover logic & click logic
for(let i = 0 ; i < stars.length ; i++){

    //hover -> preview rating
    //addign handler for every star, now whichever idx user will hover, that handler will be revoked
    stars[i].addEventListener("mouseover", function(){
        fillStars(i);
    });

    //click -> add handler for each, save idx of user clicked
    stars[i].addEventListener("click", function(){
        selectedIdx = i;
        ratingText.innerText = "You rated: "+(selectedIdx + 1) +" / 5";
        fillStars(i);
    });
}

//mouse leave logic -> will need to fetch the idx at which mouse leaves to invoke the handler
const ratingContainer = document.querySelector(".rating");

ratingContainer.addEventListener("mouseleave", function(){
    if(selectedIdx != -1)   fillStars(selectedIdx);
    else clearStars();
});