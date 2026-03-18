import { supabase } from "./supabase.js"
import { editBlock, deleteBlock } from "./blockEditor.js"

export async function renderPage(container, editable=false){

const { data, error } = await supabase
.from("page_blocks")
.select("*")
.eq("page","home")
.order("display_order")

if(error){
console.error(error)
return
}

container.innerHTML = ""

data.forEach(block => {

const el = document.createElement("div")

/* HERO BLOCK */

if(block.block_type === "hero"){

el.className = "section hero"

el.innerHTML = `
<h1>${block.title}</h1>
<p>${block.content}</p>
<button class="scroll-btn" onclick="scrollDown()">Explore</button>
`

}

/* TEXT BLOCK */

if(block.block_type === "text"){

el.className = "section"

el.innerHTML = `
<h1>${block.title}</h1>
<p>${block.content}</p>
`

}

/* EDIT MODE */

if(editable){

const controls = document.createElement("div")
controls.className = "block-controls"

const editBtn = document.createElement("button")
editBtn.innerText = "Edit"

const deleteBtn = document.createElement("button")
deleteBtn.innerText = "Delete"

controls.appendChild(editBtn)
controls.appendChild(deleteBtn)

editBtn.onclick = () => editBlock(block)

deleteBtn.onclick = () => deleteBlock(block.id)

el.appendChild(controls)

}

container.appendChild(el)

})

}
