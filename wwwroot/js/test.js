/* ============================================================
   TABS + SPLITTER
   ============================================================ */

function showTab(tabId) {
    // Masquer tous les onglets
    document.querySelectorAll(".tabContent").forEach(div => {
        div.style.display = "none";
    });

    // Afficher l’onglet demandé
    document.getElementById(tabId).style.display = "block";

    // Mettre à jour l’état visuel des tabs
    document.querySelectorAll(".tabButton").forEach(btn => btn.classList.remove("activeTab"));
    if (tabId === "datesTab") document.getElementById("tab_dates").classList.add("activeTab");
    if (tabId === "booksTab") document.getElementById("tab_books").classList.add("activeTab");

    // Charger les books si on ouvre l’onglet Books
    if (tabId === "booksTab") {
        loadBooks();
    }
}

let isDragging = false;

const splitter = document.getElementById("logSplitter");
const logsPanel = document.getElementById("logsPanel");
const tabContents = document.querySelectorAll(".tabContent");
const chevron = document.getElementById("splitterChevron");

const OPEN_HEIGHT = 150;
const CLOSED_HEIGHT = 0;

let logsOpen = true;

/* État initial */
logsPanel.style.display = "block";
logsPanel.style.height = OPEN_HEIGHT + "px";
splitter.style.bottom = OPEN_HEIGHT + "px";
tabContents.forEach(tc => tc.style.bottom = OPEN_HEIGHT + "px");
chevron.textContent = "▼";

/* Drag du splitter */
splitter.addEventListener("mousedown", (e) => {
    if (e.target === chevron) return; // ne pas drag si on clique sur le bouton
    isDragging = true;
    document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging || !logsOpen) return;

    const newHeight = window.innerHeight - e.clientY;

    if (newHeight > 80 && newHeight < window.innerHeight * 0.5) {
        logsPanel.style.height = newHeight + "px";
        splitter.style.bottom = newHeight + "px";
        tabContents.forEach(tc => tc.style.bottom = newHeight + "px");
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
    document.body.style.userSelect = "auto";
});

/* Toggle via click sur le bouton chevron */
chevron.addEventListener("click", () => {
    if (logsOpen) {
        logsOpen = false;
        logsPanel.style.display = "none";
        logsPanel.style.height = CLOSED_HEIGHT + "px";
        splitter.style.bottom = "0px";
        tabContents.forEach(tc => tc.style.bottom = "0px");
        chevron.textContent = "▲";
    } else {
        logsOpen = true;
        logsPanel.style.display = "block";
        logsPanel.style.height = OPEN_HEIGHT + "px";
        splitter.style.bottom = OPEN_HEIGHT + "px";
        tabContents.forEach(tc => tc.style.bottom = OPEN_HEIGHT + "px");
        chevron.textContent = "▼";
    }
});

/* ============================================================
   DATES
   ============================================================ */

function insertNDateFieldsInDocument() {
    const n = parseInt(document.getElementById("n").value);
    const container = document.getElementById("dateFieldsContainer");

    container.innerHTML = "";

    for (let i = 0; i < n; i++) {
        const input = document.createElement("input");
        input.type = "date";
        input.id = "date" + (i + 1);
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }

    logApp("INFO", `${n} date fields generated.`);
}

function removeAllDateFieldsInDocument() {
    document.getElementById("dateFieldsContainer").innerHTML = "";
    logApp("INFO", "Removing all date fields from the document.");
}

/* ============================================================
   LOGS
   ============================================================ */

function logApp(severity, message) {
    const logContainer = document.getElementById("idDivLogs");
    const logEntry = document.createElement("div");
    logEntry.className = "log-entry " + severity;
    logEntry.textContent = `[${severity.toUpperCase()}] ${message}`;
    logContainer.appendChild(logEntry);
}

/* ============================================================
   BOOKS API
   ============================================================ */

async function loadBooks() {
    try {
        const response = await fetch("http://localhost:5000/Book/all");
        const books = await response.json();

        const tbody = document.getElementById("booksTableBody");
        tbody.innerHTML = "";

        books.forEach(book => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button class="deleteButton" onclick="deleteBookFromApi(${book.id})">Delete</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        logApp("INFO", "Books loaded from API.");
    } catch (e) {
        logApp("ERROR", "Failed to load books: " + e.message);
    }
}

async function addBookToApi() {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;

    try {
        await fetch("http://localhost:5000/Book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author })
        });

        logApp("INFO", `Book added: ${title}`);
        loadBooks();
    } catch (e) {
        logApp("ERROR", "Failed to add book: " + e.message);
    }
}

async function deleteBookFromApi(id) {
    try {
        await fetch(`http://localhost:5000/Book/${id}`, { method: "DELETE" });
        logApp("INFO", "Book deleted: " + id);
        loadBooks();
    } catch (e) {
        logApp("ERROR", "Failed to delete book: " + e.message);
    }
}
