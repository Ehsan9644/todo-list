const homeLink = document.getElementById("home-link");
const addTodoLink = document.getElementById("add-todo-link");
const allTodosLink = document.getElementById("all-todos-link");
const currentPage = window.location.href;
const userData = JSON.parse(localStorage.getItem("userData"));
// console.log(userData);
// console.log(userData.email);
// const imgurl = userData.image;
// console.log("url " + localstorage.userImage);

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

// let img = document.getElementById("image");
// img.innerHTML = '<img src="${localstorage.userImage}" alt="Display picture">';

const getUserImage = document.getElementById("user-image");
getUserImage.innerHTML = `

<div>
<div>

<img src="${localStorage.userImage}" alt="user-image" width="50px">
</div>
`;

//logout function
document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "../components/sign-in.html";
});
