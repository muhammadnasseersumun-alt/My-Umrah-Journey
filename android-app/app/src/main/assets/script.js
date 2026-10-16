const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const checkboxes = document.querySelectorAll('.todo-item input');
checkboxes.forEach((item) => {
  item.addEventListener('change', () => {
    const label = item.closest('.todo-item');
    if (!label) return;

    if (item.checked) {
      label.style.opacity = '1';
      label.style.textDecoration = 'none';
    } else {
      label.style.opacity = '0.8';
      label.style.textDecoration = 'line-through';
    }
  });
});
