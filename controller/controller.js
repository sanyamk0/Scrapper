const { default: axios } = require("axios");
const cheerio = require("cheerio");
const baseUrl = "https://internshala.com/jobs/work-from-home/";

exports.scrapper = async (req, res) => {
  const response = await axios.get(baseUrl);
  const obj = [];
  let $ = cheerio.load(response.data);

  const jobs = $(".heading_4_5.profile .view_detail_button")
    .map(function () {
      return $(this).text();
    })
    .get();

  const companies = $(
    ".heading_6.company_name .link_display_like_text.view_detail_button"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get();

  const jobPostedDateInfo = $(
    ".posted_by_container .status-container .success_and_early_applicant_wrapper .status.status-small.status-info"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get();

  const jobPostedDateSuccess = $(
    ".posted_by_container .status-container .success_and_early_applicant_wrapper .status.status-small.status-success"
  )
    .map(function () {
      return $(this).text().trim();
    })
    .get();

  for (let i = 0; i < jobs.length; i++) {
    obj.push({ jobTitle: jobs[i] });
    obj.push({ companyName: companies[i] });
    obj.push({
      jobPostedDate:
        jobPostedDateInfo[i] !== undefined
          ? jobPostedDateInfo[i]
          : jobPostedDateSuccess[i],
    });
  }
  console.log(obj);
};
