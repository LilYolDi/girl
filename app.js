
const catalog = {
  tights: {
    title: "Колготки",
    items: [
      { name: "Чёрные", color: "#17131d" },
      { name: "Бежевые", color: "#d8b091" },
      { name: "Белые", color: "#f4edf5" },
      { name: "В горошек", color: "#35212c" },
      { name: "Сетка", color: "#6e5265" },
      { name: "Глянцевые", color: "#211923" },
      { name: "Графитовые", color: "#55505f" },
      { name: "Серые", color: "#a5a0ad" },
      { name: "Бордовые", color: "#741e3b" }
    ]
  },
  socks: {
    title: "Носки",
    items: [
      { name: "Белые", color: "#f7f3f7" },
      { name: "Чёрные", color: "#19151d" },
      { name: "Розовые", color: "#ee9dc9" },
      { name: "Полосатые", color: "#f1c7e6" },
      { name: "Серые", color: "#9895a5" },
      { name: "Бордовые", color: "#762342" },
      { name: "Гольфы", color: "#eee6ef" },
      { name: "Спортивные", color: "#24202b" },
      { name: "Пушистые", color: "#f8e7f5" }
    ]
  },
  stockings: {
    title: "Чулки",
    items: [
      { name: "Чёрные", color: "#211723" },
      { name: "Бежевые", color: "#d6ad91" },
      { name: "Белые", color: "#f6edf6" },
      { name: "С кружевом", color: "#3c243b" },
      { name: "Красные", color: "#a12b4d" },
      { name: "Сетка", color: "#75536c" },
      { name: "Серые", color: "#8d8797" },
      { name: "Розовые", color: "#efadd5" },
      { name: "Фиолетовые", color: "#7441a3" }
    ]
  },
  tops: {
    title: "Верх одежды",
    items: [
      { name: "Чёрный", color: "#28202d" },
      { name: "Белый", color: "#f2eaf2" },
      { name: "Красный", color: "#a42c4c" },
      { name: "Розовый", color: "#df81ca" },
      { name: "Фиолетовый", color: "#713a91" },
      { name: "Золотой", color: "#c69a47" },
      { name: "Синий", color: "#344d9b" },
      { name: "Изумрудный", color: "#28795e" },
      { name: "Бордовый", color: "#69213d" }
    ]
  },
  skirts: {
    title: "Юбки и платья",
    items: [
      { name: "Королевская", color: "#642447" },
      { name: "Чёрная", color: "#211923" },
      { name: "Белая", color: "#eee6ef" },
      { name: "Красная", color: "#a52a49" },
      { name: "Розовая", color: "#df8acb" },
      { name: "Золотая", color: "#b98b3f" },
      { name: "Синяя", color: "#344c8b" },
      { name: "Изумрудная", color: "#246a50" },
      { name: "Фиолетовая", color: "#713b91" }
    ]
  }
};

const defaults = {
  tights: 0,
  socks: -1,
  stockings: -1,
  tops: 0,
  skirts: 0
};

let selected = { ...defaults };
let category = "tights";
let pose = 0;

const $ = id => document.getElementById(id);

function message(text) {
  $("status").textContent = text;
}

function renderItems() {
  const data = catalog[category];

  $("categoryTitle").textContent = data.title;
  $("itemCount").textContent = data.items.length + " вариантов";

  $("items").innerHTML = data.items.map((item, index) => `
    <button class="item ${selected[category] === index ? "selected" : ""}"
      data-index="${index}" aria-pressed="${selected[category] === index}">
      <span class="check">✓</span>
      <span class="swatch">
        <span class="swatch-shape" style="--swatch:${item.color}"></span>
      </span>
      <span class="item-name">${item.name}</span>
    </button>
  `).join("");

  document.querySelectorAll(".item").forEach(button => {
    button.addEventListener("click", () => {
      selected[category] = Number(button.dataset.index);
      applyLook();
      renderItems();
      message("Выбрано: " + data.items[selected[category]].name);
    });
  });
}

function applyLook() {
  const tights = catalog.tights.items[selected.tights];
  const socks = catalog.socks.items[selected.socks];
  const stockings = catalog.stockings.items[selected.stockings];
  const top = catalog.tops.items[selected.tops];
  const skirt = catalog.skirts.items[selected.skirts];

  document.querySelectorAll(".stocking").forEach(el => {
    el.style.background = "transparent";
    el.style.backgroundImage = "none";
    el.style.opacity = "1";
    el.style.height = "100%";
    el.style.top = "0";
  });

  if (selected.tights >= 0 && tights) {
    document.querySelectorAll(".stocking").forEach(el => {
      el.style.background = tights.color;
      el.style.opacity = ".94";
    });
  }

  if (selected.stockings >= 0 && stockings) {
    document.querySelectorAll(".stocking").forEach(el => {
      el.style.background = stockings.color;
      el.style.height = "65%";
      el.style.top = "0";
    });
  }

  if (selected.socks >= 0 && socks) {
    document.querySelectorAll(".stocking").forEach(el => {
      el.style.background = socks.color;
      el.style.height = "35%";
      el.style.top = "65%";
    });
  }

  $("topClothes").style.background = top.color;
  $("skirt").style.background = skirt.color;

  const labels = [
    tights.name,
    socks ? socks.name + " носки" : "",
    stockings ? stockings.name + " чулки" : "",
    top.name + " верх",
    skirt.name
  ].filter(Boolean);

  $("lookName").textContent = "Образ: " + labels.slice(0, 2).join(" · ");
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    category = button.dataset.category;

    document.querySelectorAll(".category").forEach(el => {
      el.classList.toggle("active", el === button);
    });

    renderItems();
    message("");
  });
});

$("animateBtn").addEventListener("click", () => {
  $("character").classList.toggle("dancing");
  message(
    $("character").classList.contains("dancing")
      ? "Анимация включена"
      : "Анимация выключена"
  );
});

$("poseBtn").addEventListener("click", () => {
  pose = 1 - pose;
  $("character").classList.toggle("pose-two", pose === 1);
  $("poseBtn").textContent = pose ? "♡ Поза 2" : "♡ Поза";
});

$("resetBtn").addEventListener("click", () => {
  selected = { ...defaults };
  $("character").classList.remove("dancing", "pose-two");
  pose = 0;
  $("poseBtn").textContent = "♡ Поза";
  applyLook();
  renderItems();
  message("Начальный образ восстановлен");
});

$("randomBtn").addEventListener("click", () => {
  Object.keys(catalog).forEach(key => {
    selected[key] = Math.floor(Math.random() * catalog[key].items.length);
  });
  applyLook();
  renderItems();
  message("Новый случайный образ готов!");
});

$("saveBtn").addEventListener("click", () => {
  try {
    localStorage.setItem("royalStyleLook", JSON.stringify(selected));
    message("✓ Образ сохранён на этом устройстве");
  } catch {
    message("Не удалось сохранить образ в браузере");
  }
});

$("soundBtn").addEventListener("click", () => {
  message("Звуковые эффекты пока не подключены");
});

// Восстанавливаем сохранённый образ при следующем запуске.
try {
  const saved = JSON.parse(localStorage.getItem("royalStyleLook"));
  if (saved && typeof saved === "object") {
    Object.keys(catalog).forEach(key => {
      const value = saved[key];
      if (Number.isInteger(value) &&
          value >= -1 && value < catalog[key].items.length) {
        selected[key] = value;
      }
    });
  }
} catch {
  selected = { ...defaults };
}

applyLook();
renderItems();
