import { supabase } from "./supabase.js"

export async function renderPage(container, editable=false){

const { data } = await supabase
.from("page_blocks")
.select("*")
.eq("page","home")
.order("display_order")

container.innerHTML = ""

data.forEach(block => {

const el = document.createElement("div")

if(block.block_type === "hero"){

el.className = "section hero"

el.innerHTML = `
<h1>${block.title}</h1>
<p>${block.content}</p>
<button class="scroll-btn">Explore</button>
`

}

if(block.block_type === "text"){

el.className = "section"

el.innerHTML = `
<h1>${block.title}</h1>
<p>${block.content}</p>
`

}

if(editable){

const panel = document.createElement("div")

panel.innerHTML = `
<button class="edit">Edit</button>
<button class="delete">Delete</button>
`

panel.className = "block-controls"

el.appendChild(panel)

panel.querySelector(".edit").onclick = () =>
editBlock(block)

panel.querySelector(".delete").onclick = () =>
deleteBlock(block.id)

}

container.appendChild(el)

})

}
