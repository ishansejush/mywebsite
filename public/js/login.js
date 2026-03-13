import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
"https://uxkunzwpamfmkbddmavu.supabase.co",
"sb_publishable_hSRnuCeMQ4I4IlPVjuw9Aw_kkWa7IAf"
)

window.login = async function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } = await supabase.auth.signInWithPassword({
email: email,
password: password
})

if(error){
alert("Login failed: " + error.message)
return
}

const user = data.user

// check role
const { data: profile, error: roleError } = await supabase
.from("profiles")
.select("role")
.eq("id", user.id)
.single()

if(roleError){
alert("Role check failed")
return
}

if(profile.role === "moderator"){
window.location = "/dashboards/moderator.html"
}
else{
window.location = "/dashboards/user.html"
}

}
