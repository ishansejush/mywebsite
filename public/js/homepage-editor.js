import { supabase } from "./supabase.js"
import { requireModerator } from "./auth.js"

requireModerator()

/* load existing content */

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

document.getElementById("title").value = data.title
document.getElementById("subtitle").value = data.subtitle

}

window.saveHomepage = async function(){

const title = document.getElementById("title").value
const subtitle = document.getElementById("subtitle").value

const { error } = await supabase
.from("homepage_content")
.update({
title:title,
subtitle:subtitle
})
.eq("id",1)

if(error){
alert("Update failed")
console.error(error)
}
else{
alert("Homepage updated successfully")
}

}

loadHomepage()
