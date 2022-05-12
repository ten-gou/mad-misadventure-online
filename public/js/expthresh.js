const ExpLimit = document.getElementById('ExpThreshhold');
const currentLevel = document.getElementById('currentLevel');

const MaxEXP = () => {

    const str = currentLevel.textContent;

    const int = parseInt(str, 10)

    const ExpThreshhold = (int + 1) * 1000

    ExpLimit.textContent = ExpThreshhold;
}

MaxEXP();