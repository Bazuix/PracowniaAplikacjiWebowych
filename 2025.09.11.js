let numbers = [1,2,3,4,6,7,8,9,10];
let threshold = 5;
let appName ="Pierwsze zadanie";

function isGreaterThanThreshold(number, threshold) {
    if (number < threshold) {
        console.log("not greater than threshold");
    } else {
        console.log("greater than threshold");
    }
}
function isEven(number){
    return number % 2 === 0;
}
console.log(`${appName}`);
for(let i =0;i< numbers.length;i++){
    let n = numbers[i];
    if(isEven(n)){
        console.log(`${n} is even`);
    }else{
        console.log(`${n} is not even`);
    }
    isGreaterThanThreshold(n,threshold);
}
