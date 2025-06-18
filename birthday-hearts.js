// birthday-hearts.js
const heartEmojis = ["💖", "💘", "💞", "💕", "💓"];
const container = document.querySelector(".floating-hearts");

for (let i = 0; i < 25; i++) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.top = Math.random() * 100 + "vh";

  container.appendChild(heart);

  gsap.to(heart, {
    y: -200 - Math.random() * 400,
    x: "+=" + (Math.random() * 100 - 50),
    opacity: 1,
    scale: 1 + Math.random() * 0.5,
    duration: 5 + Math.random() * 3,
    delay: Math.random() * 4,
    repeat: -1,
    ease: "sine.inOut"
  });
}