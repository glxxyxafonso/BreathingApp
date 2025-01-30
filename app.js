const inhaleDuration = 4000;
const exhaleDuration = 6000;
const totalDuration = 180000;
const getReadyDuration = 5000;

let startTime;
let inhaleExhaleToggle = true;

const promptElement = document.getElementById('prompt');
const descriptionElement = document.getElementById('description');
const animationElement = document.getElementById('animation');

function startBreathingExercise() {
    promptElement.textcontent = 'Get ready...';
    setTimeout(() => {
        promptElement.classList.add('fade-out');
        descriptionElement.classList.add('fade-out');
        setTimeout(() => {
            promptElement.classList.remove('fade-out');
            startTime = Date.now();
            updateBreathingPrompt();
        }, 500);
    }, getReadyDuration);
}

function updateBreathingPrompt() {
    const elapsedTime = Date.now() - startTime;

    if (elapsedTime < totalDuration) {
        if (inhaleExhaleToggle) {
            console.log("Inhale");
            promptElement.textContent = "Inhale...";
            animationElement.classList.add('inhale-animation');
            animationElement.classList.remove('exhale-animation');
            setTimeout(() => {
                inhaleExhaleToggle = false;
                updateBreathingPrompt();
            }, inhaleDuration);
        } else {
            console.log("Exhale");
            promptElement.textContent = "Exhale...";
            animationElement.classList.add('exhale-animation');
            animationElement.classList.remove('inhale-animation');
            setTimeout(() => {
                inhaleExhaleToggle = true;
                updateBreathingPrompt();
            }, exhaleDuration);
        }
    } else {
        promptElement.textContent = "Well done. Feeling better?"
        animationElement.classList.remove('inhale-animation', 'exhale-animation')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startBreathingExercise();
});

document.getElementById('catButton').addEventListener('click', function() {
    fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => {
            const catImageContainer = document.getElementById('catImageContainer');
            catImageContainer.innerHTML = `<img src="${data[0].url}" alt="Cute Cat">`;
        })
        .catch(error => console.error('Error fetching cat image:', error));
});
