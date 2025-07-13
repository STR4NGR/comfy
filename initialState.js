function sendFieldValues() {
    const g4 = 3;

    const e10 = document.getElementById("E10").value;
    const f10 = document.getElementById("F10").value;
    const f27 = document.getElementById("F27").value;

    // Стандарт
    const e5 = 5.01;
    const e6 = 4.4125;
    const f5 = 109.3;
    const g5 = 6;
    const h5 = 1.524;
    const h6 = 38;

    const f8 = e10 * h5;
    const e9 = f10 * e5;
    const g13 = f27;
    const f15 = e10 + e10/100 * f5;
    const f17 = f15 + f15/100 * g5;
    const f21 = e10 + e10/100 * h6;
    
    const g25 = e10;
    const g14 = g15 / g8;
    const h27 = f10 * e6;

    // Стандарт выход
    const g8 = Math.round(f8, 10) * 10 + g4;
    const g15 = Math.round(f15, 10) * 10 + g4;
    const g17 = Math.round(f17, 10) * 10 + g4;
    const g21 = Math.round(f21, 10) * 10 + g4;

    // Два плюса
    const b5 = 18.7;
    const c5 = 20.3;
    const c6 = 12.2;
    
    const b8 = g8 + g8/100 * b5;
    const b13 = g13;
    const b15 = g15 + g15/100 * c5;
    const c14 = c15 / c8;
    const b21 = g21 + g21 / 100 * c6;
    const b25 = g25;

    // Два плюса выход
    const c8 = Math.round(b8, 10) * 10 + g4;
    const c15 = Math.round(b15, 10) * 10 + g4;
    const c17 = c15;
    const c21 = Math.round(b21, 10) * 10 + g4;

    // Перекос и два минуса
    const j5 = 12;
    const k5 = 22;
    const j6 = 15;
    const k6 = 15;

    const k8 = g8 - g8 / 100 * j5;
    const k13 = g13 - g13 / 100 * k5;
    const j13 = Math.round(k13, 10) * 10;
    const k15 = g15 - g15 / 100 * j6;
    const j17 = g17;
    const k21 = g21 - g21 / 100 * k6;
    const j25 = g25;
    const j27 = f27;
    const j14 = j15 / j8;

    // Перекос и два минуса выход
    const j8 = Math.round(k8, 10) * 10 + g4;
    const j15 = Math.round(k15, 10) * 10 + g4;
    const j21 = Math.round(k15, 10) * 10 + 2;

    // Ромашка и RO
    const m5 = 17;
    const n5 = 22;
    const m6 = 9;
    const n6 = 15;
    const o6 = 1.9;

    const n7 = n8 > 2490 ? 2490 : n8;
    const n8 = g8 - g8 / 100 * m5;
    const n13 = g13 - g13 / 100 * n5;
    const m13 = Math.round(n13, 10) * 10;
    const m14 = m15 / m8;
    const p15 = m8 * o6;
    const o15 = j15 - j15 / 100 * m6;
    const n15 = Math.min(o15, p15);
    const m17 = g17;
    const n21 = j21 - j21 / 100 * n6;
    const m25 = g25;
    const m27 = f27;

    // Ромашка и RO выход
    const m8 = Math.round(n7, 10) * 10 + g4;
    const m15 = Math.round(n15, 10) * 10 + g4;
    const m21 = Math.round(n21, 10) * 10 + g4;

    // Инфо выход
    const e28 = f10 * 4.7;
    const e29 = f10 * 5;
    const e30 = f10 * 5.4;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: "fillFields",
      values: { e10, f10, f27 }
    });
  });
}

// Обработчик для кнопки "Настройки"
document.getElementById("settings").addEventListener("click", () => {
    window.open(chrome.runtime.getURL("settings.html"), "_blank");
});

// Обработчик для кнопки "Два плюса"
document.getElementById("doubleplus").addEventListener("click", () => {
    window.open(chrome.runtime.getURL("doubleplus.html"), "_blank");
    sendFieldValues(); // Сохраняем вызов существующей функции
});