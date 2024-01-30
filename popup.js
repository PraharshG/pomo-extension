document.addEventListener("DOMContentLoaded", () => {
    // Load todo list from storage
    chrome.storage.sync.get("todoList", (result) => {
      const todoList = result.todoList || [];
      updateTodoList(todoList);
    });
  
    // Load timer input from storage
    chrome.storage.sync.get("timerValue", (result) => {
      const timerInput = document.getElementById("timer-input");
      timerInput.value = result.timerValue || 45;
    });
  
    // Event listeners for timer
    const startTimerBtn = document.getElementById("start-timer");
    const stopTimerBtn = document.getElementById("stop-timer");
  
    startTimerBtn.addEventListener("click", () => {
      const timerInput = document.getElementById("timer-input");
      const timerValue = parseInt(timerInput.value);
  
      chrome.storage.sync.set({ timerValue });
  
      chrome.alarms.create("reminder", { delayInMinutes: timerValue });
    });
  
    stopTimerBtn.addEventListener("click", () => {
      chrome.alarms.clear("reminder");
    });
  });
  
  function updateTodoList(todoList) {
    const todoListContainer = document.getElementById("todo-list");
    todoListContainer.innerHTML = "";
  
    todoList.forEach((item, index) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.checked || false;
      checkbox.addEventListener("change", () => {
        item.checked = checkbox.checked;
        chrome.runtime.sendMessage({ action: "updateTodoList", todoList });
      });
  
      const label = document.createElement("label");
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(item.text));
  
      const listItem = document.createElement("div");
      listItem.appendChild(label);
  
      todoListContainer.appendChild(listItem);
    });
  }
  