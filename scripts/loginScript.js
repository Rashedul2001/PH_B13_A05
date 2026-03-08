const userName = document.getElementById("user-name");
const password = document.getElementById("password");
const submitBtn = document.getElementById("submit-btn");



const handleLogIn = () => {

    if (userName.value === "admin" && password.value === "admin123") {
        window.location.replace("pages/home.html");
        showAllCardList();
    }
    else {
        alert("Invalid username or password");
        userName.value = "";
        password.value = "";
    }

}


submitBtn.addEventListener("click", handleLogIn);