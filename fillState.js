chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fillFields") {
    const { field1, field2, field3 } = message.values;
    setTimeout(() => {
      const input1 = document.querySelector("#field1");
      const input2 = document.querySelector("#field2");
      const input3 = document.querySelector("#field3");
      if (input1 && input2 && input3) {
        input1.value = field1;
        input2.value = field2;
        input3.value = field3;
        const calculateButton = document.querySelector("#calculate");
        if (calculateButton) {
          calculateButton.click();
        }
      } else {
        console.error("Одно или несколько полей не найдены");
      }
    }, 1000);
  }
});