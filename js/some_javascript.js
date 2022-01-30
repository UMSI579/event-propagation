// We wrap all the JS in a function as a way to contain it so it doesn't
// risk conflicting with other loaded javascript
(function() {
    const logElement = document.getElementById('log');
   const stopEventPropagation = document.querySelector('#stop-event-propagation');
   const propagationTypeLabel = document.querySelector('#prop-type');
   const propagationType = document.querySelector('#prop-type select');

   function log(msg) {
      logElement.innerHTML += ('<p>' + msg + '</p>');
   }

   function capture(e) {
      if (document.querySelector('#stop-event-propagation').checked) {
         if (propagationType.value === 'Bubble') {
            return;
         }
         e.stopPropagation();
         console.log('propy stopped');
      }
      log('capture: ' + this.firstChild.nodeValue.trim());

   }

   function bubble(e) {
      if (document.querySelector('#stop-event-propagation').checked) {
         if (propagationType.value === 'Capture') {
            return;
         }
         e.stopPropagation();
         console.log('propy stopped');
      }
      log('bubble: ' + this.firstChild.nodeValue.trim());
   }

   function clearOutput() {
      logElement.innerHTML = "";
   }

   const divs = document.getElementsByTagName('div');
   for (let i = 0; i < divs.length; i++) {
      divs[i].addEventListener('click', capture, true);
      divs[i].addEventListener('click', bubble, false);
   }
   const clearButton = document.getElementById('clear');
   clearButton.addEventListener('click', clearOutput);
   stopEventPropagation.addEventListener('change', (e) => {
      propagationTypeLabel.hidden = !stopEventPropagation.checked;
   });
 })();
