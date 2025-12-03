document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  const form = document.getElementById('registrationForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const fields = [
      'fullName', 'phone', 'email', 'school',
      'year', 'team', 'aiLevel', 'cyberLevel',
      'previousHackathon', 'motivation', 'whyJoin', 'presence'
    ];

    let isValid = true;

    fields.forEach(id => {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        markError(el, 'This field is required');
        isValid = false;
      } else {
        // For email field, basic email pattern
        if (id === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(el.value.trim())) {
            markError(el, 'Please enter a valid email');
            isValid = false;
          }
        }
      }
    });

    // Validate mandatory radio groups: priority1..priority5
    for (let i = 1; i <= 5; i++) {
      const name = `priority${i}`;
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        // mark error on first radio in that group
        const firstRadio = form.querySelector(`input[name="${name}"]`);
        markError(firstRadio, 'Select one option');
        isValid = false;
      }
    }

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // If all valid: collect data
    const formData = {
      fullName: form.fullName.value.trim(),
      phone: form.phone.value.trim(),
      email: form.email.value.trim(),
      school: form.school.value,
      year: form.year.value,
      team: form.team.value,
      priorities: {
        priority1: form.priority1.value,
        priority2: form.priority2.value,
        priority3: form.priority3.value,
        priority4: form.priority4.value,
        imposterChance: form.priority5.value
      },
      aiLevel: form.aiLevel.value,
      cyberLevel: form.cyberLevel.value,
      previousHackathon: form.previousHackathon.value,
      experience: form.experience.value.trim(),
      motivation: form.motivation.value,
      whyJoin: form.whyJoin.value.trim(),
      presence: form.presence.value,
      additional: form.additional.value.trim()
    };

    console.log('Form submitted:', formData);
    alert('Registration submitted successfully! Check your email for role assignment.');
    form.reset();
  });

  // Utility functions
  function markError(element, message) {
    element.classList.add('error');
    const msgEl = element.parentElement.querySelector('.error-message');
    if (msgEl) {
      msgEl.textContent = message;
    }
  }

  function clearErrors() {
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
    form.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  }

  // Background motion (mouse-based subtle parallax)
  document.addEventListener('mousemove', e => {
    const waves = document.querySelectorAll('.wave');
    const mouseX = (e.clientX / window.innerWidth) - 0.5; // center origin
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    waves.forEach((wave, index) => {
      const speed = (index + 1) * 15;
      const x = mouseX * speed;
      const y = mouseY * speed;
      wave.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});
