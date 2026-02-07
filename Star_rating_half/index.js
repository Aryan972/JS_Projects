const stars = document.querySelectorAll(".rating i");
let selectedRating = -1;

//to print the rating
let ratingText = document.getElementById("ratingText");

//filling the stars
function fillStars(rating){

    for(let i = 0; i < stars.length; i++){
        //full stars
        if(rating >= i + 1){
            stars[i].classList.remove("bi-star", "bi-star-half");
            stars[i].classList.add("bi-star-fill");
        }
        //half stars
        else if(rating >= i + 0.5){
            stars[i].classList.remove("bi-star","bi-star-fill");
            stars[i].classList.add("bi-star-half");
        }

        //reseting the stars which got filled previously
        else{
            stars[i].classList.remove("bi-star-fill","bi-star-half");
            stars[i].classList.add("bi-star");
        }
    }
}

//clearing the stars
function clearStars(){
    for(let i = 0; i < stars.length; i++){
        stars[i].classList.remove("bi-star-half","bi-star-fill");
        stars[i].classList.add("bi-star");
    }
}

//mouse ratiing calculation -> in full stars we used to get idx so this func was not required
//event -> the mouse event that happened
//idx -> which star the mouse is currently over
function getRatingFromMouse(event, idx){
    const star = stars[idx];
    const rect = star.getBoundingClientRect(); //web api used to measure the area

    const mouseX = event.clientX;
    const midPoint = rect.left + rect.width / 2; //calculation

    //left half -> half star
    if(mouseX < midPoint){
        return idx + 0.5
    }
    else    return idx + 1;
}


//Hover and click logic
for(let i = 0 ; i < stars.length; i++){

    //hoverlogic
    stars[i].addEventListener("mousemove", function(event){
        const tempRating = getRatingFromMouse(event, i);
        fillStars(tempRating);
    });

    //click logic
    stars[i].addEventListener("click",function(event){
        selectedRating = getRatingFromMouse(event,i);
        fillStars(selectedRating);
        
        //Print rating
        ratingText.innerText = "You rated: " + selectedRating + " / 5";
    });
}

//mouse leave
let ratingContainer = document.querySelector(".rating");

ratingContainer.addEventListener("mouseleave", function(){
    if(selectedRating !== -1)   fillStars(selectedRating);
    else{
        clearStars();
        ratingText.innerText = "";
    }
})
