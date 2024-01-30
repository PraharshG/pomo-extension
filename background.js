chrome.runtime.onInstalled.addListener(() => {
    // Initialize storage
    chrome.storage.sync.set({ todoList: [] });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateTodoList") {
      chrome.storage.sync.set({ todoList: message.todoList });
    }
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reminder") {
      chrome.tabs.create({ url: "reminder.html" });
    }
  });