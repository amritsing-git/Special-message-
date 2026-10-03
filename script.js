// @ts-nocheck
"use strict";

/* =========================================
   BUGGŪ ❤️
   CUTE MESSAGE ANIMATION
========================================= */

const intro = document.getElementById("intro");
const message = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

const heartsContainer = document.getElementById("hearts");
const sparkleContainer = document.getElementById("sparkles");


/* ===============================
   SHOW MESSAGE
================================ */

function openMessage() {

  if (!intro || !message) return;

  createButtonSparkles(startBtn);

  setTimeout(() => {

    intro.classList.remove("active");

    message.classList.add("active");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    createHeartBurst();

  }, 500);
}


/* ===============================
   START BUTTON
================================ */

if (startBtn) {

  startBtn.addEventListener("click", openMessage);

}


/* ===============================
   FLOATING HEARTS
================================ */

function createFloatingHeart() {

  if (!heartsContainer) return;

  const heart = document.createElement("span");

  heart.className = "floating-heart";

  const symbols = [
    "♡",
    "♥",
    "♡",
    "💗",
    "✦"
  ];

  heart.textContent =
    symbols[
      Math.floor(Math.random() * symbols.length)
    ];

  heart.style.left =
    `${Math.random() * 100}%`;

  heart.style.fontSize =
    `${12 + Math.random() * 16}px`;

  heart.style.animationDuration =
    `${7 + Math.random() * 5}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 13000);
}


/* Start floating hearts */

setInterval(
  createFloatingHeart,
  750
);


/* ===============================
   SPARKLE
================================ */

/**
 * @param {number} x
 * @param {number} y
 */
function createSparkle(x, y) {

  if (!sparkleContainer) return;

  const sparkle = document.createElement("span");

  sparkle.className = "sparkle";

  const symbols = [
    "✨",
    "♡",
    "✦",
    "🌸",
    "💗"
  ];

  sparkle.textContent =
    symbols[
      Math.floor(Math.random() * symbols.length)
    ];

  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;

  sparkleContainer.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1000);
}


/* ===============================
   BUTTON SPARKLES
================================ */

/**
 * @param {HTMLElement} button
 */
function createButtonSparkles(button) {

  if (!button) return;

  const rect =
    button.getBoundingClientRect();

  for (let i = 0; i < 14; i++) {

    setTimeout(() => {

      createSparkle(
        rect.left +
        rect.width / 2 +
        (Math.random() - 0.5) * 180,

        rect.top +
        rect.height / 2 +
        (Math.random() - 0.5) * 80
      );

    }, i * 35);

  }
}


/* ===============================
   HEART BURST
================================ */

function createHeartBurst() {

  const symbols = [
    "💗",
    "♡",
    "♥",
    "🌸",
    "✨"
  ];

  for (let i = 0; i < 22; i++) {

    const heart =
      document.createElement("span");

    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";

    heart.style.zIndex = "50";
    heart.style.pointerEvents = "none";

    heart.textContent =
      symbols[
        Math.floor(Math.random() * symbols.length)
      ];

    heart.style.fontSize =
      `${12 + Math.random() * 18}px`;

    const angle =
      Math.random() * Math.PI * 2;

    const distance =
      80 + Math.random() * 230;

    const x =
      Math.cos(angle) * distance;

    const y =
      Math.sin(angle) * distance;

    heart.animate(

      [
        {
          transform:
            "translate(-50%, -50%) scale(0.2)",

          opacity: 0
        },

        {
          transform:
            "translate(-50%, -50%) scale(1)",

          opacity: 1,

          offset: 0.2
        },

        {
          transform:
            `translate(
              calc(-50% + ${x}px),
              calc(-50% + ${y}px)
            ) scale(1.1)`,

          opacity: 0
        }
      ],

      {
        duration:
          1500 + Math.random() * 900,

        easing:
          "cubic-bezier(.2,.8,.2,1)"
      }

    );

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2800);

  }
}


/* ===============================
   CLICK SPARKLES
================================ */

document.addEventListener(
  "click",
  (event) => {

    const target =
      event.target;

    if (
      target.closest("button")
    ) {
      return;
    }

    createSparkle(
      event.clientX,
      event.clientY
    );

  }
);


/* ===============================
   TOUCH SPARKLES
================================ */

document.addEventListener(
  "touchstart",
  (event) => {

    const touch =
      event.touches[0];

    if (!touch) return;

    createSparkle(
      touch.clientX,
      touch.clientY
    );

  },
  {
    passive: true
  }
);


/* ===============================
   KEYBOARD
================================ */

document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Enter" &&
      intro &&
      intro.classList.contains("active")
    ) {

      openMessage();

    }

  }
);


/* ===============================
   INITIAL
================================ */

if (intro) {
  intro.classList.add("active");
}

if (message) {
  message.classList.remove("active");
}

console.log(
  "Buggū ❤️ — message website loaded."
);