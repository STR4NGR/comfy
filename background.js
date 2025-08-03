chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fillGoodPriceField') {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0) {
                console.error('No active tab found');
                sendResponse({ status: 'error', message: 'No active tab' });
                return;
            }
            chrome.tabs.sendMessage(tabs[0].id, message, (response) => {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message:', chrome.runtime.lastError.message);
                    sendResponse({ status: 'error', message: chrome.runtime.lastError.message });
                } else {
                    sendResponse(response);
                }
            });
        });
        return true; // Для асинхронного ответа
    }
});