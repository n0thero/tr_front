import MoveTo from 'moveto';

const moveTo = new MoveTo();

const triggers = document.querySelectorAll('.move-to');
triggers.forEach(function(trigger) {
  moveTo.registerTrigger(trigger);
});
