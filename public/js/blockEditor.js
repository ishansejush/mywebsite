import { supabase } from "./supabase.js"

export async function editBlock(block){

const title = prompt("Edit title", block.title)
const content = prompt("Edit content", block.content)

if(!title) return

const { error } = await supabase
.from("page_blocks")
.update({
title:title,
content:content
})
.eq("id", block.id)

if(error){
console.error(error)
alert("Update failed")
return
}

location.reload()

}

export async function deleteBlock(id){

if(!confirm("Delete this section?")) return

const { error } = await supabase
.from("page_blocks")
.delete()
.eq("id", id)

if(error){
console.error(error)
alert("Delete failed")
return
}

location.reload()

}

export async function addBlock(){

const { error } = await supabase
.from("page_blocks")
.insert({
page:"home",
block_type:"text",
title:"New Section",
content:"Edit this content",
display_order:999
})

if(error){
console.error(error)
alert("Failed to add block")
return
}

location.reload()

}
