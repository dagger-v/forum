const toggleButton = document.getElementById("post-btn");
const myForm = document.getElementById("post-form");
toggleButton.addEventListener("click", (e) => {
  e.preventDefault();
  myForm.classList.toggle("hidden");
});
