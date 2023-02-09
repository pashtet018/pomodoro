import { alarm } from "./alarm.js";
import { state } from "./state.js"
import { addZero } from "./util.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

export const showTime = (seconds) => {
    minutesElem.textContent = addZero(Math.floor(seconds / 60));
    secondsElem.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
    state.timeLeft -= 1;

    showTime(state.timeLeft);

    if(state.timeLeft > 0 && state.isActive) {
        state.timerId = setTimeout(startTimer, 1000);
    }

    if(state.timeLeft <=0) {
        alarm();

        if(state.status === 'work') {
            state.activeTodo.pomodoro +=1;
            state.status = 'break'
        } else {
            state.status = 'work'
        }
    }
}