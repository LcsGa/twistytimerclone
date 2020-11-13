const buttons = {
  openDialog: document.querySelector(".fa-pencil-alt"),
  cancel: document.querySelector("#cancel"),
  done: document.querySelector("#done"),
};
const dialog = document.querySelector("#dialog");
const input = document.querySelector("input");

buttons.openDialog.addEventListener("click", (e) => {
  dialog.style.display = "block";
  e.stopPropagation();
});

buttons.cancel.addEventListener("click", (e) => {
  onDialogButtonClicked(e);
});

buttons.done.addEventListener("click", (e) => {
  // func() add the combanition and upload it
  onDialogButtonClicked(e);
});

function onDialogButtonClicked(e) {
  dialog.style.display = "none";
  input.value = "";
  e.preventDefault();
  e.stopPropagation();
}
