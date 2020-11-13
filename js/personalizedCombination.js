const buttons = {
  openDialog: document.querySelector(".fa-pencil-alt"),
  cancel: document.querySelector("#cancel"),
  done: document.querySelector("#done"),
};
const dialogWindow = document.querySelector("#dialog-window");
const form = document.querySelector("form");
const input = document.querySelector("input");

// All the code below______________________________________________________________
form.addEventListener("click", (e) => e.stopPropagation());

dialogWindow.addEventListener("click", (e) => onDialogButtonClicked(e));

buttons.openDialog.addEventListener("click", (e) => {
  dialogWindow.style.display = "block";
  input.focus();
  e.stopPropagation();
});

buttons.cancel.addEventListener("click", (e) => onDialogButtonClicked(e));

buttons.done.addEventListener("click", (e) => {
  // func() add the combanition and upload it
  onDialogButtonClicked(e);
});

function onDialogButtonClicked(e) {
  dialogWindow.style.display = "none";
  input.value = "";
  e.preventDefault();
  e.stopPropagation();
}
