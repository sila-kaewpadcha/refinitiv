const axios = require('axios');

( async function main() {
    axios.defaults.withCredentials = true;
    let parsedFundName;
    process.argv.forEach((val, i, arr)=> {
        if(i==2) {
            parsedFundName = val;
        }
    });
    const codeQuiz = await axios.get('https://codequiz.azurewebsites.net/', {
        headers: {
            "Cookie": "hasCookie=true"
        }
    }).then(res=>res.data);
    const indexFund = codeQuiz.indexOf(parsedFundName);
    if(indexFund == -1) {
        return console.log("Fund not found!");
    }
    // search string and get nav price
    let startPos = indexFund + parsedFundName.length + 9;
    if(codeQuiz.substring(startPos, startPos + 1) === ">") startPos+=1;
    const substr = codeQuiz.substring(startPos, startPos + 10);
    const [price] = substr.split("<");
    console.log(`NAV price of ${parsedFundName} :: ${price}`);
})();
