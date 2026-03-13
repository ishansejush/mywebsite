import { supabase } from "./supabase.js"
import { requireModerator } from "./auth.js"

requireModerator()

const tableBody = document.querySelector("#rolesTable tbody")

async function loadRoles(){

const { data, error } = await supabase
.from("profiles")
.select("*")

if(error){
console.error(error)
return
}

tableBody.innerHTML = ""

data.forEach(user => {

const row = document.createElement("tr")

row.innerHTML = `
<td>${user.id}</td>

<td>
<select data-id="${user.id}">
<option value="user" ${user.role==="user"?"selected":""}>user</option>
<option value="moderator" ${user.role==="moderator"?"selected":""}>moderator</option>
<option value="supermoderator" ${user.role==="supermoderator"?"selected":""}>supermoderator</option>
</select>
</td>

<td>
<button data-id="${user.id}">Save</button>
</td>
`

tableBody.appendChild(row)

})

}

tableBody.addEventListener("click", async (e)=>{

if(e.target.tagName === "BUTTON"){

const userId = e.target.dataset.id
const select = tableBody.querySelector(`select[data-id="${userId}"]`)
const newRole = select.value

const { error } = await supabase
.from("profiles")
.update({ role: newRole })
.eq("id", userId)

if(error){
alert("Update failed")
console.error(error)
}
else{
alert("Role updated")
loadRoles()
}

}

})

loadRoles()
