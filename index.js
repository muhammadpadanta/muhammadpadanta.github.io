document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuBtn = document.querySelector(".menu-btn");
  const navItems = document.querySelector(".nav-items");

  menuBtn.addEventListener("click", function () {
    navItems.classList.toggle("active");
    menuBtn.classList.toggle("active");
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      document.getElementById(targetId).scrollIntoView({
        behavior: "smooth",
      });
      navItems.classList.remove("active");
      menuBtn.classList.remove("active");
    });
  });

  // Skill Bar Animation
  const skillBars = document.querySelectorAll(".skill-level");
  const skillSection = document.querySelector("#skills");

  function checkSkills() {
    const sectionTop = skillSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 100) {
      skillBars.forEach((bar) => {
        bar.style.width =
          bar.getAttribute("style").match(/width:\s*(\d+)%/)[1] + "%";
      });
    }
  }

  window.addEventListener("scroll", checkSkills);
  checkSkills();

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      projectCards.forEach((card) => {
        if (
          filter === "all" ||
          card.getAttribute("data-category").includes(filter)
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Contact Form Submission with reCAPTCHA v2
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default submission

    const recaptchaResponse = document.querySelector(
      ".g-recaptcha-response"
    ).value;

    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA challenge.");
      return;
    }

    console.log("Form submitted!"); // Debugging
    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Thank you! Your message has been sent.");
          contactForm.reset();
          grecaptcha.reset(); // Reset reCAPTCHA after submission
        } else {
          alert("Oops! Something went wrong.");
          console.error("Form submission error:", response);
        }
      })
      .catch((error) => {
        alert("Oops! Something went wrong.");
        console.error("Network error:", error);
      });
  });

  // Scroll Animation (Triggers Once)
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated"); // Add animation class
          observer.unobserve(entry.target); // Stop observing after triggering once
        }
      });
    },
    { threshold: 0.3 } // Adjust this value for earlier/later trigger
  );

  animatedElements.forEach((el) => observer.observe(el));
});
