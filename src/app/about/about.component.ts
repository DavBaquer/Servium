import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const spans = document.querySelectorAll('.word span');

spans.forEach((span, idx) => {

  span.addEventListener('click', (e) => {
    span.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		span.classList.remove('active');
	});

	// Initial animation
	setTimeout(() => {
		span.classList.add('active');
	}, 750 * (idx+1))
});

function typeEffect(element, speed) {
  var text = element.innerHTML;
  element.innerHTML = "";

  var i = 0;
  var timer = setInterval(function() {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}


// application
var speed = 30;
var h1 = document.getElementById('vision');
var p = document.getElementById('contenvision');
var delay = h1.innerHTML.length * speed + speed;

// type affect to header
typeEffect(h1, speed);


// type affect to body
setTimeout(function(){
  p.style.display = "inline-block";
  typeEffect(p, speed);
}, delay);



// application
var speed = 30;
var h2 = document.getElementById('vision2');
var p2 = document.getElementById('contenvision2');
var delay = h2.innerHTML.length * speed + speed;

// type affect to header
typeEffect(h2, speed);


// type affect to body
setTimeout(function(){
  p2.style.display = "inline-block";
  typeEffect(p2, speed);
}, delay);



  }


  }










