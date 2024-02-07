document.getElementById("signin-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

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
        // Extract user ID from the response data
        const data = await response.json();

        const userId =data.id;

        console.log("User ID:", userId);
        // Store the user ID in localStorage for later use
        localStorage.setItem("userId", userId);
        // If the response is successful, redirect to the home page
        window.location.href = "../components/home.html"; // Replace "home.html" with the actual path of your home page
      } else {
        // If the response is not successful, handle the error
        alert("Invalid username or password");
      }
    } catch (error) {
      // Handle any network or fetch-related errors
      console.error("Error:", error);
    }
  });
