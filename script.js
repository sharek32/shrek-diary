function showSection(id) {
  document.querySelectorAll('.diary-section').forEach(sec => sec.style.display = "none");
  document.getElementById(id).style.display = "block";
  document.querySelectorAll("nav button").forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");
}

document.querySelectorAll('textarea').forEach(ta => {
  ta.addEventListener('input', e => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  });
});

function loadEntries() {
  ["simple", "work", "love"].forEach(type => {
    let saved = JSON.parse(localStorage.getItem(type + "-entries")) || [];
    let container = document.querySelector("#" + type + " .entries");
    container.innerHTML = "";
    saved.forEach((entry, index) => {
      let div = document.createElement("div");
      div.className = "entry";
      div.innerHTML = `
        <h3>${entry.title}</h3>
        <p>${entry.text}</p>
        <button class="delete-btn" onclick="deleteEntry('${type}', ${index})">Delete</button>
      `;
      container.appendChild(div);
    });
  });
}

function addEntry(e, type) {
  e.preventDefault();
  let title = e.target.querySelector("input").value;
  let text = e.target.querySelector("textarea").value;
  let newEntry = { title, text };

  let saved = JSON.parse(localStorage.getItem(type + "-entries")) || [];
  saved.unshift(newEntry); // newest on top
  localStorage.setItem(type + "-entries", JSON.stringify(saved));

  e.target.reset();
  e.target.querySelector("textarea").style.height = 'auto'; // reset textarea height
  loadEntries();
}
function deleteEntry(type, index) {
  let saved = JSON.parse(localStorage.getItem(type + "-entries")) || [];
  saved.splice(index, 1);
  localStorage.setItem(type + "-entries", JSON.stringify(saved));
  loadEntries();
}

window.onload = loadEntries;
