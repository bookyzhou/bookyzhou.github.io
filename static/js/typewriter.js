document.addEventListener('DOMContentLoaded', function() {
  const text = "Embrace life's natural flow."; // Text to type
  const speed = 100; // Typing speed in ms
  const element = document.getElementById('typewriter');
  
  if (!element) return;

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
});
