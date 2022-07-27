const axios = require("axios");

const pipedrive_base_url = "https://api.pipedrive.com/v1";
const pipedrive_token_api = process.env.PIPEDRIVE_TOKEN

/**
 *  create a person in pipedrive CRM
 * @param {string} name name of the person
 */
const createPerson = async (name) => {
  try {
    return axios.post(
      `${pipedrive_base_url}/persons?api_token=${pipedrive_token_api}`,
      {
        name,
      }
    )
  } catch (error) {
    return error
  }
};

/**
 * Create an activity in pipedrive CRM
 * 
 * @param {*} activityObject // containing the subject of the activity
 *                           // also a note and the person_id for this activity
 * @returns 
 */
const createActivity = async (activityObject) => {
  try {
    return axios.post(
      `${pipedrive_base_url}/activities?api_token=${pipedrive_token_api}`, activityObject)
  } catch (error) {
    return error
  }
 };

module.exports = { createPerson, createActivity };
