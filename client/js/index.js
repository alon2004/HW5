window.onload = function () {
    addListeners();
    fetchWishes();
};

function fetchWishes() {
    fetch("https://hw5-nf8c.onrender.com/api/wishes", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        return response.json();
    }).then(data => {
        initList(data);
    }).catch(err => {
        console.log("Error fetching wishes: ", err);
        alert("Failed to fetch wishes. Please try again later.");
    });
}

function addListeners() {
    let form = document.getElementById("birthday_form");
    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        try {
            await submitWish();
            fetchWishes(); 
        } catch (err) {
            console.log("Error submitting wish: ", err);
            alert("Failed to submit wish. Please try again.");
        }
    });

    const updateSubmitBTN = document.getElementsByClassName("Edit_BTN_submit")[0];
    updateSubmitBTN.addEventListener("click", async function (event) {
        event.preventDefault();
        try {
            await updateWish(updateSubmitBTN.id);
            fetchWishes();
        } catch (err) {
            console.log("Error updating wish: ", err);
            alert("Failed to update wish. Please try again.");
        }
    });
}

function initList(data) {
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
        editBTN.classList.add("Edit_wish", "BTN");
        editBTN.id = data[i].id;
        editBTN.addEventListener("click", function () {
            replaceFormicon(editBTN.id);
        });

        let deleteBTN = document.createElement("button");
        deleteBTN.classList.add("Delete_wish", "BTN");
        deleteBTN.id = data[i].id;
        deleteBTN.addEventListener("click", async function (event) {
            event.preventDefault();
            if (checkIfEditMode()) {
                try {
                    await deleteWish(deleteBTN.id);
                    fetchWishes();
                } catch (err) {
                    console.log("Error deleting wish: ", err);
                    alert("Failed to delete wish. Please try again.");
                }
            }
        });

        let DeleteIcon = document.createElement("img");
        DeleteIcon.src = "./imges/delete.png";
        let EditIcon = document.createElement("img");
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
}

async function replaceFormicon(id) {
    let wisherName = document.getElementById("name");
    let wish = document.getElementById("wish");
    let submit = document.getElementsByClassName("submit_form")[0];
    let updateBTN = document.getElementsByClassName("Edit_BTN_submit")[0];
    submit.style.display = "none";
    updateBTN.style.display = "block";
    updateBTN.id = id;

    try {
        const response = await fetch(`https://hw5-nf8c.onrender.com/api/wishes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        wisherName.value = data[0].name;
        wish.value = data[0].wish;
    } catch (err) {
        console.log("Error fetching wish by ID: ", err);
        alert("Failed to load the wish details. Please try again.");
    }
}

async function submitWish() {
    let wisherName = document.getElementById("name");
    let wish = document.getElementById("wish");
    let wisher = { name: wisherName.value, wish: wish.value };

    try {
        const response = await fetch("https://hw5-nf8c.onrender.com/api/wishes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wisher)
        });
        const data = await response.json();
        console.log(data);
        wisherName.value = "";
        wish.value = "";
    } catch (err) {
        console.log("Error submitting wish: ", err);
        alert("Failed to submit wish. Please try again.");
    }
}

async function updateWish(id) {
    let wisherName = document.getElementById("name");
    let wish = document.getElementById("wish");
    let submit = document.getElementsByClassName("submit_form")[0];
    let updateBTN = document.getElementsByClassName("Edit_BTN_submit")[0];
    updateBTN.id = id;

    try {
        const response = await fetch(`https://hw5-nf8c.onrender.com/api/wishes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: wisherName.value, wish: wish.value })
        });
        const data = await response.json();
        console.log(data);
        wisherName.value = "";
        wish.value = "";
        submit.style.display = "block";
        updateBTN.style.display = "none";
    } catch (err) {
        console.log("Error updating wish: ", err);
        alert("Failed to update wish. Please try again.");
    }
}

async function deleteWish(id) {
    try {
        const response = await fetch(`https://hw5-nf8c.onrender.com/api/wishes/${id}`, {
            method: "DELETE"
        });
        const data = await response.json();
        console.log(data);
    } catch (err) {
        console.log("Error deleting wish: ", err);
        alert("Failed to delete wish. Please try again.");
    }
}

function checkIfEditMode() {
    const updateBTN = document.getElementsByClassName("Edit_BTN_submit")[0];
    if (updateBTN.style.display === "block") {
        alert("Can't delete in edit mode!");
        return false;
    }
    return true;
}

setInterval(changeImgaeRendomAPI, 10000);

function changeImgaeRendomAPI() {
    let img = document.getElementById("img_rendom");
    img.src = "https://picsum.photos/200/300?" + new Date().getTime();
}
