const roadmap = document.querySelector('[data-roadmap]');
const track = roadmap.querySelector('.roadmap-track');
const nodes = [...track.querySelectorAll('button')];
const details = nodes.map(node => document.getElementById(node.getAttribute('aria-controls')));

function selectStep(index) {
  nodes.forEach((node, i) => {
    node.setAttribute('aria-pressed', String(i === index));
    details[i].hidden = i !== index;
  });
}

nodes.forEach((node, index) => {
  node.disabled = false;
  node.addEventListener('click', () => selectStep(index));
});
