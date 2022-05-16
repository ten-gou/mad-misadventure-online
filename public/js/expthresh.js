const expLimit = document.getElementById('ExpThreshhold');
const currentLevel = document.getElementById('currentLevel');

const maxEXP = () => {

    const str = currentLevel.textContent;

    const int = parseInt(str, 10);

    const expThreshhold = (int + 1) * 1000;

    expLimit.textContent = expThreshhold;
}

maxEXP();