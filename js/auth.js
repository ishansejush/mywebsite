import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
"https://uxkunzwpamfmkbddmavu.supabase.co",
"sb_publishable_hSRnuCeMQ4I4IlPVjuw9Aw_kkWa7IAf"
)

export async function checkModerator(){

const { data } = await supabase.auth.getUser()

if(!data.user){
window.location="/login.html"
return
}

const { data: profile } = await supabase
.from("profiles")
.select("role")
.eq("id", data.user.id)
.single()

if(profile.role !== "moderator"){
alert("Access denied")
window.location="/dashboards/user.html"
}

}
export async function checkUser(){

const { data } = await supabase.auth.getUser()

if(!data.user){
window.location="/login.html"
}

}
