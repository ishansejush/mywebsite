import { supabase } from "./supabase.js"
import { requireModerator } from "./auth.js"

requireModerator()

async function loadHomepage(){

const { data, error } = await supabase
.from("homepage_content")
.select("*")
.eq("id",1)
.single()

if(error){
console.error(error)
return
}

document.getElementById("homeTitle").innerText = data.title
document.getElementById("homeSubtitle").innerText = data.subtitle

}

window.editField = async function(field){

const element =
field === "title"
? document.getElementById("homeTitle")
: document.getElementById("homeSubtitle")

const currentText = element.innerText

const newText = prompt("Edit text:", currentText)

if(!newText) return

const update = {}
update[field] = newText

const { error } = await supabase
.from("homepage_content")
.update(update)
.eq("id",1)

if(error){
alert("Update failed")
console.error(error)
return
}

element.innerText = newText

}

loadHomepage()
