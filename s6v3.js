// target elements with the "draggable" class
var element = document.getElementById('grid-snap'),
    x = 0, y = 0;

interact('#s6-phone-container')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "#canvas",
      endOnly: true,
      restriction: {
        left: 150,
        right: 0,
        top: 65,
        bottom: 50
      },
      elementRect: { top: 0, left: 0, bottom: 0, right: 0 }
    },
    // enable autoScroll
    autoScroll: false,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(event.dx * event.dx +
                     event.dy * event.dy)|0) + 'px');
    }
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;








  /* The dragging code for '.draggable' from the demo above
 * applies to this demo as well so it doesn't have to be repeated. */

// enable draggables to be dropped into this
interact('#s6-charger').dropzone({
  // only accept elements matching this CSS selector
  accept: '#s6-phone-container',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.20,

  // listen for drop related events:

  ondropactivate: function (event) {
    // add active dropzone feedback
    event.target.classList.add('drop-active');
    event.relatedTarget.classList.add('s6-moving');
    $("#s6-text").addClass('s6-hide');
    $("#s6-hand").addClass('s6-hide');
    $("#s6-hand-subtext").addClass('s6-hide');
    $("#s6-charger").addClass('s6-charger-move');
    $('#s6-fill').hide();
  },
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    // feedback the possibility of a drop
    dropzoneElement.classList.add('drop-target');
    draggableElement.classList.add('can-drop');
    event.relatedTarget.classList.add('s6-moving2');
  },
  ondragleave: function (event) {
    // remove the drop feedback style
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('can-drop');
      $("#s6-pulse").hide();
      $("#s6-pulse2").hide();
      $("#s6-pulse3").hide();
      $("#s6-sun").hide();
      $("#s6-battery").hide();
      $("#s6-fill").hide();
      $("#s6-charger").removeClass("bounceInTwo");
  },
  ondrop: function (event) {
    $("#s6-pulse").show().addClass('s6-dot');
    $("#s6-pulse2").show().addClass('s6-dot2');
    $("#s6-pulse3").show().addClass('s6-dot3');
    $('#s6-battery-container').show();
    setTimeout(function() {
    $("#s6-charger").addClass("bounceInTwo");
}, 100);
    setTimeout(function() {
       $("#s6-battery").show().removeClass('s6-hide');
       $("#s6-sun").show().removeClass('s6-hide');
       $("#s6-sun").show().addClass('s6-sun-animation');
       $("#s6-fill").show().removeClass('s6-hide');
       $("#s6-fill").show().addClass('s6-fill-animation');
   }, 400);
    setTimeout(function() {
       $("#s6-button").addClass('bounceIn');
       $("#s6-nextisnow").removeClass('s6-hide');
   }, 1200);

  },
  ondropdeactivate: function (event) {
    // remove active dropzone feedback
    event.target.classList.remove('drop-active');
    event.target.classList.remove('drop-target');
    event.relatedTarget.classList.remove('s6-moving');
    event.relatedTarget.classList.remove('s6-moving2');

  }
});