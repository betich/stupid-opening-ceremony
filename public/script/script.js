function animate(obj, initVal, lastVal, duration, mode) {

    let startTime = null;

    //get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();

    //pass the current timestamp to the step function
    const step = (currentTime) => {

        //if the start time is null, assign the current time to startTime
        if (!startTime) {
            startTime = currentTime ;
        }

        //calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime  - startTime) / duration, 1);

        //calculate what to be displayed using the value gotten above
		let currVal = ~~(progress * (lastVal - initVal) + initVal);
		if (mode === 'percent') {
			obj.innerHTML = `${~~(currVal * 100 / lastVal)}%`;
		}
		else if (mode === 'slash') {
			obj.innerHTML = `${currVal}/${lastVal}`;
		}
		else if (mode === 'astro') {
			obj.style.transform = `translateX(calc(${(currVal * 100) / lastVal}vw - 110px)) rotate(${~~(((currVal * 360) / lastVal) * 4)}deg)`;
		}
		else {
			obj.innerHTML = currVal;
		}

        //checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
        else {
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };

    //start animating
    window.requestAnimationFrame(step);
}

const percentProgress = document.querySelector("#progress-percent");
const slashProgress = document.querySelector("#progress-slash");
const astro = document.querySelector("#astro");

const FirstScene = document.querySelector("#scene-container");
const LastScene = document.querySelector("#success-container");

const load = () => {
	const max = 1_000_000;
	const animation_time = 5000;
    animate(percentProgress, 0, max, animation_time, 'percent');
    animate(slashProgress, 0, max, animation_time, 'slash');
	animate(astro, 0, max, animation_time, 'astro');

	setTimeout(() => {
		FirstScene.style.display = "none";
		LastScene.style.display = "block";
	}, animation_time);
}