
const navbar = document.getElementsByClassName("navbar-container")[0];

const scrollFlagIds = {
	"hero-logo": "yellow-navbar",
	"menu": "black-navbar"
}

const convertVhToPixels = vh => ( window.innerHeight / 100 ) * vh;

const debounce = (fn) => {

	let frame;

    return (...params) => {

		if (frame) {
            cancelAnimationFrame(frame);
        }


		frame = requestAnimationFrame(() => {
			fn(...params);
        });
    };
};

const onScroll = () => {

	if (
		document.getElementById("hero-logo").getBoundingClientRect().bottom > 0
	) return navbar.classList.remove("black-navbar", "yellow-navbar")

	let scrollFlags = [];
	for (id in scrollFlagIds) scrollFlags.push({
		"flag": document.getElementById(id).getBoundingClientRect().top - convertVhToPixels(9),
		"class": scrollFlagIds[id]
	})

	const closestFlag = scrollFlags.reduce((a, b) => ( b.flag < 0 && b.flag > a.flag ) ? b : a);

	if (!navbar.classList.contains(closestFlag.class)) navbar.classList.replace(
		closestFlag.class == "black-navbar" ? "yellow-navbar" : "black-navbar",
		closestFlag.class
	) || navbar.classList.add("yellow-navbar")

};


document.addEventListener('scroll', debounce(onScroll), { passive: true });
onScroll();