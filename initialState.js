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

    // Стандарт
    const f8 = e10 * h5;
    const e9 = f10 * e5;
    const g13 = f27;
    const f15 = e10 + e10 / 100 * f5;
    const f17 = f15 + f15 / 100 * g5;
    const f21 = e10 + e10 / 100 * h6;

    const g25 = e10;
    const h27 = f10 * e6;

    // Стандарт выход
    const g8 = Math.round(f8) * 10 + Number(g4);
    const g15 = Math.round(f15) * 10 + g4;
    const g17 = Math.round(f17) * 10 + g4;
    const g21 = Math.round(f21) * 10 + g4;

    // Два плюса
    const b8 = g8 + g8 / 100 * b5;
    const b13 = g13;
    const b15 = g15 + g15 / 100 * c5;
    const b21 = g21 + g21 / 100 * c6;
    const b25 = g25;

    // Два плюса выход
    const c8 = Math.round(b8) * 10 + g4;
    const c15 = Math.round(b15) * 10 + g4;
    const c17 = c15;
    const c21 = Math.round(b21) * 10 + g4;

    // Перекос и два минуса
    const k8 = g8 - g8 / 100 * j5;
    const k13 = g13 - g13 / 100 * k5;
    const j13 = Math.round(k13) * 10;
    const k15 = g15 - g15 / 100 * j6;
    const j17 = g17;
    const k21 = g21 - g21 / 100 * k6;
    const j25 = g25;
    const j27 = f27;

    // Перекос и два минуса выход
    const j8 = Math.round(k8) * 10 + g4;
    const j15 = Math.round(k15) * 10 + g4;
    const j21 = Math.round(k15) * 10 + g4;

    // Ромашка и RO
    const n8 = g8 - g8 / 100 * m5;
    const n7 = n8 > 2490 ? 2490 : n8;
    const n13 = g13 - g13 / 100 * n5;
    const m13 = Math.round(n13) * 10;
    const p15 = m8 * o6;
    const o15 = j15 - j15 / 100 * m6;
    const n15 = Math.min(o15, p15);
    const m17 = g17;
    const n21 = j21 - j21 / 100 * n6;
    const m25 = g25;
    const m27 = f27;

    // Ромашка и RO выход
    const m8 = Math.round(n7) * 10 + g4;
    const m15 = Math.round(n15) * 10 + g4;
    const m21 = Math.round(n21) * 10 + g4;

    // Инфо выход
    const e28 = f10 * 4.7;
    const e29 = f10 * 5;
    const e30 = f10 * 5.4;

    const g14 = g15 / g8;
    const c14 = c15 / c8;
    const j14 = j15 / j8;
    const m14 = m15 / m8;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
      });
    });
  });
}

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

function showPage(pageId) {
  console.log('Switching to page:', pageId); // Для отладки
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageId).classList.add('active');

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

// Сохранение значения поля при изменении
function saveFieldValue(fieldId, value) {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    settings[fieldId] = value;
    chrome.storage.local.set({ settings }, () => {
      console.log(`Saved ${fieldId}: ${value}`);
    });
  });
}

// Загрузка значений из хранилища при открытии popup
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

    // Заполняем поля значениями из хранилища или значениями по умолчанию
    Object.keys(defaultSettings).forEach((fieldId) => {
      const input = document.getElementById(fieldId);
      if (input) {
        input.value = settings[fieldId] !== undefined ? settings[fieldId] : defaultSettings[fieldId];
      }
    });
  });
}

// Пример функции sendFieldValues, использующей значения из хранилища
function sendFieldValues() {
  chrome.storage.local.get(['settings'], (result) => {
    const settings = result.settings || {};
    const e10 = parseFloat(settings.E10) || 0;
    const f10 = parseFloat(settings.F10) || 0;
    const f27 = parseFloat(settings.F27) || 0;
    const doubleplusInputs = [
      parseFloat(settings.B5) || 0,
      parseFloat(settings.C5) || 0,
      parseFloat(settings.C6) || 0
    ];
    const standartInputs = [
      parseFloat(settings.E5) || 0,
      parseFloat(settings.F5) || 0,
      parseFloat(settings.G5) || 0,
      parseFloat(settings.H5) || 0,
      parseFloat(settings.E6) || 0,
      parseFloat(settings.H6) || 0
    ];
    const doubleminusInputs = [
      parseFloat(settings.J5) || 0,
      parseFloat(settings.K5) || 0,
      parseFloat(settings.J6) || 0,
      parseFloat(settings.K6) || 0
    ];
    const roInputs = [
      parseFloat(settings.M5) || 0,
      parseFloat(settings.N5) || 0,
      parseFloat(settings.M6) || 0,
      parseFloat(settings.N6) || 0,
      parseFloat(settings.O6) || 0
    ];
    const rounding = parseFloat(settings.G4) || 3;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "fillFields",
        values: {
          e10, f10, f27,
          doubleplus: doubleplusInputs,
          standart: standartInputs,
          doubleminus: doubleminusInputs,
          ro: roInputs,
          rounding
        }
      });
    });
  });
}

// Добавляем обработчики событий для всех полей ввода
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      saveFieldValue(input.id, input.value);
    });
  });

  // Привязка обработчиков к кнопкам
  document.getElementById('doubleplus-btn').addEventListener('click', () => {
    showPage('doubleplus');
    sendFieldValues();
  });

  document.getElementById('standart-btn').addEventListener('click', () => {
    showPage('standart');
    sendFieldValues();
  });

  document.getElementById('doubleminus-btn').addEventListener('click', () => {
    showPage('doubleminus');
    sendFieldValues();
  });

  document.getElementById('ro-btn').addEventListener('click', () => {
    showPage('ro');
    sendFieldValues();
  });

  document.getElementById('settings-btn').addEventListener('click', () => {
    showPage('settings');
  });

  document.getElementById('settings-back-btn').addEventListener('click', () => {
    showPage('main-menu');
  });

  document.getElementById('doubleplus-back-btn').addEventListener('click', () => {
    showPage('main-menu');
  });

  document.getElementById('standart-back-btn').addEventListener('click', () => {
    showPage('main-menu');
  });

  document.getElementById('doubleminus-back-btn').addEventListener('click', () => {
    showPage('main-menu');
  });

  document.getElementById('ro-back-btn').addEventListener('click', () => {
    showPage('main-menu');
  });

  // Обработчик для кнопки "Заполнить"
  document.getElementById('doubleplus-apply-btn').addEventListener('click', () => {
    applyDoublePlusPrice();
  });

  document.getElementById('standart-apply-btn').addEventListener('click', () => {
    applyStandartPrice();
  });

  document.getElementById('doubleminus-apply-btn').addEventListener('click', () => {
    applyDoubleMinusPrice();
  });

  document.getElementById('ro-apply-btn').addEventListener('click', () => {
    applyRoPrice();
  });

});
