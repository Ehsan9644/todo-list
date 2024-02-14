const homeLink = document.getElementById("home-link");
const addTodoLink = document.getElementById("add-todo-link");
const allTodosLink = document.getElementById("all-todos-link");

// Get the current page URL
const currentPage = window.location.href;

// Add an event listener to each navigation link
homeLink.addEventListener("click", navigateToHome);
addTodoLink.addEventListener("click", navigateToAddTodo);
allTodosLink.addEventListener("click", navigateToAllTodos);

// Function to navigate to the home page
function navigateToHome(event) {
  event.preventDefault();
  window.location.href = "../components/home.html";
}

// Function to navigate to the addTodo page
function navigateToAddTodo(event) {
  event.preventDefault();
  window.location.href = "../components/addTodo.html";
}

// Function to navigate to the allTodos page
function navigateToAllTodos(event) {
  event.preventDefault();
  window.location.href = "../components/allTodos.html";
}

// Highlight the active tab based on the current page URL
function highlightActiveTab() {
  if (currentPage.includes("home.html")) {
    homeLink.classList.add("active");
  } else if (currentPage.includes("addTodo.html")) {
    addTodoLink.classList.add("active");
  } else if (currentPage.includes("allTodos.html")) {
    allTodosLink.classList.add("active");
  }
}

// Call the highlightActiveTab function when the page loads
highlightActiveTab();

//logout function
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "../components/sign-in.html";
});
