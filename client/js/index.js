window.onload = function() {
    addListeners();
};

function addListeners() {
    let submit = document.getElementsByClassName("submit_form")[0];
    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form from submitting the traditional way
        submitWish(); // Call the function to handle the wish submission
    });
    let deleteBTN = document.getElementsByClassName("Delete_wish");
    for (let i = 0; i < deleteBTN.length; i++) {
        deleteBTN[i].addEventListener("click", function(event) {
            event.preventDefault();
            deleteWish(event.target.id);
        });
    }
    let updateBTN = document.getElementsByClassName("Edit_wish");
    for (let i = 0; i < updateBTN.length; i++) {
        updateBTN[i].addEventListener("click", function(event) {
            event.preventDefault();
            updateWish(event.target.id);
        });
    }
}


function submitWish() {
    let wisherName = document.getElementById("name")
    let wish = document.getElementById("wish")
    let wisher = {
        name: wisherName.value,
        wish: wish.value
    };


    fetch("http://localhost:8080/api/wishes", { // Corrected path to /api/wishes
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(wisher)
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
    wisherName.value = "";
    wish.value = "";
}

function updateWish(id) {
    const getWish= fetch("http://localhost:8080/api/wishes/" + id, { // Corrected path to /api/wishes
        method: "GET"
    }).then(response => {
        return response.json();
    }).then(data => {
        let wisherName = document.getElementById("name")
        let wish = document.getElementById("wish")
        wisherName.value = data[0].name;
        wish.value = data[0].wish;
        let submit = document.getElementsByClassName("submit_form")[0];
        
        
    }).catch(err => {
        console.log(err);
    });

}

function deleteWish(id) {
    fetch("http://localhost:8080/api/wishes/" + id, { // Corrected path to /api/wishes
        method: "DELETE"
    }).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

setInterval(changeImgaeRendomAPI, 10000);

function changeImgaeRendomAPI() {
    let img = document.getElementById("img_rendom");
    img.src = "https://picsum.photos/200/300?" + new Date().getTime();
}