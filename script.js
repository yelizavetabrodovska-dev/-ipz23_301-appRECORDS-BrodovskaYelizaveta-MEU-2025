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
