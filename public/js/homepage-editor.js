import { supabase } from "./supabase.js"
import { requireModerator } from "./auth.js"

requireModerator()

let pageData = {}

async function loadContent(){

const { data, error } = await supabase
.from("homepage_content")
.select("*")
.eq("id",1)
.single()

if(error){
console.error(error)
return
}

pageData = data

document.querySelectorAll("[data-edit]").forEach(el => {

const field = el.dataset.edit

if(data[field]){
el.innerText = data[field]
}

})

enableEditing()

}

/* Enable inline editing */

function enableEditing(){

document.querySelectorAll("[data-edit]").forEach(el => {

el.addEventListener("click", () => {

if(el.classList.contains("editing")) return

el.classList.add("editing")

const original = el.innerText

el.contentEditable = true
el.focus()

const controls = el.nextElementSibling

if(controls){
controls.style.display = "block"

const saveBtn = controls.querySelector(".save-btn")
const cancelBtn = controls.querySelector(".cancel-btn")

saveBtn.onclick = async () => {

const newText = el.innerText

const update = {}
update[el.dataset.edit] = newText

const { error } = await supabase
.from("homepage_content")
.update(update)
.eq("id",1)

if(error){
alert("Update failed")
console.error(error)
return
}

el.contentEditable = false
el.classList.remove("editing")
controls.style.display = "none"

}

cancelBtn.onclick = () => {

el.innerText = original
el.contentEditable = false
el.classList.remove("editing")
controls.style.display = "none"

}

}

})

})

}

loadContent()
