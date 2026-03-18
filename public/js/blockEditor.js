import { supabase } from "./supabase.js"

export async function editBlock(block){

const title = prompt("Title", block.title)
const content = prompt("Content", block.content)

if(!title) return

await supabase
.from("page_blocks")
.update({ title, content })
.eq("id", block.id)

location.reload()

}

export async function deleteBlock(id){

await supabase
.from("page_blocks")
.delete()
.eq("id", id)

location.reload()

}

export async function addBlock(){

await supabase
.from("page_blocks")
.insert({
page:"home",
block_type:"text",
title:"New Section",
content:"Edit this section",
display_order:999
})

location.reload()

}
