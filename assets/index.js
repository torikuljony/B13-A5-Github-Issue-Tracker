document.getElementById("sign-in").addEventListener("click", function (event) {event.preventDefault();
    
    console.log("click");

    const username = document.getElementById("username").value.trim();
    const passWord = document.getElementById("passWord").value.trim();
     
    if(username == "admin" && passWord == "admin123"){
        window.location.href = "main.html";
    }
    else{
        alert("wrong username or password");
    }

});
