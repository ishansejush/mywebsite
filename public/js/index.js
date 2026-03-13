let menuOpen = false;

function toggleMenu(){

const sidebar = document.getElementById("sidebar");

if(menuOpen){
sidebar.style.right = "-260px";
menuOpen = false;
}
else{
sidebar.style.right = "0";
menuOpen = true;
}

}

</script>

<script>

function scrollDown(){
document.getElementById("features").scrollIntoView({
behavior: "smooth"
});
}
