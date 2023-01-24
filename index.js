import { Octokit, App } from "https://cdn.skypack.dev/octokit";



const GET_URL = "https://raw.githubusercontent.com/LordOfDeadbush/counter-website/main/count.txt";
const SHA_URL = "https://api.github.com/repos/LordOfDeadbush/counter-website/contents/count.txt";

const octokit = new Octokit({
    auth: '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'
})

async function getSha() {
    var metadata = await fetch(SHA_URL);
    var metadata_json = await metadata.json();
    var sha = metadata_json["sha"];
    // console.log(sha);
    return sha;
}

async function getCount() {
    var data = await fetch(GET_URL);
    var text = data.text();
    return text;
}

async function displayCount() {document.getElementById("count").innerHTML = await getCount();}

async function commitCount(count) {
    var sha = await getSha();
    console.log(sha);
    await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: 'LordOfDeadbush',
        repo: 'counter-website',
        path: 'count.txt',
        message: 'updated count to ${count}',
        committer: {
            name: 'LordOfDeadbush',
            email: 'agummylizard@gmail.com'
        },
        content: btoa(count),
        sha: sha,
    })
}

async function tally() {
    // get the initial count and add 1
    count = await getCount();
    count++;
    console.log(count);
    // display the count
    document.getElementById("count").innerHTML = count;

    // TODO deploy a commit to github to increase count by 1
    commitCount(count);

}

tally();