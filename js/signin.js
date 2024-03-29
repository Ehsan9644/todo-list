document
  .getElementById("signin-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        const userId = data.id;
        const UserImage = data.image;
        const UserFirstName = data.firstName;
        const UserLastName = data.lastName;

        console.log("User ID:", userId);
        localStorage.setItem("userId", userId);
        localStorage.setItem("userImage", UserImage);
        localStorage.setItem("userFirstName", UserFirstName);
        localStorage.setItem("userLastName", UserLastName);
        localStorage.setItem("userData", JSON.stringify(data));
        window.location.href = "../components/home.html";
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
