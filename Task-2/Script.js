document.addEventListener("DOMContentLoaded", function () {
  let display = document.getElementById("display");
  let buttons = document.querySelectorAll(".btn");
  let clearBtn = document.getElementById("clear");
  let deleteBtn = document.getElementById("delete");
  let equalBtn = document.getElementById("equal");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      display.value += this.value;
    });
  });

  clearBtn.addEventListener("click", function () {
    display.value = "";
  });

  deleteBtn.addEventListener("click", function () {
    display.value = display.value.slice(0, -1);
  });

  equalBtn.addEventListener("click", function () {
    try {
      display.value = new Function("return " + display.value)();
    } catch {
      display.value = "Error";
    }
  });
});
