
  
  
  
  document.querySelectorAll('.progress').forEach(bar => {
    const percent = parseInt(bar.getAttribute('data-percent'));
    let count = 0;
    bar.style.width = percent + '%';

    const label = bar.nextElementSibling;
    const interval = setInterval(() => {
      if (count >= percent) {
        clearInterval(interval);
      } else {
        count++;
        label.textContent = count + '%';
      }
    }, 15);
  });

  // Ensure the flipbook is initialized
  const flipbook = $(".flipbook");

  // Add click event to all sticky notes
  document.querySelectorAll('.sticky-nav .note').forEach(note => {
    note.addEventListener('click', function () {
      const page = parseInt(this.getAttribute('data-page'));
      if (!isNaN(page)) {
        flipbook.turn('page', page);
      }
    });
  });

   document.querySelectorAll('.faqbox').forEach(box => {
    box.querySelector('.faq-question').addEventListener('click', () => {
      const answer = box.querySelector('.faq-answer');
      const isVisible = answer.style.display === 'block';
      // Close all others
      document.querySelectorAll('.faq-answer').forEach(ans => ans.style.display = 'none');
      // Toggle current
      answer.style.display = isVisible ? 'none' : 'block';
    });
  });

  const texts = ["I'm a Web Developer!","I bring ideas to life through code."];
  let currentTextIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const speed = 100;
  const eraseSpeed = 50;
  const delayBetween = 1500;
  const typedTextSpan = document.getElementById("typed-text");

  function type() {
    const currentText = texts[currentTextIndex];
    if (!isDeleting) {
      typedTextSpan.textContent = currentText.slice(0, ++charIndex);
      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, delayBetween);
      } else {
        setTimeout(type, speed);
      }
    } else {
      typedTextSpan.textContent = currentText.slice(0, --charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(type, speed);
      } else {
        setTimeout(type, eraseSpeed);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 500);
  });


  
  // Scroll to About section
  document.getElementById('go-to-about').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.main.second').scrollIntoView({ behavior: 'smooth' });
  });

  // Function to scroll to flipbook then go to page
  function scrollToFlipbookAndOpen(pageNum) {
    const target = document.querySelector('.main.first');

    target.scrollIntoView({ behavior: 'smooth' });

    // Wait until scroll completes (approx time)
    setTimeout(() => {
      $(".flipbook").turn("page", pageNum);
    }, 800); // Adjust this delay if needed based on scroll speed
  }

  // Skills
  document.getElementById('go-to-skills').addEventListener('click', function (e) {
    e.preventDefault();
    scrollToFlipbookAndOpen(7); // Adjust to your actual Soft Skills page number
  });

  // Projects
  document.getElementById('go-to-projects').addEventListener('click', function (e) {
    e.preventDefault();
    scrollToFlipbookAndOpen(11); // Replace with actual Project page
  });

  // Resume
  document.getElementById('go-to-resume').addEventListener('click', function (e) {
    e.preventDefault();
    scrollToFlipbookAndOpen(13); // Replace with actual Resume page
  });


  // Scroll + Open Flipbook Page
  function scrollToFlipbookAndOpen(pageNum) {
    document.querySelector('.main.first').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      $(".flipbook").turn("page", pageNum);
    }, 800); // Delay after scroll
  }

  // HOME – Scroll to top and reset book
  document.getElementById('go-home').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      $(".flipbook").turn("page", 1); // Reset to front cover or initial page
    }, 800);
  });

  // ABOUT – Scroll to about section
  document.getElementById('go-about').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.main.second').scrollIntoView({ behavior: 'smooth' });
  });

  // PROJECT – Scroll to flipbook & open project page
  document.getElementById('go-project').addEventListener('click', function (e) {
    e.preventDefault();
    scrollToFlipbookAndOpen(11); // Your Project page number
  });

  // CONTACT – Scroll to flipbook & open contact page
  document.getElementById('go-contact').addEventListener('click', function (e) {
    e.preventDefault();
    scrollToFlipbookAndOpen(14); // Your Contact page number
  });

  // MORE – Scroll to <div class="main third">
  document.getElementById('go-more').addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.main.third').scrollIntoView({ behavior: 'smooth' });
  });


  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      } else {
        entry.target.classList.remove('show'); // 💡 Remove to allow repeat
      }
    });
  }, {
    threshold: 0.3,
  });

  document.querySelectorAll('.fade-slide-up').forEach((el) => observer.observe(el));
  
   document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.classList.toggle('visible');
    });
  });

  // Animate FAQ boxes on scroll (show/hide every time)
const faqObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // Remove when out of view
    }
  });
}, {
  threshold: 0.2 // Trigger when 20% is visible
});

// Attach observer to each .faqbox
document.querySelectorAll('.faqbox').forEach((box) => {
  faqObserver.observe(box);
});

document.querySelectorAll('.faq-question').forEach((question) => {
  question.addEventListener('click', () => {
    const faqBox = question.closest('.faqbox');
    faqBox.classList.toggle('open');
  });
});


/* Toggle burger menu JavaScript (Add this in script.js) */
// Toggle Navigation
function toggleMenu() {
  document.querySelector('.tab-nav').classList.toggle('show');
}

//---------------------------------------------------------------------
const isMobile = window.innerWidth <= 768;

const pageFlip = new St.PageFlip(document.getElementById("book"), {
  width: isMobile ? 330 : 550,      // Adjusted width for mobile vs desktop
  height: isMobile ? 520 : 733,     // Adjusted height for mobile vs desktop
  size: "stretch",
  minWidth: 300,
  maxWidth: 1000,
  minHeight: 400,
  maxHeight: 1350,
  maxShadowOpacity: 0.5,
  showCover: true,
  mobileScrollSupport: false,
});

document.querySelectorAll('.faqbox').forEach(box => {
  const question = box.querySelector('.faq-question');
  question.addEventListener('click', () => {
    box.classList.toggle('open');
  });
});

function adjustFlipbookSize() {
  const isMobile = window.innerWidth <= 768;
  const $flipbook = $(".flipbook");

  if (isMobile) {
    $flipbook.turn("size", window.innerWidth * 0.95, window.innerHeight * 0.7);
  } else {
    $flipbook.turn("size", 1000, 600);
  }
}

window.addEventListener("resize", adjustFlipbookSize);
adjustFlipbookSize();


  function setupFlipbook() {
    const isMobile = window.innerWidth <= 768;

    if ($(".flipbook").data("turn")) {
      $(".flipbook").turn("destroy");
    }

    $(".flipbook").turn({
      width: isMobile ? window.innerWidth * 0.95 : 1000,
      height: isMobile ? window.innerHeight * 0.7 : 600,
      autoCenter: true,
      elevation: 50,
      display: isMobile ? 'single' : 'double',
      gradients: true
    });

    if (isMobile) {
      $(".flipbook").off("click").on("click", function () {
        $(this).turn("next");
      });
    }
  }

  $(document).ready(setupFlipbook);
  $(window).on("resize", setupFlipbook);




  // ✅ Trigger flipbook + scroll handling on DOM ready
// document.addEventListener("DOMContentLoaded", function () {
//   // Unified scroll/flip function
//   function scrollToFlipbookAndGoTo(pageNum) {
//     document.querySelector(".main.first").scrollIntoView({ behavior: "smooth" });
//     setTimeout(() => {
//       if ($(".flipbook").turn) {
//         $(".flipbook").turn("page", pageNum);
//       }
//     }, 800); // Wait for scroll animation
//   }

//   // ✅ Button connections
//   document.getElementById("go-home").addEventListener("click", () => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setTimeout(() => {
//       $(".flipbook").turn("page", 1);
//     }, 800);
//   });

//   document.getElementById("go-about").addEventListener("click", () => {
//     document.querySelector(".main.second").scrollIntoView({ behavior: "smooth" });
//   });

//   document.getElementById("go-project").addEventListener("click", () => {
//     scrollToFlipbookAndGoTo(11);
//   });

//   document.getElementById("go-contact").addEventListener("click", () => {
//     scrollToFlipbookAndGoTo(14);
//   });

//   document.getElementById("go-more").addEventListener("click", () => {
//     document.querySelector(".main.third").scrollIntoView({ behavior: "smooth" });
//   });
// });




  document.addEventListener("DOMContentLoaded", () => {
  // Toggle menu visibility
  window.toggleMenu = function () {
    document.querySelector(".tab-nav").classList.toggle("show");
  };

  const flipbook = $(".flipbook");

  function scrollToFlipbookAndGoTo(pageNum) {
    document.querySelector(".main.first").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      if (flipbook.turn) flipbook.turn("page", pageNum);
    }, 800);
  }

  const navActions = {
    "go-home": () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => flipbook.turn("page", 1), 800);
    },
    "go-about": () => {
      document.querySelector(".main.second").scrollIntoView({ behavior: "smooth" });
    },
    "go-project": () => scrollToFlipbookAndGoTo(11),
    "go-contact": () => scrollToFlipbookAndGoTo(14),
    "go-more": () => {
      document.querySelector(".main.third").scrollIntoView({ behavior: "smooth" });
    }
  };

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.id;
      if (navActions[id]) {
        document.querySelector(".tab-nav").classList.remove("show"); // Auto-close menu
        navActions[id]();
      }
    });
  });
});
