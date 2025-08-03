// Функция для ожидания элемента
async function waitForElement(selector, timeout = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const element = document.querySelector(selector);
        if (element && element.offsetParent !== null && window.getComputedStyle(element).display !== 'none') {
            return element;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Элемент ${selector} не найден или не видим за ${timeout} мс`);
}

// Функция для ожидания активной вкладки "Цены"
async function waitForPricesTab(timeout = 10000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const pricesTab = Array.from(document.querySelectorAll('.tab')).find(tab =>
            tab.querySelector('.gwt-Label')?.textContent.trim() === 'Цены' && tab.classList.contains('selected')
        );
        if (pricesTab) {
            return pricesTab;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Вкладка "Цены" не найдена или не активна за ${timeout} мс`);
}

// Функция для поиска строки с текстом
async function findRowWithText(rows, selector, text, timeout = 3000) {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const row = Array.from(rows).find(row =>
            row.querySelector(selector)?.textContent.trim() === text && row.offsetParent !== null
        );
        if (row) return row;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw new Error(`Строка с текстом "${text}" не найдена за ${timeout} мс`);
}

// Функция для отправки значения в поле ввода и вызова событий
function setInputValue(inputField, value) {
    if (!inputField) {
        console.error('Поле ввода не найдено');
        return false;
    }

    try {
        // Приводим значение к строке
        const formattedValue = typeof value === 'number'
            ? value.toFixed(2).replace('.', ',')
            : String(value).replace('.', ',');

        // Проверяем доступность поля
        if (inputField.disabled || inputField.readOnly || !inputField.offsetParent || window.getComputedStyle(inputField).display === 'none') {
            console.warn('Поле недоступно для ввода:', {
                disabled: inputField.disabled,
                readOnly: inputField.readOnly,
                visible: !!inputField.offsetParent,
                display: window.getComputedStyle(inputField).display
            });
            return false;
        }

        // Очищаем поле
        inputField.value = '';
        inputField.dispatchEvent(new Event('input', { bubbles: true }));
        inputField.dispatchEvent(new Event('change', { bubbles: true }));

        // Устанавливаем значение
        inputField.value = formattedValue;

        // Триггерим события для GWT
        const events = ['input', 'change', 'blur'].map(type => new Event(type, { bubbles: true }));
        events.forEach(event => inputField.dispatchEvent(event));

        return true;
    } catch (error) {
        console.error('Ошибка при установке значения:', error.message);
        return false;
    }
}

// Функция для наблюдения за DOM
function observeDOM(callback) {
    const observer = new MutationObserver((mutations, obs) => {
        console.log('DOM изменился');
        const priceTable = document.querySelector('.price-table');
        const requiredFields = document.querySelectorAll('.gwt-TextBox.good-price-field, .label.good-price-label');
        const pricesTab = Array.from(document.querySelectorAll('.tab')).find(tab =>
            tab.querySelector('.gwt-Label')?.textContent.trim() === 'Цены' && tab.classList.contains('selected')
        );
        if (priceTable && requiredFields.length > 0 && pricesTab) {
            console.log('Таблица, поля и вкладка "Цены" найдены, начинаем обработку');
            callback();
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
    });
}

function fillMinPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.inverse-help-container .label.good-price-label')?.textContent.trim() === 'Минимальная цена' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function fillOZPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'OZ+ИМ+ТОМА+++++' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function fillOZOldPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'OZ=Тома СТАРцена===' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function fillShop5PriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === '*ЯМ===5М===5М====ЯМ*' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

// Остальные функции для заполнения других полей
function fillPurchasePriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.inverse-help-container .label.good-price-label')?.textContent.trim() === 'Закупочная цена' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function standartFillMinPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.inverse-help-container .label.good-price-label')?.textContent.trim() === 'Минимальная цена' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function standartfillOZField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'OZ+ИМ+ТОМА+++++' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function standartfillOldOZField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'OZ=Тома СТАРцена===' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function standartfillShop5Field(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === '*ЯМ===5М===5М====ЯМ*' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function standartfillMarkField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === '^^^ ^^^ ^^^ ^^^ ^^^ ^^^' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function doubleminusFillMinPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.inverse-help-container .label.good-price-label')?.textContent.trim() === 'Минимальная цена' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function doubleminusFillPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'Цена продажи' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function doubleminusfillOZField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'OZ+ИМ+ТОМА+++++' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function doubleminusfillShop5Field(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === '*ЯМ===5М===5М====ЯМ*' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function roFillMinPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.inverse-help-container .label.good-price-label')?.textContent.trim() === 'Минимальная цена' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function roFillPriceField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'Цена продажи' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function rofillOZField(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === 'OZ+ИМ+ТОМА+++++' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

function rofillShop5Field(value) {
    const row = Array.from(document.querySelectorAll('.price-table tbody tr')).find(row =>
        row.querySelector('.label.good-price-label')?.textContent.trim() === '*ЯМ===5М===5М====ЯМ*' && row.offsetParent !== null
    );
    const inputField = row?.querySelector('.gwt-TextBox.good-price-field');
    setInputValue(inputField, value);
}

// Обработчик сообщений Chrome
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    async function fillFields() {
        if (!window.location.href.includes('moysklad.ru')) {
            console.error('Неправильная страница:', window.location.href);
            sendResponse({ status: 'error', message: 'Неправильная страница' });
            return;
        }

        const priceTable = document.querySelector('.price-table');
        const requiredFields = document.querySelectorAll('.gwt-TextBox.good-price-field, .modification-price-field');
        console.log('priceTable:', priceTable);
        console.log('requiredFields:', Array.from(requiredFields).map(field => ({
            id: field.id,
            value: field.value,
            disabled: field.disabled,
            readOnly: field.readOnly,
            visible: !!field.offsetParent,
            display: window.getComputedStyle(field).display,
            className: field.className
        })));

        switch (message.action) {
            case 'fillMinPriceField':
                fillMinPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'fillOZPriceField':
                fillOZPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'fillOZOldPriceField':
                fillOZOldPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'fillShop5PriceField':
                fillShop5PriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'standartFillMinPriceField':
                doubleminusFillMinPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'standartfillOZField':
                standartfillOZField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'standartfillOldOZField':
                standartfillOldOZField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'standartfillShop5Field':
                standartfillShop5Field(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'standartfillMarkField':
                standartfillMarkField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'doubleminusFillMinPriceField':
                doubleminusFillMinPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'doubleminusFillPriceField':
                doubleminusFillPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'doubleminusfillOZField':
                doubleminusfillOZField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'doubleminusfillShop5Field':
                doubleminusfillShop5Field(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'roFillMinPriceField':
                roFillMinPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'roFillPriceField':
                roFillPriceField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'rofillOZField':
                rofillOZField(message.value);
                sendResponse({ status: 'success' });
                break;
            case 'rofillShop5Field':
                rofillShop5Field(message.value);
                sendResponse({ status: 'success' });
                break;
            default:
                sendResponse({ status: 'error', message: 'Неизвестное действие' });
        }
    }

    // Проверяем наличие таблицы, полей и активной вкладки "Цены"
    const priceTable = document.querySelector('.price-table');
    const requiredFields = document.querySelectorAll('.gwt-TextBox.good-price-field, .modification-price-field');
    const pricesTab = Array.from(document.querySelectorAll('.tab')).find(tab =>
        tab.querySelector('.gwt-Label')?.textContent.trim() === 'Цены' && tab.classList.contains('selected')
    );
    if (priceTable && requiredFields.length > 0 && pricesTab) {
        fillFields();
    } else {
        observeDOM(fillFields);
    }

    return true; // Асинхронный ответ
});