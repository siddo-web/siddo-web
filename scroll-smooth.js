// scroll-smooth.js
gsap.registerPlugin(ScrollTrigger);
gsap.to("html", {
  scrollBehavior: "smooth"
});