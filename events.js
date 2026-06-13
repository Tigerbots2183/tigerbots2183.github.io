// Events configuration list for TigerBots FRC 2183 website
// Add, remove, or modify events in this array.
// Dates should follow the 'YYYY-MM-DD' format.
const events = [
  {
    title: "Hahnville Summer Robotics Camp",
    date: "2026-06-17",
    image: "media/Camp2.jpg",
    description: "Inspiring future innovators at our annual summer youth camp. Hands-on learning with LEGO MINDSTORMS and CAD basics."
  },
      {
    title: "Northshore Knockout",
    date: "2026-07-18",
    image: "media/NorthShore.jpg",
    description: "Team 2183 will be competing at the 2026 Northshore Knockout Competition, come support us at Mandeville High School!"
  },
  {
    title: "TigerBots Parent Meeting & Open House",
    date: "2026-08-12",
    image: "media/OpenHouse.jpg",
    description: "Discover what it means to be a TigerBot! Meet the team, tour our workshop, and see our 150-pound FRC robots in action."
  },

  {
    title: "2027 FIRST Game Kickoff",
    date: "2027-01-09",
    image: "media/Kickoff.jpg",
    description: "The countdown begins! The official global game reveal for the 2027 FIRST Robotics Competition season, launching 6 weeks of intense build season."
  },
  {
    title: "Magnolia Regional Competition (2026)",
    date: "2026-03-22", // Past event relative to June 13, 2026. Will be automatically hidden.
    image: "media/PurpleReignBotPicture.jpg",
    description: "Cheer on the TigerBots as we compete at the Magnolia Regional! Watch our student-built robot take the field."
  }
];

// Filter events so we only show those occurring today or in the future.
// Set date deadline to the end of that day (23:59:59) so it doesn't disappear prematurely.
const getUpcomingEvents = (eventList) => {
  const now = new Date();
  return eventList.filter(event => {
    const parts = event.date.split('-');
    if (parts.length === 3) {
      // Create local date object representing 23:59:59 of that day
      const eventDate = new Date(
        parseInt(parts[0], 10),
        parseInt(parts[1], 10) - 1,
        parseInt(parts[2], 10),
        23, 59, 59
      );
      return eventDate >= now;
    }
    return new Date(event.date) >= now;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("events-section");
  if (!section) return;

  const upcomingEvents = getUpcomingEvents(events);

  // If no upcoming events, render the fallback card
  if (upcomingEvents.length === 0) {
    section.innerHTML = `
      <div class="no-events-card">
        <h3>Upcoming Events</h3>
        <p>No team events are currently scheduled. Stay tuned or check back soon for our next build season kickoff, outreach events, and regionals!</p>
      </div>
    `;
    return;
  }

  // Otherwise, construct the carousel
  let slidesHTML = "";
  let dotsHTML = "";

  upcomingEvents.forEach((event, idx) => {
    // Format the date nicely
    const dateObj = new Date(event.date + "T00:00:00");
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    slidesHTML += `
      <div class="carousel-slide ${idx === 0 ? 'active' : ''}">
        <img class="carousel-image" src="${event.image}" alt="${event.title}">
        <div class="carousel-overlay">
          <div class="carousel-content">
            <div class="carousel-date">${formattedDate}</div>
            <h2 class="carousel-title">${event.title}</h2>
            <p class="carousel-desc">${event.description}</p>
          </div>
        </div>
      </div>
    `;

    dotsHTML += `
      <button class="carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
    `;
  });

  // Insert elements into the section
  section.innerHTML = `
    <h1 class="events-title">Upcoming Events</h1>
    <div class="carousel-container">
      <div class="carousel-track" id="carousel-track">
        ${slidesHTML}
      </div>
      <button class="carousel-control carousel-prev" id="carousel-prev" aria-label="Previous Slide">&#10094;</button>
      <button class="carousel-control carousel-next" id="carousel-next" aria-label="Next Slide">&#10095;</button>
      <div class="carousel-dots" id="carousel-dots">
        ${dotsHTML}
      </div>
    </div>
  `;

  // Carousel control selectors
  const track = document.getElementById("carousel-track");
  const dots = document.querySelectorAll(".carousel-dot");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const container = section.querySelector(".carousel-container");

  let currentIndex = 0;
  const totalSlides = upcomingEvents.length;
  let slideInterval;

  function showSlide(index) {
    if (index < 0) {
      currentIndex = totalSlides - 1;
    } else if (index >= totalSlides) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Sliding transition
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Toggle active state on slides to animate their inner text
    const slides = track.querySelectorAll(".carousel-slide");
    slides.forEach((slide, idx) => {
      if (idx === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // Update dots active classes
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  // Interactive controls
  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const targetIndex = parseInt(e.target.getAttribute("data-index"), 10);
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  // Mobile swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      resetAutoplay();
    }
  }, { passive: true });

  // Autoplay management
  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 10000);
  }

  function stopAutoplay() {
    clearInterval(slideInterval);
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  // Pause on hover
  container.addEventListener("mouseenter", stopAutoplay);
  container.addEventListener("mouseleave", startAutoplay);

  // Run autoplay
  startAutoplay();
});
