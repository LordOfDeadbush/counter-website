const GET_URL = "https://raw.githubusercontent.com/LordOfDeadbush/counter-website/main/count.txt"

const octokit = new Octokit({
    auth: 'YOUR-TOKEN'
})

async function getCount() {
    count = 0;
    fetch(GET_URL)
        .then((data) => data.text().then((data) => count = parseInt(data)));
        return count;
}

async function displayCount() {document.getElementById("count").innerHTML = await getCount();}

async function tally() {
    // get the initial count and add 1
    count = await getCount() + 1;

    // display the count
    document.getElementById("count").innerHTML = count;

    // TODO deploy a commit to github to increase count by 1

}

tally();