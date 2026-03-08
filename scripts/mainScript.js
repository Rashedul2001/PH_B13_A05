console.log("script is running");

const handleLogIn = () => {
    const userName = document.getElementById("user-name");
    const password = document.getElementById("password");
    if (userName.value === "admin" && password.value === "admin123") {
        window.location.replace("./pages/home.html");
    }
    else {
        alert("Invalid username or password");
        userName.value = "";
        password.value = "";
    }
}
document.getElementById("submit-btn").addEventListener("click", handleLogIn);

