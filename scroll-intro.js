// scroll-intro.js
gsap.registerPlugin(ScrollTrigger);

const controller = new ScrollMagic.Controller();
const introTimeline = new TimelineMax();

document.querySelectorAll('.intro-section div').forEach((el, index) => {
  introTimeline.to(el, 0.6, {
    opacity: 1,
    y: 0,
    ease: Power2.easeOut
  }, index * 0.4);
});

new ScrollMagic.Scene({
  triggerElement: '.intro-section',
  triggerHook: 0.5,
  duration: '100%',
  reverse: false
})
.setTween(introTimeline)
.setPin('.intro-section')
.addTo(controller);
