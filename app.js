
const categories = {
  tights: {
    title: "Колготки",
    items: [
      { name: "Чёрные", color: "#17131d" },
      { name: "Белые", color: "#f4edf2" },
      { name: "Телесные", color: "#d8a58d" },
      { name: "Розовые", color: "#ed91c5" },
      { name: "Бордовые", color: "#781e43" },
      { name: "Серые", color: "#89838e" }
    ]
  },
  socks: {
    title: "Носки",
    items: [
      { name: "Белые", color: "#fff7fa" },
      { name: "Чёрные", color: "#17131d" },
      { name: "Розовые", color: "#f28bc5" },
      { name: "Голубые", color: "#80c7ed" },
      { name: "Фиолетовые", color: "#9360c7" },
      { name: "Красные", color: "#d63a50" }
    ]
  },
  stockings: {
    title: "Чулки",
    items: [
      { name: "Чёрные", color: "#211323" },
      { name: "Белые", color: "#fff6fa" },
      { name: "Красные", color: "#bb234a" },
      { name: "Серые", color: "#918b99" },
      { name: "Синие", color: "#344fa8" },
      { name: "Золотые", color: "#d9ad56" }
    ]
  },
  tops: {
    title: "Верх",
    items: [
      { name: "Королевский", color: "#762b64" },
      { name: "Розовый", color: "#ef83bd" },
      { name: "Белый", color: "#fff5f5" },
      { name: "Чёрный", color: "#211923" },
      { name: "Голубой", color: "#6db7e4" },
      { name: "Красный", color: "#bd2946" }
    ]
  },
  skirts: {
    title: "Юбки",
    items: [
      { name: "Бордовая", color: "#791d42" },
      { name: "Розовая", color: "#ed8cc4" },
      { name: "Чёрная", color: "#201923" },
      { name: "Золотая", color: "#c99b47" },
      { name: "Белая", color: "#fff5f5" },
      { name: "Синяя", color: "#364da4" }
    ]
  },
  shoes: {
    title: "Обувь",
    items: [
      { name: "Чёрные", color: "#201820" },
      { name: "Красные", color: "#bd2946" },
      { name: "Золотые", color: "#d8ad58" },
      { name: "Белые", color: "#fff5f5" },
      { name: "Розовые", color: "#ed8cc4" },
      { name: "Синие", color: "#344fa8" }
    ]
  }
};

const state = {
  category: "tights",
  selected: {},
  look: 1
};

const itemsEl = document.getElementById("items");
const categoryTitle = document.getElementById("categoryTitle");
const statusEl = document.getElementById("status");
const lookLabel = document.getElementById("lookLabel");
const stage = document.querySelector(".stage");

function renderItems() {
  const category = categories[state.category];

  categoryTitle.textContent = category.title;
  itemsEl.replaceChildren();

  category.items.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "item";

    if (state.selected[state.category] === index) {
      button.classList.add("selected");
    }

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = item.color;

    const name = document.createElement("span");
    name.textContent = item.name;

    button.append(swatch, name);

    button.addEventListener("click", () => {
      state.selected[state.category] = index;
      state.look++;
      lookLabel.textContent = `Образ № ${state.look}`;
      renderItems();

      statusEl.textContent =
        `${category.title}: ${item.name}. Выбор сохранён в текущем образе.`;
    });

    itemsEl.appendChild(button);
  });

  document.querySelectorAll("[data-category]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === state.category
    );
  });
}

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    state.category = button.dataset.category;
    renderItems();
    statusEl.textContent = `Выбрана категория: ${categories[state.category].title}`;
  });
});

document.getElementById("randomBtn").addEventListener("click", () => {
  Object.keys(categories).forEach(key => {
    state.selected[key] = Math.floor(
      Math.random() * categories[key].items.length
    );
  });

  state.category = "tights";
  state.look++;
  lookLabel.textContent = `Образ № ${state.look}`;
  renderItems();
  statusEl.textContent = "Новый случайный образ выбран!";
});

document.getElementById("saveBtn").addEventListener("click", () => {
  try {
    localStorage.setItem("royalWardrobeSave", JSON.stringify(state));
    statusEl.textContent = "Образ сохранён на этом устройстве!";
  } catch (error) {
    statusEl.textContent = "Не удалось сохранить образ в браузере.";
  }
});

document.getElementById("poseBtn").addEventListener("click", () => {
  stage.classList.toggle("pose");
  statusEl.textContent = stage.classList.contains("pose")
    ? "Эффект позы включён."
    : "Эффект позы выключен.";
});

document.getElementById("animationBtn").addEventListener("click", () => {
  stage.classList.toggle("moving");
  statusEl.textContent = stage.classList.contains("moving")
    ? "Анимация включена."
    : "Анимация выключена.";
});

try {
  const saved = localStorage.getItem("royalWardrobeSave");

  if (saved) {
    const parsed = JSON.parse(saved);

    if (parsed && parsed.selected && categories[parsed.category]) {
      Object.assign(state, parsed);
    }
  }
} catch (error) {
  // Игра продолжит работать, даже если сохранение недоступно.
}

renderItems();
