
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
"https://uxkunzwpamfmkbddmavu.supabase.co",
"sb_publishable_hSRnuCeMQ4I4IlPVjuw9Aw_kkWa7IAf"
)

window.signup = async function(){

const email = document.getElementById("email").value
const password = document.getElementById("password").value

const { data, error } = await supabase.auth.signUp({
email: email,
password: password
})

if(error){
console.error(error)
alert("Signup failed: " + error.message)
return
}

alert("Signup successful!")
window.location="/login.html"

}
