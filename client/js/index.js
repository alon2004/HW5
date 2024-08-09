window.onload = function() {
    addListeners();
    //fetch data from server and use init list function
    fetch("http://localhost:8080/api/wishes", { // Corrected path to /api/wishes
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        initList(data);
    }).catch(err => {
        console.log(err);
    });
    
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

function initList(data){
    let list = document.getElementById("wishes_list");
    list.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let wish = document.createElement("li");
        let wisher = document.createElement("div");
        wisher.className = "The_wish";
        let wisherName = document.createElement("span");
        let BTNsection = document.createElement("section");
        BTNsection.id = "iconsBTN";
        let editBTN = document.createElement("button");
        editBTN.classList.add("Edit_wish");
        editBTN.classList.add("BTN");
        editBTN.id = data[i].id;
        let deleteBTN = document.createElement("button");
        deleteBTN.classList.add("Delete_wish");
        deleteBTN.classList.add("BTN");
        deleteBTN.id = data[i].id;
        DeleteIcon = document.createElement("img");
        DeleteIcon.src = "./imges/delete.png";
        EditIcon = document.createElement("img");
        EditIcon.src = "./imges/icons8-edit-30.png";
        editBTN.appendChild(EditIcon);
        deleteBTN.appendChild(DeleteIcon);
        BTNsection.appendChild(editBTN);
        BTNsection.appendChild(deleteBTN);
        wisherName.innerText = data[i].name;
        wisher.appendChild(wisherName);
        wisher.appendChild(BTNsection);
        wish.appendChild(wisher);
        list.appendChild(wish);
    }
    console.log(list);

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