import { supabase } from "./supabase.js"
import { requireModerator } from "./auth.js"

requireModerator()

const container = document.getElementById("homepageSections")

async function loadSections(){

const { data } = await supabase
.from("homepage_sections")
.select("*")
.order("display_order")

container.innerHTML = ""

data.forEach(section => {

const block = document.createElement("div")
block.className = "section editor-block"

block.innerHTML = `

<input class="edit-title" value="${section.title}">

<textarea class="edit-content">${section.content}</textarea>

<div class="editor-controls">

<button class="save">Save</button>
<button class="delete">Delete</button>

</div>

`

block.dataset.id = section.id

container.appendChild(block)

})

}

container.addEventListener("click", async e => {

const block = e.target.closest(".editor-block")

if(!block) return

const id = block.dataset.id

if(e.target.className === "save"){

const title = block.querySelector(".edit-title").value
const content = block.querySelector(".edit-content").value

await supabase
.from("homepage_sections")
.update({ title, content })
.eq("id", id)

alert("Saved")

}

if(e.target.className === "delete"){

await supabase
.from("homepage_sections")
.delete()
.eq("id", id)

loadSections()

}

})

window.addSection = async function(){

await supabase
.from("homepage_sections")
.insert({
section_type:"generic",
title:"New Section",
content:"Edit this text",
display_order:999
})

loadSections()

}

loadSections()
