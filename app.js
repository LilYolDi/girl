
const categories = {
  tights: {
    title: "Колготки",
    items: [
      { name: "Чёрные", file: "tights-black.png", color: "#211923" },
      { name: "Белые", file: "tights-white.png", color: "#f8f0f5" },
      { name: "Розовые", file: "tights-pink.png", color: "#e88dbb" },
      { name: "Телесные", file: "tights-nude.png", color: "#d9ad99" }
    ]
  },
  socks: {
    title: "Носки",
    items: [
      { name: "Белые", file: "socks-white.png", color: "#fff7fa" },
      { name: "Чёрные", file: "socks-black.png", color: "#211923" },
      { name: "Розовые", file: "socks-pink.png", color: "#e88dbb" }
    ]
  },
  stockings: {
    title: "Чулки",
    items: [
      { name: "Чёрные", file: "stockings-black.png", color: "#211923" },
      { name: "Белые", file: "stockings-white.png", color: "#fff7fa" },
      { name: "Красные", file: "stockings-red.png", color: "#bd2946" }
    ]
  }
};

const state = {
  category: "tights",
  selected: {}
};

const stage = document.querySelector(".stage");
const itemsEl = document.getElementById("items");
const titleEl = document.getElementById("categoryTitle");
const statusEl = document.getElementById("status");

let clothingLayer = document.getElementById("clothingLayer");

if (!clothingLayer) {
  clothingLayer = document.createElement("img");
  clothingLayer.id = "clothingLayer";
  clothingLayer.alt = "Выбранная одежда";
  clothingLayer.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;object-fit:contain;pointer-events:none;display:none;";
  stage.appendChild(clothingLayer);
}

function renderItems() {
  const category = categories[state.category];
  titleEl.textContent = category.title;
  itemsEl.replaceChildren();

  category.items.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = "item";

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = item.color;

    const name = document.createElement("span");
    name.textContent = item.name;

    button.append(swatch, name);

    if (state.selected[state.category] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      state.selected[state.category] = index;

      const image = new Image();
      image.onload = () => {
        clothingLayer.src = item.file;
        clothingLayer.style.display = "block";
        statusEl.textContent = `${item.name}: одежда применена.`;
      };
      image.onerror = () => {
        statusEl.textContent =
          `Нужно загрузить файл ${item.file} в корень репозитория.`;
      };
      image.src = item.file;

      renderItems();
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
    statusEl.textContent = `Категория: ${categories[state.category].title}`;
  });
});

document.getElementById("randomBtn").addEventListener("click", () => {
  const keys = Object.keys(categories);
  state.category = keys[Math.floor(Math.random() * keys.length)];
  const items = categories[state.category].items;
  const index = Math.floor(Math.random() * items.length);
  renderItems();
  itemsEl.children[index]?.click();
});

document.getElementById("saveBtn").addEventListener("click", () => {
  localStorage.setItem("royalWardrobeSave", JSON.stringify(state));
  statusEl.textContent = "Выбор сохранён на этом устройстве.";
});

document.getElementById("poseBtn").addEventListener("click", () => {
  stage.classList.toggle("pose");
});

document.getElementById("animationBtn").addEventListener("click", () => {
  stage.classList.toggle("moving");
});

renderItems();
