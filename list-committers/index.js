const fetch = require("node-fetch");

/**
 * Goes through each page in the Github API and combines the data
 */
async function fetchDataFromGithub() {
  let data = [];
  let currentPage = 0;

  while (true) {
    await delay();
    const currentPageData = await fetchCommitApi(currentPage);
    if (currentPageData.length === 0) break;

    data = [...data, ...currentPageData];
    currentPage++;
  }

  return data;
}

/**
 * Creates a small delay so that github does not rate-limit us
 */
function delay() {
  return new Promise((resolve) => setTimeout(() => resolve(), 2000));
}

/**
 * Makes the call to Github API to fetch commit details.
 * See https://docs.github.com/en/free-pro-team@latest/rest/reference/repos#list-commits
 *
 * @param {number} page - The page number to be fetched
 */
function fetchCommitApi(page) {
  const URL =
    "https://api.github.com/repos/twindle-co/twindle/commits?per_page=100&page=" +
    page;
  return fetch(URL).then((data) => data.json());
}

/**
 * This is the main code that is to be run
 */
async function main() {
  const commitData = await fetchDataFromGithub();
  const uniqueCommitters = new Set();

  commitData.forEach(
    (commit) => commit.author && uniqueCommitters.add(commit.author.login)
  );

  Array.from(uniqueCommitters).forEach((user) => console.log(user));
}

main();
