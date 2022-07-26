const axios = require("axios");

const pipedrive_base_url = "https://api.pipedrive.com/v1/";
const pipedrive_token_api = process.env.GITHUB_TOKEN

/**
 *  create a person in pipedrive CRM
 * @param {string} name name of the person
 */
const createPerson = async (name) => {

    console.log(pipedrive_token_api)
  await axios.post(
    `${pipedrive_base_url}/person?api_token=${pipedrive_token_api}`,
    {
      name,
    }
  ).then(data => console.log(data)).catch(err => console.error(err))
//   console.log(status, data);
};

const createActivity = async (activityObject) => {};

module.exports = { createPerson, createActivity };
