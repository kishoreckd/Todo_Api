// Targetting all the html elements
let titleInput = document.querySelector("#title")
const closingelement = document.querySelector(".close")
const addingelement = document.querySelector(".add")

const overlay = document.querySelector(".overlay")

const divboxes = document.querySelector(".mainbox")
const description = document.querySelector(".decription")
const submit = document.querySelector(".submit")



// adding funtion for showing and removing loaders
/* ---------------------------------------------------------------------------------------- */
addingelement.addEventListener("click", () => {
    overlay.classList.add("overlay1")

})

closingelement.addEventListener('click', () => {
    overlay.classList.remove("overlay1")
    titleInput.value = ""
    description.value = ""
    submit.innerText = "Submit"

})
/* ---------------------------------------------------------------------------------------- */

/* When the submit button is clicked the input value is assigned to 
the local database by the POST Method*/
submit.addEventListener("click", () => {
    // console.log(submit.innerText);
    /*Checking if the input value is emt or not */
    if (titleInput.value.trim() !== "" && description.value.trim() !== "") {
        if (submit.innerText == "Submit") {

            fetch("http://localhost:3000/posts", {
                method: 'POST',
                body: JSON.stringify({
                    title: `${titleInput.value}`,
                    description: `${description.value}`

                }),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            titleInput.value = "";
            description.value = ""
            submit.innerText = "update"
        }
    }

    else {
        alert("Please enter the values")
        

    }


})

/* ---------------------------------------------------------------------------------------- */

/*The window refreshe and it fetches he local database with using the fetch */
window.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(json => {
            json.forEach(element => {
                let boxdiv = document.createElement("div")
                boxdiv.setAttribute("class", "data")


                let titlediv = document.createElement("div")
                let title = document.createElement("h3")
                title.innerText = `${element.title}`
                titlediv.appendChild(title)

                let line1 = document.createElement("div")
                line1.setAttribute("class", "line")

                let paradiv = document.createElement("div")
                paradiv.setAttribute("class", "paradiv")
                let descrip = document.createElement("article")
                descrip.setAttribute("class", "description")
                descrip.innerText = `${element.description}`
                paradiv.appendChild(descrip)
                let line2 = document.createElement("div")
                line2.setAttribute("class", "line")

                let footerdiv = document.createElement("div")
                footerdiv.setAttribute("class", "footer")

                let today = new Date();
                today = String(today.getMonth() + 1) + '/' + String(today.getDate()) + '/' + today.getFullYear();

                let datediv = document.createElement("div")

                let date = document.createElement("p")
                date.innerHTML = today

                datediv.appendChild(date)
                let icons = document.createElement("button")
                icons.setAttribute("class", "icons")
                icons.setAttribute("data-set", element.id)
                icons.innerHTML = `<i class="fa fa-ellipsis-v option more" data-set="${element.id}" aria-hidden="true"></i>`;

                let options = document.createElement("div")
                options.setAttribute("class", "opt")
                options.setAttribute("data-set", element.id)

                let editicon = document.createElement("div")
                editicon.setAttribute("data-set", element.id)
                editicon.setAttribute("class", "icondiv")
                editicon.innerHTML = `<i class="fas fa-edit edit"></i>  ${"Edit"}`


                let deleteicon = document.createElement("div")
                deleteicon.setAttribute("class", "icondiv")
                deleteicon.setAttribute("data-set", element.id)
                deleteicon.innerHTML = `<i class="fas fa-trash-alt trash"></i> ${"Delete"}`
                options.appendChild(deleteicon)
                options.appendChild(editicon)

                footerdiv.appendChild(datediv)
                footerdiv.appendChild(icons)
                boxdiv.appendChild(titlediv)
                boxdiv.appendChild(line1)
                boxdiv.appendChild(paradiv)
                boxdiv.appendChild(line2)
                boxdiv.appendChild(footerdiv)
                boxdiv.appendChild(options)
                divboxes.appendChild(boxdiv)


                /* The delete icon delete the values in DB with the usage of DELETE method
                by getting the id value*/
                deleteicon.addEventListener("click", (e) => {

                    let deleteid = e.target.dataset.set
                    fetch(`http://localhost:3000/posts/${deleteid}`, {
                        method: "DELETE",
                        headers: {
                            'Content-type': 'application/json',
                        }
                    })

                })
                /* The edit icon Gets the value in DB and show it on UI*/
                editicon.addEventListener("click", (e) => {
                    overlay.classList.add("overlay1")
                    submit.innerText = "Update"
                    let editId = e.target.dataset.set
                    console.log(editId);
                    fetch(`http://localhost:3000/posts/${editId}`)
                        .then(res => res.json())
                        .then(update => {
                            // console.log(update)
                            submit.setAttribute("data-set", update.id)
                            // console.log(submit);
                            titleInput.value = update.title
                            description.value = update.description
                        })
                })
                /* The submit button works if the innerText is assigned to Update
                the values in DB with the usage of PUT method
                by getting the id value*/
                submit.addEventListener("click", (e) => {
                    if (titleInput.value.trim() !== "" && description.value.trim() !== "") {
                        if (submit.innerText == "Update") {
                            let updateid = e.target.dataset.set
                            console.log(updateid)
                            fetch(`http://localhost:3000/posts/${updateid}`, {
    
                                method: "PUT",
    
                                body: JSON.stringify({
                                    "title": titleInput.value,
                                    "description": description.value
                                }),
                                headers: {
                                    'Content-type': 'application/json',
                                }
                            })
    
                            titleInput.value = "";
                            description.value = ""
                            submit.innerText = "Submit"
                        }
                    }
                   
                })

            })
        })
})

/* ---------------------------------------------------------------------------------------- */

window.addEventListener("click", (e) => {
    console.log(e.target)
    if (e.target.classList.contains("more") || e.target.classList.contains("icons")) {
        let opt = document.querySelectorAll(".opt")
        opt.forEach((element) => {
            if (element.dataset.set == e.target.dataset.set) {
                element.style.visibility = "visible"
            }
            else {
                element.style.visibility = "hidden"
            }
        })
    }
    else {
        let opt = document.querySelectorAll(".opt")
        opt.forEach((ele) => {
            ele.style.visibility = "hidden"

        })
    }
})