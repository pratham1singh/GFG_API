const puppeteer = require("puppeteer");

async function getUserData(userName) {
  console.log("Fetching");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://www.geeksforgeeks.org/user/${userName}/`);
 
  // Wait for the required elements to load
  const selector = ".profilePicSection_head_userRankContainer_rank__abngM";
  try {
    await page.waitForSelector(selector, { timeout: 5000 }); // Adjust timeout as needed
  } catch (error) {
    // console.error(`User ${userName} not found`);
    await browser.close();
    return {
      "Status":`User ${userName} not found`,
      "Pratham ":"You have entered wrong username , try again. Thank you!"
    }; 
  }

 
  const userData = await page.evaluate(() => {
    const copyright =
      "Pratham Singh https://www.linkedin.com/in/pratham-singh-800a0822a/";
    const rank = document
      .querySelector(".profilePicSection_head_userRankContainer_rank__abngM")
      .getElementsByTagName("b")[0].innerText;
    const streak = document.querySelector(
      ".circularProgressBar_head_mid_streakCnt__MFOF1"
    ).childNodes[0].textContent;
    const overallScore = document.querySelector(".scoreCards_head__G_uNQ")
      .childNodes[0].childNodes[0].childNodes[0].childNodes[1].innerText;
    const totalSolved = document.querySelector(".scoreCards_head__G_uNQ")
      .childNodes[1].childNodes[0].childNodes[0].childNodes[1].innerText;
    const monthlyScore = document.querySelector(".scoreCards_head__G_uNQ")
      .childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerText;
    const instituteName = document.querySelector(
      ".educationDetails_head_left--text__tgi9I"
    ).innerText;
    const languages = document.querySelector(
      ".educationDetails_head_right--text__lLOHI"
    ).innerText;
    const problems = document.querySelector(".problemListSection_head__JAiP6");
    const medium = Array.from(
      problems.childNodes[1].childNodes[0].childNodes
    ).map((element) => {
      return element.childNodes[0].innerText;
    });
    const easy = Array.from(
      problems.childNodes[0].childNodes[0].childNodes
    ).map((element) => {
      return element.childNodes[0].innerText;
    });
    const hard = Array.from(
      problems.childNodes[2].childNodes[0].childNodes
    ).map((element) => {
      return element.childNodes[0].innerText;
    });
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

  // console.log(userData);
  await browser.close();
  console.log("Fetched");
  return userData;
}
module.exports = getUserData;
