document.addEventListener('DOMContentLoaded', () => {
	//Intitial page load animation
	anime.timeline({
		easing: 'easeOutExpo',
	})
	.add({
		targets: '.nav-wrapper',
		width: ['0px', '1200px'],
	})
	.add({
		targets: '.logo',
		width: ['0px', '230px'],
		offset: '-=500',
	})
	.add({
		targets: '.logo h1, nav a',
		opacity: [0, 1],
		translateY: [20, 0],
		delay: (el, i) => 100 * i,
		offset: '-=700',
	})
	.add({
		targets: '.text-section',
		translateY: [100, 0],
		opacity: [0, 1],
		offset: '-=700',
	})
	.add({
		targets: '.image-section',
		translateY: [-100, 0],
		opacity: [0, 1],
		offset: '-=1000',
	})
	.add({
		targets: '#gallery-headline',
		height: ['0px', '80px'],
		opacity: [0, 1],
		offset: '-=800',
	})
	.add({
		targets: '#gallery-loader',
		height: ['0px', '135px'],
		opacity: [0, 1],
		offset: '-=700',
	})
	.add({
		targets: '.ham-line',
		translateX: [500, 0],
		opacity: [0, 1],
		duration: 800,
		delay: (el, i) => 100 * i,
		offset: '-=700',
	})
	.add({
		targets: '.social a',
		translateX: [500, 0],
		opacity: [0, 1],
		delay: (el, i) => 200 * i,
		offset: '-=1000',
	})
	.add({
		targets: '.gallery-nav div',
		translateY: [500, 0],
		opacity: [0, 1],
		delay: (el, i) => 200 * i,
		offset: '-=1000',
	})
})


document.addEventListener('DOMContentLoaded', () => {
	// Navigation links hover
	let navLinks = document.querySelectorAll('nav a, .social a');

	navLinks.forEach((navLink) => {
		navLink.addEventListener('mouseenter', () => {
			let letter = navLink.querySelectorAll('.letter');
			anime.remove(letter);
			anime.timeline({
				targets: letter,
			})
			.add({
				translateX: [0, -30],
				opacity: [1, 0],
				easing: 'easeInExpo',
				duration: 500,
				delay: (el, i) => 30 * i,
			})
			.add({
				translateX: [40, 0],
				opacity: [0, 1],
				easing: 'easeOutExpo',
				duration: 1100,
				delay: (el, i) => 30 * i,
			})
		})
	})

	// Gallery nav hover
	let galleryLinks = document.querySelectorAll('.gallery-nav div');

	galleryLinks.forEach((galleryLink) => {
		galleryLink.addEventListener('mouseenter', () => {
			anime.remove(galleryLink);
			anime({
				targets: galleryLink,
				scale: 1.1,
				translateX: -5,
				translateY: -5,
				easing: 'easeOutExpo',
			})
		})

		galleryLink.addEventListener('mouseleave', () => {
			anime.remove(galleryLink);
			anime({
				targets: galleryLink,
				scale: 1,
				translateX: 0,
				translateY: 0,
				easing: 'easeOutExpo',
			})
		})
	})
})
/*
Use .fetch() to load in new html snippets. A function then removes the old HTML and adds
the new ones in the correct position in the DOM. Animate the whole thing in and out.
*/

let collectionsLink = document.querySelector('#collections-link');
let newLink = document.querySelector('#table');
let trendingLink = document.querySelector('#dress');
let popularLink = document.querySelector('#bed');

let linkArray = [collectionsLink, newLink, trendingLink, popularLink];

linkArray.forEach((eachLink) => {
	eachLink.addEventListener('click', (e) => {
		switch (eachLink) {
			case collectionsLink:
				fetchPage(eachLink, 'collections.html');
				break;

			case newLink:
				fetchPage(eachLink, 'newPage.html');
				break;

			case trendingLink:
				fetchPage(eachLink, 'trending.html');
				break;

			case popularLink:
				fetchPage(eachLink, 'popular.html');
				break;
		}
	})
});

function fetchPage(link, page) {
	let baseURL = `${window.location.protocol}//${window.location.hostname}`;

	if (window.location.port) {
		baseURL += `:${window.location.port}`;
	}

	fetch(`${baseURL}/${page}`)
		.then(function(response) {
			return response.text()
		})
		.then(function(html) {
			let doc = new DOMParser().parseFromString(html, "text/html");

			anime({
				targets: '.text-section h1, .text-section p, .text-section div',
				translateX: 700,
				opacity: 0,
				easing: 'easeInExpo',
				duration: 700,
				complete: (anim) => {
					document.querySelector('.column-wrapper').remove();
				}
			})

			setTimeout(function () {
				document.querySelector('body').insertBefore(doc.querySelector('.new-content'), document.querySelector('.gallery-nav'));

				anime({
					targets: '.new-content .text-section h1, .new-content .text-section p, .new-content .text-section div',
					translateX: [-600, 0],
					delay: (el, i) => 100 * i,
					opacity: [0, 1],
					easing: 'easeOutExpo',
				})
			}, 700);
		})
}



