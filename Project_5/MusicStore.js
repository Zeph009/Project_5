/**
 *   @author Daniel King
 *   @version 0.0.1
 *   @summary Project 5 || created: 12.2.2018
 */

"use strict";
const PROMPT = require('readline-sync');

let continueResponse=1;
let musicList = [   // the [0] slot will be used to as ID so that musicList can be sorted.
                    // have to remember to work from 1 instead of 0. maybe make it three layers deep? or some kind of flag?
    ['Classical'],
    ['Easy Listening'],
    ['Jazz'],
    ['Pop'],
    ['Rock'],
    ['Other']
];
/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() {
    console.log(`\tWelcome to the Music Store.`);
    while (continueResponse === 1) {
        menu();
        setContinueResponse();
    }
}

main();
function menu(){
    console.log('\nwhat would you like to do? ');
    console.log('\nPress 1 to purchase music. ');
    let x =Number(PROMPT.question('\nPress 2 see a report of sales. '));
    if(x===1){
       salesMenu();
    }
    else{
        sort();
        salesReport();
    }
}
/**
 * @method
 * @desc continueResponse mutator
 * @returns {null}
 */
function setContinueResponse() {
    if (continueResponse === 1 || continueResponse === 0) {
        continueResponse = Number(PROMPT.question(`\nThank you. Do you want to continue? [0=no, 1=yes]: `));
        while (continueResponse !== 0 && continueResponse !== 1) {
            console.log(`${continueResponse} is an incorrect value. Please try again.`);
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}
function salesMenu() {
    let i;
    console.log('The available genres are: ');
    for (i = 0;i<musicList.length;i++){
        console.log(musicList[i][0]);
    }
    let genre= PROMPT.question(`\nWhich genre? `);

    for (i = 0;i<musicList.length;i++){
        if (genre===musicList[i][0])break;
    }
    if (i===musicList.length){
        console.log(genre+" is invalid.")
    }
    else {//moving on to the sale, guess they enter however much they want.
        let x = Number(PROMPT.question(`\nHow much are you paying? `));
        while (isNaN(x)){
            x = Number(PROMPT.question(`\nInvalid Amount. How much are you paying? `));
        }
        musicList[i].push(x);
        console.log(musicList[i][1]);
    }
}

/**
 * @method
 * @desc sorts the array by subarray length
 * @returns {null}
 */
function sort() {
    let swapCheck = 1;
    let temp;
    while (swapCheck) {
        swapCheck = 0;
        for (let i = musicList.length-1; i >0; i--) {
            console.log(i);
            if (musicList[i - 1].length < musicList[i].length) {
                temp = musicList[i];
                musicList[i] = musicList[i - 1];
                musicList[i - 1] = temp;
                swapCheck = 1;
            }
        }
    }
}

function salesReport(){
    let overTen,sixTen,threeSix,underThree,totalDownloads;
    console.log('Here is the report, in order by number of sales: ');
    for (let i = 0;i<musicList.length;i++){
        overTen=0,sixTen=0,threeSix=0,underThree=0;
        for(let j=1;j<musicList[i].length;j++){
            musicList[i][j]=Number(musicList[i][j]);
            if (musicList[i][j]>=10){
                overTen++;
            }
            else if (musicList[i][j]>=6){
                sixTen++;
            }
            else if (musicList[i][j]>=3){
                threeSix++;
            }
            else{
                underThree++;
            }
        }
        console.log('\n'+musicList[i][0]);
        console.log('\nSales over $10: '+overTen);
        console.log('\nSales between $6 and $9.99: '+sixTen);
        console.log('\nSales between $3 and $5.99: '+threeSix);
        console.log('\nSales under $3: '+underThree);
        totalDownloads=musicList[i].length-1;
        console.log('\nTotal '+musicList[i][0] +' Sales over $10: '+totalDownloads);

    }
}
