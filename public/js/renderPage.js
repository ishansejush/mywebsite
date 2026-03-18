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

el.className = "block-wrapper"

if(block.block_type === "hero"){

el.innerHTML = `
<div class="section hero">
<h1>${block.title}</h1>
<p>${block.content}</p>
<button class="scroll-btn">Explore</button>
</div>
`

}

if(block.block_type === "text"){

el.innerHTML = `
<div class="section">
<h1>${block.title}</h1>
<p>${block.content}</p>
</div>
`

}

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

el.dataset.id = block.id

container.appendChild(el)

})

/* Enable drag sorting */

if(editable){

new Sortable(container,{

animation:150,

onEnd: async function(){

const blocks = container.querySelectorAll(".block-wrapper")

for(let i=0;i<blocks.length;i++){

const id = blocks[i].dataset.id

await supabase
.from("page_blocks")
.update({ display_order:i+1 })
.eq("id",id)

}

}

})

}

}
