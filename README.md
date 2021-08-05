# The Stupid Hackathon Opening Ceremony

This is a simulation of how the opening ceremony went.

![first page](https://user-images.githubusercontent.com/28398789/128280201-89bf301d-26b6-44e7-8287-d565857c3c1a.png)

![second page](https://user-images.githubusercontent.com/28398789/128280224-f721e0ab-92ea-48b9-b961-65c71568a7bf.png)

## The First Scene

### How was the animation done?

In the real thing, the numbers are counted and then rendered by websockets. But this is a simulation so we can just simulate it purely from javascript using Animation Frames. (Honestly I just copied from StackOverflow)

```js
function animate(obj, initVal, lastVal, duration, mode) {

    let startTime = null;

    // get the current timestamp and assign it to the currentTime variable
    let currentTime = Date.now();

    // pass the current timestamp to the step function
    const step = (currentTime) => {

        // if the start time is null, assign the current time to startTime
        if (!startTime) {
            startTime = currentTime;
        }

        // calculate the value to be used in calculating the number to be displayed
        const progress = Math.min((currentTime - startTime) / duration, 1);

        // calculate what to be displayed using the value gotten above
        let currVal = ~~(progress * (lastVal - initVal) + initVal);
        if (mode === 'percent') {
            obj.innerHTML = `${~~(currVal * 100 / lastVal)}%`;
        } else if (mode === 'slash') {
            obj.innerHTML = `${currVal}/${lastVal}`;
        } else if (mode === 'astro') {
            obj.style.transform = `translateX(calc(${(currVal * 100) / lastVal}vw - 110px)) rotate(${~~(((currVal * 360) / lastVal) * 4)}deg)`;
        } else {
            obj.innerHTML = currVal;
        }

        // checking to make sure the counter does not exceed the last value (lastVal)
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            window.cancelAnimationFrame(window.requestAnimationFrame(step));
        }
    };

    // start animating
    window.requestAnimationFrame(step);
}

const percentProgress = document.querySelector("#progress-percent");
const slashProgress = document.querySelector("#progress-slash");
const astro = document.querySelector("#astro");

const FirstScene = document.querySelector("#scene-container");
const LastScene = document.querySelector("#success-container");

const load = () => { // animation is triggered when body is loaded (<body onload="load()">)
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
```

### Notes

* `~~(number)` is the same thing as `Math.round(number)`
* The Animation function is modifed so we can inject multiple ways to animate the counting part.

## The Second Scene

The second scene is displayed after the animation from the first scene is done.

We can do this by using `SetTimeout` and setting the delay to the same time as the animation time.

After that we will change the first scenes property style to `display: none;`, essentially removing it from the document and then changing the second scene's style to `display: block;` instead.

This is different from how the 1M requests site as that website renders a different html page once we have hit 1M requests. This is just a simulation so we don't have to go through the hassle of doing so.

## Live Site

[See it live here](https://betich.github.io/stupid-opening-ceremony)
