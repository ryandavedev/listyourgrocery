let groceries = []

const addItems = document.getElementById("addtolist")

const text = document.getElementById("text")
const list = document.getElementById("grocerylist")
const rstBtn = document.getElementById("reset-btn")

const resetBtn = document.createElement("button")
resetBtn.textContent= "Delete all"
resetBtn.classList.add("reset-btn")



resetBtn.addEventListener("click", e =>{
    const groceryList = document.querySelector(".grocerylist")
    groceryList.innerHTML = ""
    groceries = []
    localStorage.clear()
    rstBtn.removeChild(resetBtn)

})

const myLocalStorage = JSON.parse(localStorage.getItem("groceries"))

if (myLocalStorage) {
    groceries = myLocalStorage
    listGrocery()
    rstBtn.appendChild(resetBtn)
}



addItems.addEventListener("click", e =>{
    if(!text.value){
        alert("Please add an item!")
    }  else {
        const list = {
            content: text.value,
            status: "not-done",
        }
        groceries.push(list)
        localStorage.setItem("groceries", JSON.stringify(groceries))
        text.value = ""
        rstBtn.appendChild(resetBtn)
        listGrocery()
    }
    
})

text.addEventListener("keypress", keypressAdd)

function keypressAdd(event) {
    if(text.value.length === 0 && event.keyCode === 13){
        alert("Please add an item!")
    } else if (text.value.length > 0 && event.keyCode === 13) {
        const list = {
            content: text.value,
            status: "not-done",
        }
        groceries.push(list)
        localStorage.setItem("groceries", JSON.stringify(groceries))
        text.value = ""
		listGrocery();
	}
}

function listGrocery(){
    const groceryList = document.querySelector(".grocerylist")
    groceryList.innerHTML = ""
    rstBtn.appendChild(resetBtn)

    
    

    groceries.forEach((items)=>{
        const itemContainer = document.createElement("div")
        const contentContainer = document.createElement("div")
        const itemContent = document.createElement("div")
        const deleteBtn = document.createElement("div")
        const editContainer = document.createElement("div")
        const editBtn = document.createElement('i')
        const doneEmpty = document.createElement("div")
        
        
        doneEmpty.innerHTML = `<i class="fa-regular fa-circle"></i>`
        editBtn.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>`
        deleteBtn.innerHTML = `<i class="fa-solid fa-trash delete-btn"></i>`
        
        
        itemContent.classList.add("item-content")
        itemContainer.classList.add("items-container")
        contentContainer.classList.add("content-container")
        editContainer.classList.add("edit-this")
        doneEmpty.classList.add("done")

        editContainer.appendChild(editBtn)
        groceryList.appendChild(itemContainer)
        itemContainer.appendChild(contentContainer)
        contentContainer.append(doneEmpty,itemContent,editContainer,deleteBtn)

        itemContent.innerHTML = `<input type="text" value="${items.content}"
        class="item-input"
        id="itemsadded" readonly>
        </input>`

        
        if(items.status === "done"){
            const input = itemContent.querySelector("input")
            doneEmpty.innerHTML = `<i class="fa-solid fa-circle-check"></i>`
            doneEmpty.classList.remove("done")
            doneEmpty.classList.add("not-done")
            input.classList.add("finished")
        } else if(items.stats === "not-done"){
            const input = itemContent.querySelector("input")
            doneEmpty.innerHTML = `<i class="fa-regular fa-circle"></i>`
            doneEmpty.classList.add("done")
            doneEmpty.classList.remove("not-done")
            input.classList.remove("finished")
        }

        doneEmpty.addEventListener("click", e =>{
            const input = itemContent.querySelector("input")

            if(doneEmpty.className === "done"){
                input.classList.add("finished")
                items.status = "done"
                localStorage.setItem("groceries", JSON.stringify(groceries))
                doneEmpty.classList.remove("done")
                doneEmpty.classList.add("not-done")
                doneEmpty.innerHTML = `<i class="fa-solid fa-circle-check"></i>`

            } else if(doneEmpty.className === "not-done"){
                input.classList.remove("finished")
                items.status = "not-done"
                localStorage.setItem("groceries", JSON.stringify(groceries))
                doneEmpty.classList.add("done")
                doneEmpty.classList.remove("not-done")
                doneEmpty.innerHTML = `<i class="fa-regular fa-circle"></i>`
            }
            
        })

        


        editContainer.addEventListener("click", (e)=>{
            const input = itemContent.querySelector("input")
            if(editContainer.className === "edit-this"){
                input.removeAttribute("readonly")
                input.focus()
                editBtn.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`
                // <i class="fa-solid fa-circle-check"></i>
                editContainer.classList.remove("edit-this")
                editContainer.classList.add("save-this")

            } else if(editContainer.className === "save-this"){
                console.log('hey')
                input.setAttribute("readonly","readonly")
                items.content = input.value
                localStorage.setItem("groceries", JSON.stringify(groceries))
                listGrocery()

            }
        })

        
        const input = itemContent.querySelector("input")
        input.addEventListener("keypress",(e)=>{
            if(editContainer.className === "save-this"  && event.keyCode === 13){
                console.log('hey')
                input.setAttribute("readonly","readonly")
                items.content = input.value
                localStorage.setItem("groceries", JSON.stringify(groceries))
                listGrocery()

            }
        })

        

        deleteBtn.addEventListener("click", (e) => {
            groceries = groceries.filter(t => t !=items)
            listGrocery()
            localStorage.setItem("groceries", JSON.stringify(groceries))
            
        })

    })
}







