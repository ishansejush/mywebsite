import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
"https://uxkunzwpamfmkbddmavu.supabase.co",
"sb_publishable_hSRnuCeMQ4I4IlPVjuw9Aw_kkWa7IAf"
)

let usernameAvailable = false

/* username checker */

document.getElementById("username").addEventListener("input", checkUsername)

async function checkUsername(){

const username = document.getElementById("username").value
const status = document.getElementById("usernameStatus")

if(username.length < 3){
status.innerText = "Username must be at least 3 characters"
status.style.color = "orange"
usernameAvailable = false
return
}

const { data } = await supabase
.from("profiles")
.select("username")
.eq("username", username)

if(data.length > 0){
status.innerText = "Username already taken"
status.style.color = "red"
usernameAvailable = false
}
else{
status.innerText = "Username available"
status.style.color = "lightgreen"
usernameAvailable = true
}

}

/* signup */

window.signup = async function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value
const username = document.getElementById("username").value

if(!usernameAvailable){
alert("Please choose an available username")
return
}

const { data, error } = await supabase.auth.signUp({
email: email,
password: password
})

if(error){
console.error(error)
alert("Signup failed: " + error.message)
return
}

/* create profile */

const { error: profileError } = await supabase
.from("profiles")
.insert({
id: data.user.id,
username: username,
role: "user"
})

if(profileError){
alert("Account created but profile setup failed")
console.error(profileError)
return
}

alert("Signup successful!")

window.location="/login.html"

}
