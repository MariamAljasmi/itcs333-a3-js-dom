// ITCS333 A3 starter — implement the to-do app per README.
document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const errorMsg = document.getElementById('error-msg');
  const todoList = document.getElementById('todo-list');
  const counter = document.getElementById('counter');
  const filterAll = document.getElementById('filter-all');
  const filterActive = document.getElementById('filter-active');
  const filterDone = document.getElementById('filter-done');

// You may wrap everything in a DOMContentLoaded handler or an IIFE.
  function updateCounter() {
    const activeItems = todoList.querySelectorAll('li:not(.completed)').length;
    counter.textContent = `${activeItems} item${activeItems === 1 ? '' : 's'} left`;
  }

// Requirements: add / toggle-complete / delete / filter / counter,
function filterItems(filterType) {
    const items = todoList.querySelectorAll('li');
    items.forEach(li => {
      const isCompleted = li.classList.contains('completed');
      if (filterType === 'all') {
        li.classList.remove('hidden');
      } else if (filterType === 'active') {
        li.classList.toggle('hidden', isCompleted);
      } else if (filterType === 'done') {
        li.classList.toggle('hidden', !isCompleted);
      }
    });
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();

    if (!text) {
      errorMsg.classList.remove('hidden');
      return;
    }

    errorMsg.classList.add('hidden');

    const li = document.createElement('li');
    li.innerHTML = `<span class="item-text">${text}</span><button class="delete-btn" type="button">Delete</button>`;
    todoList.appendChild(li);

    todoInput.value = '';
    updateCounter();
  });

  todoInput.addEventListener('input', () => {
    if (todoInput.value.trim()) errorMsg.classList.add('hidden');
  });

// using event delegation on #todo-list.
todoList.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;

    if (e.target.classList.contains('delete-btn')) {
      li.remove();
      updateCounter();
    } else {
      li.classList.toggle('completed');
      updateCounter();
    }
  });

  filterAll.addEventListener('click', () => filterItems('all'));
  filterActive.addEventListener('click', () => filterItems('active'));
  filterDone.addEventListener('click', () => filterItems('done'));
});

// TODO: your code here
