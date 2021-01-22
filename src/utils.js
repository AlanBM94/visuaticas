import Circle from "./components/Circle";

export const createCircles = (value, properties) => {
    const circles = [];
    const { withOpacity, color, greaterValue } = properties;
    for (let i = 0; i < value; i++) {
        let circle = (
            <Circle
                key={i}
                delay={withOpacity ? greaterValue + (i + 2) : i}
                opacity={withOpacity}
                color={color}
            />
        );
        circles.push(circle);
    }
    return circles;
};

const createSpeechMessage = (message) => {
    const utterThis = new SpeechSynthesisUtterance(message);
    utterThis.lang = "es-ES";
    return utterThis;
};

export const playAudio = (message) => {
    const landingSpeech = createSpeechMessage(message);
    var myTimeout;
    function myTimer() {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
        myTimeout = setTimeout(myTimer, 2000);
    }
    window.speechSynthesis.cancel();
    myTimeout = setTimeout(myTimer, 2000);

    landingSpeech.onend = function () {
        clearTimeout(myTimeout);
    };
    window.speechSynthesis.speak(landingSpeech);
};
