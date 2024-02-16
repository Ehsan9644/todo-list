const homeLink = document.getElementById("home-link");
const addTodoLink = document.getElementById("add-todo-link");
const allTodosLink = document.getElementById("all-todos-link");
const currentPage = window.location.href;

homeLink.addEventListener("click", navigateToHome);
addTodoLink.addEventListener("click", navigateToAddTodo);
allTodosLink.addEventListener("click", navigateToAllTodos);

function navigateToHome(event) {
  event.preventDefault();
  window.location.href = "../components/home.html";
}

function navigateToAddTodo(event) {
  event.preventDefault();
  window.location.href = "../components/addTodo.html";
}

function navigateToAllTodos(event) {
  event.preventDefault();
  window.location.href = "../components/allTodos.html";
}

function highlightActiveTab() {
  if (currentPage.includes("home.html")) {
    homeLink.classList.add("active");
  } else if (currentPage.includes("addTodo.html")) {
    addTodoLink.classList.add("active");
  } else if (currentPage.includes("allTodos.html")) {
    allTodosLink.classList.add("active");
  }
}
highlightActiveTab();

//logout function
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "../components/sign-in.html";
});
