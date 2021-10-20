'use strict';
//----------Importing Elements----------
const hamBtn = document.querySelector('.hamburger');
const lineTop = document.querySelector('.top');
const lineMid = document.querySelector('.mid');
const lineButtom = document.querySelector('.bottom');
const hamMenu = document.querySelector('header');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('.section');
const header = document.querySelector('header');
const bttBtn = document.querySelector('.btt');
//----------functions----------
const toggleHamburger = () => {
  lineTop.classList.toggle('lt-open');
  lineMid.classList.toggle('lm-open');
  lineButtom.classList.toggle('lb-open');
  hamMenu.classList.toggle('header-open');
};

const removeActiveClass = () => {
  navLink.forEach(link => {
    link.classList.remove('active');
  });
};

const removeSectionActiveClass = () => {
  sections.forEach(section => {
    section.classList.remove('section-active');
  });
};

//create nav links ---
sections.forEach((section, i) => {
  const link = document.createElement('li');
  link.textContent = `Section ${i + 1}`;
  link.classList.add('nav-link');
  link.setAttribute('id', `section-${i + 1}`);
  navLinks.appendChild(link);
});
const navLink = document.querySelectorAll('.nav-link');

//toggle hamburger menu
hamBtn.addEventListener('click', toggleHamburger);

//scroll section into view
navLinks.addEventListener('click', e => {
  e.preventDefault();
  const link = e.target;

  if (link.classList.contains('nav-link')) {
    const id = link.getAttribute('id');
    const section = document.querySelector(`.${id}`);
    section.scrollIntoView({ behavior: 'smooth' });
    toggleHamburger();
  }
});

//back to top functionality
bttBtn.addEventListener('click', () => {
  sections[0].scrollIntoView({ behavior: 'smooth' });
});

//Update Navigation and Sections while scrolling --
sections.forEach((section, i) => {
  section = document.querySelector(`.section-${i + 1}`);

  const addActive = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        removeActiveClass();
        removeSectionActiveClass();
        navLink[i].classList.add('active');
        sections[i].classList.add('section-active');
      }
    });
  };

  const sectionObserver = new IntersectionObserver(addActive, {
    root: null,
    threshold: 0.7,
  });

  sectionObserver.observe(section);
});

//hide nav when user stop scrolling
let userScrolling;
window.addEventListener(
  'scroll',
  e => {
    header.classList.remove('hide-nav');
    window.clearTimeout(userScrolling);

    userScrolling = setTimeout(() => {
      header.classList.add('hide-nav');
    }, 1000);
  },
  false
);

//show back to top btn
const showBtt = entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) {
      bttBtn.classList.add('btt-show');
    } else {
      bttBtn.classList.remove('btt-show');
    }
  });
};

const section1Observer = new IntersectionObserver(showBtt, {
  root: null,
  threshold: 0,
});

section1Observer.observe(sections[0]);
