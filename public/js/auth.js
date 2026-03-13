import { supabase } from "./supabase.js"


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


export async function requireModerator(){

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

if(profile.role !== "moderator" && profile.role !== "supermoderator"){
window.location="/dashboards/user.html"
}

}
