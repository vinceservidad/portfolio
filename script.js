const yearNode = document.getElementById('year');
if (yearNode) yearNode.textContent = new Date().getFullYear();

const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') document.body.classList.add('light');

const updateThemeButton = () => {
  if (!themeToggle) return;
  themeToggle.textContent = document.body.classList.contains('light') ? '🌙 Dark' : '☀️ Light';
};

updateThemeButton();

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeButton();
});

const form = document.getElementById('lead-form');
const feedback = document.getElementById('form-feedback');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const budget = String(formData.get('budget') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !budget || !message) {
    feedback.textContent = 'Please complete all fields to request your audit.';
    return;
  }

  feedback.textContent = 'Thanks! Opening your email app to send the request.';
  const subject = encodeURIComponent(`Audit Request from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nGoal:\n${message}`);
  window.location.href = `mailto:sarah.ads@example.com?subject=${subject}&body=${body}`;
  form.reset();
});

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const currentId = entry.target.getAttribute('id');
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${currentId}`;
      link.classList.toggle('active', isCurrent);
    });
  });
}, { threshold: 0.45 });

sections.forEach((section) => observer.observe(section));
