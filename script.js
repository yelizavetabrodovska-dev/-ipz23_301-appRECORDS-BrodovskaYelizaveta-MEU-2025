const main = document.getElementById("mainContent");
const sidebar = document.getElementById("sideMenu");
const labButtons = document.querySelectorAll(".lab-btn");

let sections = {};

labButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    labButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadLab(btn.dataset.lab);
  });
});

function loadLab(labId) {
  fetch(`labs/lab${labId}.html`)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      sections = {};

      doc.querySelectorAll("section").forEach(sec => {
        sections[sec.id] = sec.innerHTML;
      });

      sidebar.innerHTML = "";
      doc.querySelectorAll("section").forEach(sec => {
        const btn = document.createElement("button");
        btn.textContent = secTitles[sec.id] || sec.id;
        btn.className = "side-btn";

        // відступ - атрибут data-indent
        const indent = sec.getAttribute("data-indent");
        if (indent) btn.classList.add(`indent-${indent}`);

        btn.addEventListener("click", () => showSection(sec.id, btn));
        sidebar.appendChild(btn);
      });

      main.innerHTML = `<p class="placeholder">Оберіть пункт меню</p>`;
    })
    .catch(() => {
      main.innerHTML = `<p style="color:red;">Не вдалося завантажити лабораторну №${labId}</p>`;
    });
}


function showSection(id, btn) {
  document.querySelectorAll(".side-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  main.innerHTML = sections[id] || "<p>Немає даних для цього розділу</p>";
}

const secTitles = {
  desc: "Опис предметного середовища",
  topic: "Тема, мета та місце розташування",
  concl: "Висновки",
  questions: "Контрольні запитання",
};

// Завантажуємо першу лабу за замовчуванням
loadLab("1_1");

document.getElementById('showBtn').addEventListener('click', function() {
            const inputValue = document.getElementById('input1').value;
            console.log('Введене значення:', inputValue);
        });

        // Завдання 3
        const toggleBtn = document.getElementById('toggleVisibilityBtn');
        const passwordInput = document.getElementById('passwordInput');

        toggleBtn.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleBtn.textContent = 'Приховати';
            } else {
                passwordInput.type = 'password';
                toggleBtn.textContent = 'Розкрити';
            }
        });

        // Завдання 5
        window.addEventListener('click', function(event) {
            const placeElement = document.getElementById('place');
            const clickedInside = placeElement.contains(event.target);
            console.log('Клік в межах блоку #place:', clickedInside);
        });

        // Завдання 7
        document.getElementById('analyzeCategoriesBtn').addEventListener('click', function() {
            const categories = document.querySelectorAll('#categories .item');
            console.log(`Загальна кількість категорій: ${categories.length}`);
            
            categories.forEach(category => {
                const title = category.querySelector('h2').textContent;
                const items = category.querySelectorAll('li').length - 1;
                console.log(`Категорія: ${title}, Кількість елементів: ${items}`);
            });
        });

        // Завдання 8
        document.querySelector('.login-form').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const form = event.target;
            const email = form.elements.email.value.trim();
            const password = form.elements.password.value.trim();
            
            if (!email || !password) {
                alert('All form fields must be filled in');
                return;
            }
            
            const formData = {
                email: email,
                password: password
            };
            
            console.log('Дані форми:', formData);
            form.reset();
        });

        // Завдання 9
        function getRandomHexColor() {
            return `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, 0)}`;
        }

        document.querySelector('.change-color').addEventListener('click', function() {
            const randomColor = getRandomHexColor();
            document.body.style.backgroundColor = randomColor;
            document.querySelector('.color').textContent = randomColor;
        });

        // Завдання 10
        function createBoxes(amount) {
            const boxesContainer = document.getElementById('boxes');
            boxesContainer.innerHTML = '';
            
            let size = 30;
            
            for (let i = 0; i < amount; i++) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.style.width = `${size}px`;
                box.style.height = `${size}px`;
                box.style.backgroundColor = getRandomHexColor();
                box.textContent = i + 1;
                boxesContainer.appendChild(box);
                
                size += 10;
            }
        }

        function destroyBoxes() {
            document.getElementById('boxes').innerHTML = '';
        }

        document.querySelector('[data-create]').addEventListener('click', function() {
            const amount = parseInt(document.querySelector('#controls input').value);
            
            if (amount >= 1 && amount <= 100) {
                createBoxes(amount);
                document.querySelector('#controls input').value = '';
            } else {
                alert('Будь ласка, введіть число від 1 до 100');
            }
        });

        document.querySelector('[data-destroy]').addEventListener('click', destroyBoxes);

        // Делегування подій
        const productList = document.querySelector('.product-list');
        const modal = document.getElementById('productModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const closeBtn = document.querySelector('.close');

        // Делегування події кліку на батьківському елементі
        productList.addEventListener('click', function(event) {
            const productItem = event.target.closest('.product-item');
            
            if (productItem) {
                const name = productItem.dataset.name;
                const description = productItem.dataset.description;
                
                modalTitle.textContent = name;
                modalDescription.textContent = description;
                modal.style.display = 'flex';
            }
        });

        // Закриття модального вікна
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });