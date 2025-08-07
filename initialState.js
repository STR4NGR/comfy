// Функция debounce для ограничения частоты вызовов
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Сохранение значения поля
function saveFieldValue(fieldId, value, callback) {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    settings[fieldId] = value;
    chrome.storage.local.set({ settings }, () => {
      console.log(`Saved ${fieldId}: ${value}`);
      if (callback) callback();
    });
  });
}

// Загрузка настроек
function loadSettings() {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      G4: '3',
      B5: '18.7',
      C5: '20.3',
      C6: '12.2',
      E5: '5.01',
      F5: '109.3',
      G5: '6',
      H5: '1.524',
      E6: '4.4125',
      H6: '38',
      J5: '12',
      K5: '22',
      J6: '15',
      K6: '15',
      M5: '17',
      N5: '22',
      M6: '9',
      N6: '15',
      O6: '1.9'
    };

    Object.keys(defaultSettings).forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (input) {
        input.value = settings[fieldId] !== undefined ? settings[fieldId] : defaultSettings[fieldId];
      } else {
        console.warn(`Input with ID ${fieldId} not found`);
      }
    });

    // Обновляем состояние кнопок и текущую страницу после загрузки
    updateButtonState();
    updateCurrentPage();
  });
}

// Обновление состояния кнопок
function updateButtonState() {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      E5: '5.01',
      E6: '4.4125'
    };

    const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
    const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
    const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
    const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
    const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;

    const g28 = f10 * 4.7;
    const g29 = f10 * 5;
    const g30 = f10 * 5.4;

    document.getElementById('g28-value').textContent = g28.toFixed(0);
    document.getElementById('g29-value').textContent = g29.toFixed(0);
    document.getElementById('g30-value').textContent = g30.toFixed(0);

    const e9 = f10 * e5;
    const h27 = f10 * e6;
    const isInvalid = f27 < h27 || e10 < e9;

    const buttons = [
      document.getElementById('doubleplus-btn'),
      document.getElementById('standart-btn'),
      document.getElementById('doubleminus-btn'),
      document.getElementById('ro-btn')
    ];

    const e10Input = document.getElementById('E10');
    const f27Input = document.getElementById('F27');
    const e9Element = document.getElementById('e9-value'); 
    const h27Element = document.getElementById('h27-value');

    // Обновление значений e9 и h27
    if (e9Element) {
      e9Element.textContent = e9.toFixed(0);
    } else {
      console.warn('Element e9-value not found');
    }

    if (h27Element) {
      h27Element.textContent = h27.toFixed(0);
    } else {
      console.warn('Element h27-value not found');
    }

    // Подсветка проблемных полей
    if (e10Input) {
      if (e10 < e9) {
        e10Input.classList.add('error');
      } else {
        e10Input.classList.remove('error');
      }
    } else {
      console.warn('Input E10 not found');
    }

    if (f27Input) {
      if (f27 < h27) {
        f27Input.classList.add('error');
      } else {
        f27Input.classList.remove('error');
      }
    } else {
      console.warn('Input F27 not found');
    }

    buttons.forEach(button => {
      if (button) {
        button.disabled = isInvalid;
      } else {
        console.warn(`Button not found`);
      }
    });
  });
}

// Отправка значений в content script
function sendFieldValues() {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      G4: '3',
      B5: '18.7',
      C5: '20.3',
      C6: '12.2',
      E5: '5.01',
      F5: '109.3',
      G5: '6',
      H5: '1.524',
      E6: '4.4125',
      H6: '38',
      J5: '12',
      K5: '22',
      J6: '15',
      K6: '15',
      M5: '17',
      N5: '22',
      M6: '9',
      N6: '15',
      O6: '1.9'
    };

    const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
    const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
    const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
    const g4 = parseFloat(settings.G4) || parseFloat(defaultSettings.G4) || 3;
    const b5 = parseFloat(settings.B5) || parseFloat(defaultSettings.B5) || 18.7;
    const c5 = parseFloat(settings.C5) || parseFloat(defaultSettings.C5) || 20.3;
    const c6 = parseFloat(settings.C6) || parseFloat(defaultSettings.C6) || 12.2;
    const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
    const f5 = parseFloat(settings.F5) || parseFloat(defaultSettings.F5) || 109.3;
    const g5 = parseFloat(settings.G5) || parseFloat(defaultSettings.G5) || 6;
    const h5 = parseFloat(settings.H5) || parseFloat(defaultSettings.H5) || 1.524;
    const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;
    const h6 = parseFloat(settings.H6) || parseFloat(defaultSettings.H6) || 38;
    const j5 = parseFloat(settings.J5) || parseFloat(defaultSettings.J5) || 12;
    const k5 = parseFloat(settings.K5) || parseFloat(defaultSettings.K5) || 22;
    const j6 = parseFloat(settings.J6) || parseFloat(defaultSettings.J6) || 15;
    const k6 = parseFloat(settings.K6) || parseFloat(defaultSettings.K6) || 15;
    const m5 = parseFloat(settings.M5) || parseFloat(defaultSettings.M5) || 17;
    const n5 = parseFloat(settings.N5) || parseFloat(defaultSettings.N5) || 22;
    const m6 = parseFloat(settings.M6) || parseFloat(defaultSettings.M6) || 9;
    const n6 = parseFloat(settings.N6) || parseFloat(defaultSettings.N6) || 15;
    const o6 = parseFloat(settings.O6) || parseFloat(defaultSettings.O6) || 1.9;

    // Расчёты для всех страниц
    const f8 = e10 * h5;
    const e9 = f10 * e5;
    const g13 = f27;
    const f15 = e10 + e10 / 100 * f5;
    const f17 = f15 + f15 / 100 * g5;
    const f21 = e10 + e10 / 100 * h6;
    const g25 = e10;
    const h27 = f10 * e6;

    const g8 = Math.round(f8 / 10) * 10 + g4;
    const g15 = Math.round(f15 / 10) * 10 + g4;
    const g17 = Math.round(f17 / 10) * 10 + g4;
    const g21 = Math.round(f21 / 10) * 10 + g4;

    const b8 = g8 + g8 / 100 * b5;
    const b13 = g13;
    const b15 = g15 + g15 / 100 * c5;
    const b21 = g21 + g21 / 100 * c6;
    const b25 = g25;

    const c8 = Math.round(b8 / 10) * 10 + g4;
    const c15 = Math.round(b15 / 10) * 10 + g4;
    const c17 = c15;
    const c21 = Math.round(b21 / 10) * 10 + g4;

    const k8 = g8 - g8 / 100 * j5;
    const k13 = g13 - g13 / 100 * k5;
    const j13 = Math.round(k13 / 10) * 10;
    const k15 = g15 - g15 / 100 * j6;
    const j17 = g17;
    const k21 = g21 - g21 / 100 * k6;
    const j25 = g25;
    const j27 = f27;

    const j8 = Math.round(k8 / 10) * 10 + g4;
    const j15 = Math.round(k15 / 10) * 10 + g4;
    const j21 = Math.round(k21 / 10) * 10 + g4;

    const n8 = g8 - g8 / 100 * m5;
    const n7 = n8 > 2490 ? 2490 : n8;
    const n13 = g13 - g13 / 100 * n5;
    const m13 = Math.round(n13 / 10) * 10;
    const m8 = Math.round(n7 / 10) * 10 + g4;
    const p15 = m8 * o6;
    const o15 = j15 - j15 / 100 * m6;
    const n15 = Math.min(o15, p15);
    const m17 = g17;
    const n21 = j21 - j21 / 100 * n6;
    const m25 = g25;
    const m27 = f27;

    const m15 = Math.round(n15 / 10) * 10 + g4;
    const m21 = Math.round(n21 / 10) * 10 + g4;

    const e28 = f10 * 4.7;
    const e29 = f10 * 5;
    const e30 = f10 * 5.4;

    const g14 = g15 / g8;
    const c14 = c15 / c8;
    const j14 = j15 / j8;
    const m14 = m15 / m8;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "fillFields",
          values: {
            e10, f10, f27,
            e5, f5, g5, h5, e6, h6,
            f8, e9, g13, f15, f17, f21, g25, h27,
            g8, g15, g17, g21, g14,
            b5, c5, c6,
            b8, b13, b15, b21, b25,
            c8, c15, c17, c21, c14,
            j5, k5, j6, k6,
            k8, k13, j13, k15, j17, k21, j25, j27,
            j8, j15, j21, j14,
            m5, n5, m6, n6, o6,
            n7, n8, n13, m13, p15, o15, n15, m17, n21, m25, m27,
            m8, m15, m21, m14,
            e28, e29, e30
          }
        }, (response) => {
          console.log('Response from content script:', response);
        });
      } else {
        console.error('No active tab found');
      }
    });
  });
}

// Обновление текущей страницы
function updateCurrentPage() {
  const activePage = document.querySelector('.page.active');
  if (activePage) {
    showPage(activePage.id);
  } else {
    console.warn('No active page found');
  }
}

// Переключение страниц
function showPage(pageId) {
  console.log('Switching to page:', pageId); // Для отладки
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');

  // Скрываем или показываем кнопки в зависимости от страницы
    const buttons = [
        document.getElementById('doubleplus-btn'),
        document.getElementById('standart-btn'),
        document.getElementById('doubleminus-btn'),
        document.getElementById('ro-btn')
    ];

    if (pageId === 'main-menu') {
        // Показываем кнопки на главной странице
        buttons.forEach(button => {
            if (button) {
                button.classList.remove('hidden');
            }
        });
    } else {
        // Скрываем кнопки на других страницах
        buttons.forEach(button => {
            if (button) {
                button.classList.add('hidden');
            }
        });
    }

  // Отображаем значения в зависимости от страницы
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      G4: '3',
      B5: '18.7',
      C5: '20.3',
      C6: '12.2',
      E5: '5.01',
      F5: '109.3',
      G5: '6',
      H5: '1.524',
      E6: '4.4125',
      H6: '38',
      J5: '12',
      K5: '22',
      J6: '15',
      K6: '15',
      M5: '17',
      N5: '22',
      M6: '9',
      N6: '15',
      O6: '1.9'
    };

    // Извлекаем значения из хранилища или используем значения по умолчанию
    const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
    const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
    const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
    const g4 = parseFloat(settings.G4) || parseFloat(defaultSettings.G4) || 3;
    const b5 = parseFloat(settings.B5) || parseFloat(defaultSettings.B5) || 18.7;
    const c5 = parseFloat(settings.C5) || parseFloat(defaultSettings.C5) || 20.3;
    const c6 = parseFloat(settings.C6) || parseFloat(defaultSettings.C6) || 12.2;
    const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
    const f5 = parseFloat(settings.F5) || parseFloat(defaultSettings.F5) || 109.3;
    const g5 = parseFloat(settings.G5) || parseFloat(defaultSettings.G5) || 6;
    const h5 = parseFloat(settings.H5) || parseFloat(defaultSettings.H5) || 1.524;
    const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;
    const h6 = parseFloat(settings.H6) || parseFloat(defaultSettings.H6) || 38;
    const j5 = parseFloat(settings.J5) || parseFloat(defaultSettings.J5) || 12;
    const k5 = parseFloat(settings.K5) || parseFloat(defaultSettings.K5) || 22;
    const j6 = parseFloat(settings.J6) || parseFloat(defaultSettings.J6) || 15;
    const k6 = parseFloat(settings.K6) || parseFloat(defaultSettings.K6) || 15;
    const m5 = parseFloat(settings.M5) || parseFloat(defaultSettings.M5) || 17;
    const n5 = parseFloat(settings.N5) || parseFloat(defaultSettings.N5) || 22;
    const m6 = parseFloat(settings.M6) || parseFloat(defaultSettings.M6) || 9;
    const n6 = parseFloat(settings.N6) || parseFloat(defaultSettings.N6) || 15;
    const o6 = parseFloat(settings.O6) || parseFloat(defaultSettings.O6) || 1.9;

    if (pageId === 'doubleplus') {
      const f8 = e10 * h5;
      const f15 = e10 + e10 / 100 * f5;
      const f17 = f15 + f15 / 100 * g5;
      const f21 = e10 + e10 / 100 * h6;
      const g8 = Math.round(f8 / 10) * 10 + g4;
      const g13 = f27;
      const g15 = Math.round(f15 / 10) * 10 + g4;
      const g17 = Math.round(f17 / 10) * 10 + g4;
      const g21 = Math.round(f21/ 10) * 10 + g4;
      const g25 = e10;
      const b8 = g8 + g8 / 100 * b5;
      const b15 = g15 + g15 / 100 * c5;
      const b21 = g21 + g21 / 100 * c6;

      const c8 = Math.round(b8 / 10) * 10 + g4;
      const c15 = Math.round(b15 / 10) * 10 + g4;
      const c17 = c15;
      const c21 = Math.round(b21 / 10) * 10 + g4;

      // Обновляем значения в DOM
      document.getElementById('c8-value').textContent = c8;
      document.getElementById('c15-value').textContent = c15;
      document.getElementById('c17-value').textContent = c17;
      document.getElementById('c21-value').textContent = c21;
    }

    else if (pageId === 'standart') {
      // Вычисляем значения для g8, g15, g17, g21
      const f8 = e10 * h5;
      const f15 = e10 + e10 / 100 * f5;
      const f17 = f15 + f15 / 100 * g5;
      const f21 = e10 + e10 / 100 * h6;

      const g8 = Math.round(f8 / 10) * 10 + g4;
      const g15 = Math.round(f15 / 10) * 10 + g4;
      const g17 = Math.round(f17 / 10) * 10 + g4;
      const g21 = Math.round(f21/ 10) * 10 + g4;
      const g25 = e10;

      // Обновляем значения в DOM
      document.getElementById('g8-value').textContent = g8;
      document.getElementById('g15-value').textContent = g15;
      document.getElementById('g17-value').textContent = g17;
      document.getElementById('g21-value').textContent = g21;
      document.getElementById('g25-value').textContent = g25;
    }

    else if (pageId === 'doubleminus') {
      const f8 = e10 * h5;
      const f15 = e10 + e10 / 100 * f5;
      const f17 = f15 + f15 / 100 * g5;
      const f21 = e10 + e10 / 100 * h6;

      const g8 = Math.round(f8 / 10) * 10 + g4;
      const g13 = f27;
      const g15 = Math.round(f15 / 10) * 10 + g4;
      const g17 = Math.round(f17 / 10) * 10 + g4;
      const g21 = Math.round(f21/ 10) * 10 + g4;
      const g25 = e10;
      const k8 = g8 - g8 / 100 * j5;
      const k13 = g13 - g13 / 100 * k5;
      const j13 = Math.round(k13 / 10) * 10;;
      const k15 = g15 - g15 / 100 * j6;
      const j17 = g17;
      const k21 = g21 - g21 / 100 * k6;
      const j25 = g25;
      const j27 = f27;
      const n13 = g13 - g13 / 100 * n5;
      const m13 = Math.round(n13 / 10) * 10;

      const j8 = Math.round(k8 / 10) * 10 + g4;
      const j15 = Math.round(k15 / 10) * 10 + g4;
      const j21 = Math.round(k21 / 10) * 10 + g4;

      // Обновляем значения в DOM
      document.getElementById('j8-value').textContent = j8;
      document.getElementById('j13-value').textContent = j13;
      document.getElementById('j15-value').textContent = j15;
      document.getElementById('j21-value').textContent = j21;
    }

    else if (pageId === 'ro') {
      const f8 = e10 * h5;
      const f15 = e10 + e10 / 100 * f5;
      const f17 = f15 + f15 / 100 * g5;
      const f21 = e10 + e10 / 100 * h6;

      const g8 = Math.round(f8 / 10) * 10 + g4;
      const g13 = f27;
      const g15 = Math.round(f15 / 10) * 10 + g4;
      const g17 = Math.round(f17 / 10) * 10 + g4;
      const g21 = Math.round(f21 / 10) * 10 + g4;
      const g25 = e10;

      const k8 = g8 - g8 / 100 * j5;
      const k13 = g13 - g13 / 100 * k5;
      const j13 = Math.round(k13) * 10;
      const k15 = g15 - g15 / 100 * j6;
      const j17 = g17;
      const k21 = g21 - g21 / 100 * k6;
      const j25 = g25;
      const j27 = f27;

      const j8 = Math.round(k8 / 10) * 10 + g4;
      const j15 = Math.round(k15 / 10) * 10 + g4;
      const j21 = Math.round(k21 / 10) * 10 + g4;

      const n8 = g8 - g8 / 100 * m5;
      const n7 = n8 > 2490 ? 2490 : n8;
      const n13 = g13 - g13 / 100 * n5;
      const m13 = Math.round(n13 / 10) * 10;
      const m8 = Math.round(n7 / 10) * 10 + g4;
      const p15 = m8 * o6;
      const o15 = j15 - j15 / 100 * m6;
      const n15 = Math.min(o15, p15);
      const m17 = g17;
      const n21 = j21 - j21 / 100 * n6;
      const m25 = g25;
      const m27 = f27;

      const m15 = Math.round(n15 / 10) * 10 + g4;
      const m21 = Math.round(n21 / 10) * 10 + g4;
      
      // Обновляем значения в DOM
      document.getElementById('m8-value').textContent = m8;
      document.getElementById('m13-value').textContent = m13;
      document.getElementById('m15-value').textContent = m15;
      document.getElementById('m21-value').textContent = m21;
    }
  });
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();

  const e10Input = document.getElementById('E10');
  const f10Input = document.getElementById('F10');

  if (!e10Input || !f10Input) {
    console.error('Input fields E10 or F10 not found');
    return;
  }

  // Обработчик изменений с debounce
  const handleInputChange = debounce((id, value) => {
    if (value && isNaN(parseFloat(value))) {
      console.warn(`Invalid value in ${id}: ${value}`);
      return;
    }
    saveFieldValue(id, value, () => {
      updateButtonState();
      sendFieldValues();
      updateCurrentPage();
    });
  }, 300);

  e10Input.addEventListener('input', () => {
    handleInputChange('E10', e10Input.value);
  });

  f10Input.addEventListener('input', () => {
    handleInputChange('F10', f10Input.value);
  });

  const allInputs = document.querySelectorAll('input[type="text"]');
  allInputs.forEach(input => {
    if (input.id !== 'E10' && input.id !== 'F10') {
      input.addEventListener('input', debounce(() => {
        if (input.value && isNaN(parseFloat(input.value))) {
          console.warn(`Invalid value in ${input.id}: ${input.value}`);
          return;
        }
        saveFieldValue(input.id, input.value, () => {
          updateButtonState();
          sendFieldValues();
          updateCurrentPage();
        });
      }, 300));
    }
  });

  function applyDoublePlusPrice() {
    chrome.storage.local.get(['settings'], (result) => {
        const settings = result.settings || {};
        const defaultSettings = {
            E10: '0',
            F10: '0',
            F27: '0',
            G4: '3',
            B5: '18.7',
            C5: '20.3',
            C6: '12.2',
            E5: '5.01',
            F5: '109.3',
            G5: '6',
            H5: '1.524',
            E6: '4.4125',
            H6: '38',
            J5: '12',
            K5: '22',
            J6: '15',
            K6: '15',
            M5: '17',
            N5: '22',
            M6: '9',
            N6: '15',
            O6: '1.9'
        };

        const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
        const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
        const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
        const g4 = parseFloat(settings.G4) || parseFloat(defaultSettings.G4) || 3;
        const b5 = parseFloat(settings.B5) || parseFloat(defaultSettings.B5) || 18.7;
        const c5 = parseFloat(settings.C5) || parseFloat(defaultSettings.C5) || 20.3;
        const c6 = parseFloat(settings.C6) || parseFloat(defaultSettings.C6) || 12.2;
        const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
        const f5 = parseFloat(settings.F5) || parseFloat(defaultSettings.F5) || 109.3;
        const g5 = parseFloat(settings.G5) || parseFloat(defaultSettings.G5) || 6;
        const h5 = parseFloat(settings.H5) || parseFloat(defaultSettings.H5) || 1.524;
        const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;
        const h6 = parseFloat(settings.H6) || parseFloat(defaultSettings.H6) || 38;
        const j5 = parseFloat(settings.J5) || parseFloat(defaultSettings.J5) || 12;
        const k5 = parseFloat(settings.K5) || parseFloat(defaultSettings.K5) || 22;
        const j6 = parseFloat(settings.J6) || parseFloat(defaultSettings.J6) || 15;
        const k6 = parseFloat(settings.K6) || parseFloat(defaultSettings.K6) || 15;
        const m5 = parseFloat(settings.M5) || parseFloat(defaultSettings.M5) || 17;
        const n5 = parseFloat(settings.N5) || parseFloat(defaultSettings.N5) || 22;
        const m6 = parseFloat(settings.M6) || parseFloat(defaultSettings.M6) || 9;
        const n6 = parseFloat(settings.N6) || parseFloat(defaultSettings.N6) || 15;
        const o6 = parseFloat(settings.O6) || parseFloat(defaultSettings.O6) || 1.9;

        const f8 = e10 * h5;
        const f15 = e10 + e10 / 100 * f5;
        const f17 = f15 + f15 / 100 * g5;
        const f21 = e10 + e10 / 100 * h6;
        const g8 = Math.round(f8 / 10) * 10 + g4;
        const g13 = f27;
        const g15 = Math.round(f15 / 10) * 10 + g4;
        const g17 = Math.round(f17 / 10) * 10 + g4;
        const g21 = Math.round(f21/ 10) * 10 + g4;
        const g25 = e10;
        const b8 = g8 + g8 / 100 * b5;
        const b15 = g15 + g15 / 100 * c5;
        const b21 = g21 + g21 / 100 * c6;

        const c8 = Math.round(b8 / 10) * 10 + g4;
        const c15 = Math.round(b15 / 10) * 10 + g4;
        const c17 = c15;
        const c21 = Math.round(b21 / 10) * 10 + g4;

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length > 0) {
              console.log('Sending messages to tab:', tabs[0].id); // Для отладки
              // Отправка значений в соответствующие поля
              chrome.tabs.sendMessage(tabs[0].id, {
                  action: 'fillMinPriceField',
                  value: c8.toString()
              }, (response) => {
                  console.log('Response for fillMinPriceField:', response);
              });
              chrome.tabs.sendMessage(tabs[0].id, {
                  action: 'fillOZPriceField',
                  value: c15.toString()
              }, (response) => {
                  console.log('Response for fillOZPriceField:', response);
              });
              chrome.tabs.sendMessage(tabs[0].id, {
                  action: 'fillOZOldPriceField',
                  value: c17.toString()
              }, (response) => {
                  console.log('Response for fillOZOldPriceField:', response);
              });
              chrome.tabs.sendMessage(tabs[0].id, {
                  action: 'fillShop5PriceField',
                  value: c21.toString()
              }, (response) => {
                  console.log('Response for fillShop5PriceField:', response);
              });
          } else {
              console.error('No active tab found');
          }
      });
  });
}

function applyStandartPrice() {
chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      G4: '3',
      B5: '18.7',
      C5: '20.3',
      C6: '12.2',
      E5: '5.01',
      F5: '109.3',
      G5: '6',
      H5: '1.524',
      E6: '4.4125',
      H6: '38',
      J5: '12',
      K5: '22',
      J6: '15',
      K6: '15',
      M5: '17',
      N5: '22',
      M6: '9',
      N6: '15',
      O6: '1.9'
    };

    // Извлекаем значения из хранилища или используем значения по умолчанию
    const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
    const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
    const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
    const g4 = parseFloat(settings.G4) || parseFloat(defaultSettings.G4) || 3;
    const b5 = parseFloat(settings.B5) || parseFloat(defaultSettings.B5) || 18.7;
    const c5 = parseFloat(settings.C5) || parseFloat(defaultSettings.C5) || 20.3;
    const c6 = parseFloat(settings.C6) || parseFloat(defaultSettings.C6) || 12.2;
    const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
    const f5 = parseFloat(settings.F5) || parseFloat(defaultSettings.F5) || 109.3;
    const g5 = parseFloat(settings.G5) || parseFloat(defaultSettings.G5) || 6;
    const h5 = parseFloat(settings.H5) || parseFloat(defaultSettings.H5) || 1.524;
    const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;
    const h6 = parseFloat(settings.H6) || parseFloat(defaultSettings.H6) || 38;
    const j5 = parseFloat(settings.J5) || parseFloat(defaultSettings.J5) || 12;
    const k5 = parseFloat(settings.K5) || parseFloat(defaultSettings.K5) || 22;
    const j6 = parseFloat(settings.J6) || parseFloat(defaultSettings.J6) || 15;
    const k6 = parseFloat(settings.K6) || parseFloat(defaultSettings.K6) || 15;
    const m5 = parseFloat(settings.M5) || parseFloat(defaultSettings.M5) || 17;
    const n5 = parseFloat(settings.N5) || parseFloat(defaultSettings.N5) || 22;
    const m6 = parseFloat(settings.M6) || parseFloat(defaultSettings.M6) || 9;
    const n6 = parseFloat(settings.N6) || parseFloat(defaultSettings.N6) || 15;
    const o6 = parseFloat(settings.O6) || parseFloat(defaultSettings.O6) || 1.9;

    // Вычисляем значения для g8, g15, g17, g21
    const f8 = e10 * h5;
    const f15 = e10 + e10 / 100 * f5;
    const f17 = f15 + f15 / 100 * g5;
    const f21 = e10 + e10 / 100 * h6;

    const g8 = Math.round(f8 / 10) * 10 + g4;
    const g15 = Math.round(f15 / 10) * 10 + g4;
    const g17 = Math.round(f17 / 10) * 10 + g4;
    const g21 = Math.round(f21/ 10) * 10 + g4;
    const g25 = e10;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
          console.log('Sending messages to tab:', tabs[0].id); // Для отладки
          // Отправка значений в соответствующие поля
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'standartFillMinPriceField',
              value: g8.toString()
          }, (response) => {
              console.log('Response for standartFillMinPriceField:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'standartfillOZField',
              value: g15.toString()
          }, (response) => {
              console.log('Response for standartfillOZField:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'standartfillOldOZField',
              value: g17.toString()
          }, (response) => {
              console.log('Response for standartfillOldOZField:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'standartfillShop5Field',
              value: g21.toString()
          }, (response) => {
              console.log('Response for standartfillShop5Field:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'standartfillMarkField',
              value: g25.toString()
          }, (response) => {
              console.log('Response for standartfillMarkField:', response);
          });
      } else {
          console.error('No active tab found');
      }
  });

  });
}

function applyDoubleMinusPrice() {
 chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      G4: '3',
      B5: '18.7',
      C5: '20.3',
      C6: '12.2',
      E5: '5.01',
      F5: '109.3',
      G5: '6',
      H5: '1.524',
      E6: '4.4125',
      H6: '38',
      J5: '12',
      K5: '22',
      J6: '15',
      K6: '15',
      M5: '17',
      N5: '22',
      M6: '9',
      N6: '15',
      O6: '1.9'
    };

    // Извлекаем значения из хранилища или используем значения по умолчанию
    const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
    const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
    const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
    const g4 = parseFloat(settings.G4) || parseFloat(defaultSettings.G4) || 3;
    const b5 = parseFloat(settings.B5) || parseFloat(defaultSettings.B5) || 18.7;
    const c5 = parseFloat(settings.C5) || parseFloat(defaultSettings.C5) || 20.3;
    const c6 = parseFloat(settings.C6) || parseFloat(defaultSettings.C6) || 12.2;
    const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
    const f5 = parseFloat(settings.F5) || parseFloat(defaultSettings.F5) || 109.3;
    const g5 = parseFloat(settings.G5) || parseFloat(defaultSettings.G5) || 6;
    const h5 = parseFloat(settings.H5) || parseFloat(defaultSettings.H5) || 1.524;
    const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;
    const h6 = parseFloat(settings.H6) || parseFloat(defaultSettings.H6) || 38;
    const j5 = parseFloat(settings.J5) || parseFloat(defaultSettings.J5) || 12;
    const k5 = parseFloat(settings.K5) || parseFloat(defaultSettings.K5) || 22;
    const j6 = parseFloat(settings.J6) || parseFloat(defaultSettings.J6) || 15;
    const k6 = parseFloat(settings.K6) || parseFloat(defaultSettings.K6) || 15;
    const m5 = parseFloat(settings.M5) || parseFloat(defaultSettings.M5) || 17;
    const n5 = parseFloat(settings.N5) || parseFloat(defaultSettings.N5) || 22;
    const m6 = parseFloat(settings.M6) || parseFloat(defaultSettings.M6) || 9;
    const n6 = parseFloat(settings.N6) || parseFloat(defaultSettings.N6) || 15;
    const o6 = parseFloat(settings.O6) || parseFloat(defaultSettings.O6) || 1.9;

    const f8 = e10 * h5;
    const f15 = e10 + e10 / 100 * f5;
    const f17 = f15 + f15 / 100 * g5;
    const f21 = e10 + e10 / 100 * h6;

    const g8 = Math.round(f8 / 10) * 10 + g4;
    const g13 = f27;
    const g15 = Math.round(f15 / 10) * 10 + g4;
    const g17 = Math.round(f17 / 10) * 10 + g4;
    const g21 = Math.round(f21/ 10) * 10 + g4;
    const g25 = e10;
    const k8 = g8 - g8 / 100 * j5;
    const k13 = g13 - g13 / 100 * k5;
    const k15 = g15 - g15 / 100 * j6;
    const j17 = g17;
    const k21 = g21 - g21 / 100 * k6;
    const j25 = g25;
    const j27 = f27;
    const n13 = g13 - g13 / 100 * n5;
    const m13 = Math.round(n13 / 10) * 10;

    const j8 = Math.round(k8 / 10) * 10 + g4;
    const j13 = Math.round(k13 / 10) * 10;
    const j15 = Math.round(k15 / 10) * 10 + g4;
    const j21 = Math.round(k21 / 10) * 10 + g4;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
          console.log('Sending messages to tab:', tabs[0].id); // Для отладки
          // Отправка значений в соответствующие поля
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'doubleminusFillMinPriceField',
              value: j8.toString()
          }, (response) => {
              console.log('Response for doubleminusFillMinPriceField:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'doubleminusFillPriceField',
              value: j13.toString()
          }, (response) => {
              console.log('Response for doubleminusFillPriceField:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'doubleminusfillOZField',
              value: j15.toString()
          }, (response) => {
              console.log('Response for doubleminusfillOZField:', response);
          });
          chrome.tabs.sendMessage(tabs[0].id, {
              action: 'doubleminusfillShop5Field',
              value: j21.toString()
          }, (response) => {
              console.log('Response for doubleminusfillShop5Field:', response);
          });
      } else {
          console.error('No active tab found');
      }
  });

  });
}

function applyRoPrice() {
chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const defaultSettings = {
      E10: '0',
      F10: '0',
      F27: '0',
      G4: '3',
      B5: '18.7',
      C5: '20.3',
      C6: '12.2',
      E5: '5.01',
      F5: '109.3',
      G5: '6',
      H5: '1.524',
      E6: '4.4125',
      H6: '38',
      J5: '12',
      K5: '22',
      J6: '15',
      K6: '15',
      M5: '17',
      N5: '22',
      M6: '9',
      N6: '15',
      O6: '1.9'
    };

    // Извлекаем значения из хранилища или используем значения по умолчанию
    const e10 = parseFloat(settings.E10) || parseFloat(defaultSettings.E10) || 0;
    const f10 = parseFloat(settings.F10) || parseFloat(defaultSettings.F10) || 0;
    const f27 = parseFloat(settings.F27) || parseFloat(defaultSettings.F27) || 0;
    const g4 = parseFloat(settings.G4) || parseFloat(defaultSettings.G4) || 3;
    const b5 = parseFloat(settings.B5) || parseFloat(defaultSettings.B5) || 18.7;
    const c5 = parseFloat(settings.C5) || parseFloat(defaultSettings.C5) || 20.3;
    const c6 = parseFloat(settings.C6) || parseFloat(defaultSettings.C6) || 12.2;
    const e5 = parseFloat(settings.E5) || parseFloat(defaultSettings.E5) || 5.01;
    const f5 = parseFloat(settings.F5) || parseFloat(defaultSettings.F5) || 109.3;
    const g5 = parseFloat(settings.G5) || parseFloat(defaultSettings.G5) || 6;
    const h5 = parseFloat(settings.H5) || parseFloat(defaultSettings.H5) || 1.524;
    const e6 = parseFloat(settings.E6) || parseFloat(defaultSettings.E6) || 4.4125;
    const h6 = parseFloat(settings.H6) || parseFloat(defaultSettings.H6) || 38;
    const j5 = parseFloat(settings.J5) || parseFloat(defaultSettings.J5) || 12;
    const k5 = parseFloat(settings.K5) || parseFloat(defaultSettings.K5) || 22;
    const j6 = parseFloat(settings.J6) || parseFloat(defaultSettings.J6) || 15;
    const k6 = parseFloat(settings.K6) || parseFloat(defaultSettings.K6) || 15;
    const m5 = parseFloat(settings.M5) || parseFloat(defaultSettings.M5) || 17;
    const n5 = parseFloat(settings.N5) || parseFloat(defaultSettings.N5) || 22;
    const m6 = parseFloat(settings.M6) || parseFloat(defaultSettings.M6) || 9;
    const n6 = parseFloat(settings.N6) || parseFloat(defaultSettings.N6) || 15;
    const o6 = parseFloat(settings.O6) || parseFloat(defaultSettings.O6) || 1.9;

    const f8 = e10 * h5;
    const f15 = e10 + e10 / 100 * f5;
    const f17 = f15 + f15 / 100 * g5;
    const f21 = e10 + e10 / 100 * h6;

    const g8 = Math.round(f8 / 10) * 10 + g4;
    const g13 = f27;
    const g15 = Math.round(f15 / 10) * 10 + g4;
    const g17 = Math.round(f17 / 10) * 10 + g4;
    const g21 = Math.round(f21 / 10) * 10 + g4;
    const g25 = e10;

    const k8 = g8 - g8 / 100 * j5;
    const k13 = g13 - g13 / 100 * k5;
    const j13 = Math.round(k13) * 10;
    const k15 = g15 - g15 / 100 * j6;
    const j17 = g17;
    const k21 = g21 - g21 / 100 * k6;
    const j25 = g25;
    const j27 = f27;

    const j8 = Math.round(k8 / 10) * 10 + g4;
    const j15 = Math.round(k15 / 10) * 10 + g4;
    const j21 = Math.round(k21 / 10) * 10 + g4;

    const n8 = g8 - g8 / 100 * m5;
    const n7 = n8 > 2490 ? 2490 : n8;
    const n13 = g13 - g13 / 100 * n5;
    const m13 = Math.round(n13 / 10) * 10;
    const m8 = Math.round(n7 / 10) * 10 + g4;
    const p15 = m8 * o6;
    const o15 = j15 - j15 / 100 * m6;
    const n15 = Math.min(o15, p15);
    const m17 = g17;
    const n21 = j21 - j21 / 100 * n6;
    const m25 = g25;
    const m27 = f27;

    const m15 = Math.round(n15 / 10) * 10 + g4;
    const m21 = Math.round(n21 / 10) * 10 + g4;
    
    
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
            console.log('Sending messages to tab:', tabs[0].id); // Для отладки
            // Отправка значений в соответствующие поля
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'roFillMinPriceField',
                value: m8.toString()
            }, (response) => {
                console.log('Response for roFillMinPriceField:', response);
            });
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'roFillPriceField',
                value: m13.toString()
            }, (response) => {
                console.log('Response for roFillPriceField:', response);
            });
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'rofillOZField',
                value: m15.toString()
            }, (response) => {
                console.log('Response for rofillOZField:', response);
            });
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'rofillShop5Field',
                value: m21.toString()
            }, (response) => {
                console.log('Response for rofillShop5Field:', response);
            });
        } else {
            console.error('No active tab found');
        }
    });

  });
}

  // Обработчики кнопок
  const buttonActions = {
    'doubleplus-btn': () => { showPage('doubleplus'); sendFieldValues(); },
    'standart-btn': () => { showPage('standart'); sendFieldValues(); },
    'doubleminus-btn': () => { showPage('doubleminus'); sendFieldValues(); },
    'ro-btn': () => { showPage('ro'); sendFieldValues(); },
    'settings-btn': () => showPage('settings'),
    'settings-back-btn': () => showPage('main-menu'),
    'doubleplus-back-btn': () => showPage('main-menu'),
    'standart-back-btn': () => showPage('main-menu'),
    'doubleminus-back-btn': () => showPage('main-menu'),
    'ro-back-btn': () => showPage('main-menu'),
    'doubleplus-apply-btn': applyDoublePlusPrice,
    'standart-apply-btn': applyStandartPrice,
    'doubleminus-apply-btn': applyDoubleMinusPrice,
    'ro-apply-btn': applyRoPrice
  };

  Object.keys(buttonActions).forEach(buttonId => {
    const button = document.getElementById(buttonId);
    if (button) {
      button.addEventListener('click', buttonActions[buttonId]);
    } else {
      console.warn(`Button with ID ${buttonId} not found`);
    }
  });
});