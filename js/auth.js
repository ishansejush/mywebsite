import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabase = createClient(
"https://uxkunzwpamfmkbddmavu.supabase.co",
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4a3VuendwYW1mbWtiZGRtYXZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMTY4MjEsImV4cCI6MjA4ODg5MjgyMX0.kSWyPX9KW8f_3pEIRWzm5y09k07zkvg5ZHeyWKG4ajA"
)

export async function checkModerator(){

const { data } = await supabase.auth.getUser()

if(!data.user){
window.location="/public/login.html"
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
