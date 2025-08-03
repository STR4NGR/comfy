chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message); // Для отладки
  if (message.action === 'fillGoodPriceField') {
    const inputField = document.querySelector('input.gwt-TextBox.double-editor.tutorial-stage-sales-fifth-step.good-price-field');
    if (inputField) {
      console.log('Input field found, setting value to:', message.value); // Для отладки
      inputField.value = message.value;
      // Имитация события ввода для триггера обработчиков
      const inputEvent = new Event('input', { bubbles: true });
      inputField.dispatchEvent(inputEvent);
      // Имитация события изменения, если требуется
      const changeEvent = new Event('change', { bubbles: true });
      inputField.dispatchEvent(changeEvent);
    } else {
      console.error('Input field not found with selector: input.gwt-TextBox.double-editor.tutorial-stage-sales-fifth-step.good-price-field');
    }
  }
});