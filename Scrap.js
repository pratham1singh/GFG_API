const puppeteer = require("puppeteer");

async function getUserData(userName) {
  console.log("Fetching");
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.CHROME_EXECUTABLE_PATH || '/opt/render/.cache/puppeteer/chrome'
  });
  const page = await browser.newPage();
  await page.goto(`https://www.geeksforgeeks.org/user/${userName}/`);

  // Wait for the required elements to load
  await page.waitForSelector(".profilePicSection_head_userRankContainer_rank__abngM");

  // Extract user data
  const userData = await page.evaluate(() => {
    const copyright = "Pratham Singh https://www.linkedin.com/in/pratham-singh-800a0822a/";
    const rank = document.querySelector(".profilePicSection_head_userRankContainer_rank__abngM b").innerText;
    const streak = document.querySelector(".circularProgressBar_head_mid_streakCnt__MFOF1").childNodes[0].textContent;
    const overallScore = document.querySelector(".scoreCards_head__G_uNQ").childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerText;
    const totalSolved = document.querySelector(".scoreCards_head__G_uNQ").childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerText;
    const monthlyScore = document.querySelector(".scoreCards_head__G_uNQ").childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerText;
    const instituteName = document.querySelector(".educationDetails_head_left--text__tgi9I").innerText;
    const languages = document.querySelector(".educationDetails_head_right--text__lLOHI").innerText;
    const problems = document.querySelector(".problemListSection_head__JAiP6");
    const medium = Array.from(problems.childNodes[1].childNodes[0].childNodes).map(element => element.childNodes[0].innerText);
    const easy = Array.from(problems.childNodes[0].childNodes[0].childNodes).map(element => element.childNodes[0].innerText);
    const hard = Array.from(problems.childNodes[2].childNodes[0].childNodes).map(element => element.childNodes[0].innerText);
    return {
      copyright,
      instituteName,
      languages,
      rank,
      streak,
      overallScore,
      monthlyScore,
      totalSolved,
      easy,
      medium,
      hard,
    };
  });

  await browser.close();
  console.log("Fetched");
  return userData;
}

module.exports = getUserData;
