/** 10 times always
 * 1. 10000 - 1
 * 2. 1000 - .10
 * 3. 100 - .01
 * 4. 10 - .001
 */

const roll_now = document.getElementsByClassName("button-inner");
const upClick = document.getElementsByTagName("button")[15];
const downClick = document.getElementsByTagName("button")[14];
let upClickCounter = 0;
roll_now[1].addEventListener("click", async function () {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isWin = document
        .getElementsByClassName("result")[0]
        .classList.contains("result_win");

    console.log(isWin);
    //get a random number from 1-3
    const random_number = Math.floor(Math.random() * 3) + 1;

    await new Promise((resolve) => setTimeout(resolve, random_number * 500));

    //get input value
    const input = document.getElementsByTagName("input")[1];

    if (input.value >= 0.064) {
        //make it 0.00001
        // click down to 3 times
        for (let i = 0; i < 6; i++) {
            //make it 13

            await new Promise((resolve) => setTimeout(resolve, 500));

            downClick.click();
            if (upClickCounter > 0) {
                upClickCounter--;
            }
        }
    } else {
        if (isWin) {
            console.log("win");
            for (let i = 0; i < upClickCounter; i++) {
                console.log("win loop");
                //wait for .5 second
                await new Promise((resolve) => setTimeout(resolve, 500));
                downClick.click();
            }
            upClickCounter = 0;
        } else {
            console.log("you lose");
            upClick.click();
            upClickCounter++;
            console.log(upClickCounter);
            await new Promise((resolve) => setTimeout(resolve, 500));
        }
    }

    //wait for 0.5 second
    await new Promise((resolve) => setTimeout(resolve, 500));
    //roll_now[1].click();
    roll_now[1].click();
});
