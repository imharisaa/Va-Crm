// --- Tabs ---
const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// --- Helper functions ---
function save(key, data) { localStorage.setItem(key, JSON.stringify(data)); }
function load(key) { return JSON.parse(localStorage.getItem(key)) || []; }
function renderList(listEl, items, template) {
  listEl.innerHTML = '';
  items.forEach(i => {
    const li = document.createElement('li');
    li.innerHTML = template(i);
    listEl.appendChild(li);
  });
}

// --- Emails ---
let emails = load('emails');
const emailForm = document.getElementById('email-form');
const emailList = document.getElementById('email-list');
const emailSearch = document.getElementById('email-search');
const emailReport = document.getElementById('email-report');

function renderEmails(filter='') {
  const filtered = emails.filter(e => e.subject.toLowerCase().includes(filter) || e.body.toLowerCase().includes(filter));
  renderList(emailList, filtered, e => `${e.subject} - ${e.body}` + (e.priority ? ' <span class="text-red-600 font-bold">[High]</span>' : ''));
  const high = emails.filter(e => e.priority).length;
  emailReport.textContent = `Total Emails: ${emails.length}, High Priority: ${high}`;
}
emailForm.addEventListener('submit', e => {
  e.preventDefault();
  emails.push({
    subject: document.getElementById('email-subject').value,
    body: document.getElementById('email-body').value,
    priority: document.getElementById('email-priority').checked
  });
  save('emails', emails);
  emailForm.reset();
  renderEmails();
});
emailSearch.addEventListener('input', () => renderEmails(emailSearch.value.toLowerCase()));
renderEmails();

// --- Calendar ---
let events = load('events');
const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('event-list');
const eventSearch = document.getElementById('event-search');

function renderEvents(filter='') {
  const filtered = events.filter(ev => ev.title.toLowerCase().includes(filter) || ev.date.includes(filter));
  renderList(eventList, filtered, e => `${e.date}: ${e.title}`);
}
eventForm.addEventListener('submit', e => {
  e.preventDefault();
  events.push({
    title: document.getElementById('event-title').value,
    date: document.getElementById('event-date').value
  });
  save('events', events);
  eventForm.reset();
  renderEvents();
});
eventSearch.addEventListener('input', () => renderEvents(eventSearch.value.toLowerCase()));
renderEvents();

// --- Notes ---
let notes = load('notes');
const noteForm = document.getElementById('note-form');
const noteList = document.getElementById('note-list');
const noteSearch = document.getElementById('note-search');

function renderNotes(filter='') {
  const filtered = notes.filter(n => n.client.toLowerCase().includes(filter) || n.note.toLowerCase().includes(filter));
  renderList(noteList, filtered, n => `${n.client}: ${n.note}`);
}
noteForm.addEventListener('submit', e => {
  e.preventDefault();
  notes.push({
    client: document.getElementById('note-client').value,
    note: document.getElementById('note-text').value
  });
  save('notes', notes);
  noteForm.reset();
  renderNotes();
});
noteSearch.addEventListener('input', () => renderNotes(noteSearch.value.toLowerCase()));
renderNotes();

// --- Calls ---
let calls = load('calls');
const callForm = document.getElementById('call-form');
const callList = document.getElementById('call-list');
const callSearch = document.getElementById('call-search');

function renderCalls(filter='') {
  const filtered = calls.filter(c => c.client.toLowerCase().includes(filter) || c.note.toLowerCase().includes(filter));
  renderList(callList, filtered, c => `${c.client}: ${c.note}`);
}
callForm.addEventListener('submit', e => {
  e.preventDefault();
  calls.push({
    client: document.getElementById('call-client').value,
    note: document.getElementById('call-note').value
  });
  save('calls', calls);
  callForm.reset();
  renderCalls();
});
callSearch.addEventListener('input', () => renderCalls(callSearch.value.toLowerCase()));
renderCalls();
