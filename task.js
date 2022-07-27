
const GitHubApi = require('./github/github_api')
const Person = require('./model/Person')
const moment = require('moment');
const { createActivity } = require('./pipedrive/pipedrive_api');

const  watcher = async () => {

    const persons = await Person.find({ isDeleted: false });
    persons.forEach(async p => {

        const lastVisit = moment(p.lastVisit).toISOString()
        const { data } = await GitHubApi.getPublicGists(p.name, p.lastVisit ? lastVisit: undefined)
        const updatedPerson = await p.updateOne({ lastVisit: moment()})
        
        data.forEach(async d => {
            const activityObject = {
                subject: `Github Gist (${d.id})` ,
                note: `Owner: ${p.name} <br> 
                        Description:${d.description} <br> 
                        Pull requests URL: ${d.git_pull_url} <br> 
                        Comments URL: ${d.comments_url} <br> 
                        created_at: ${d.created_at} <br>                                                                                    
                        updated_at: ${d.updated_at} <br>
                        Comments Count: ${d.comments}
                        `,
                person_id: p.ppdvId,
            }
            await createActivity(activityObject)
            console.log(`Activity with subject ${activityObject.subject} for Person ${updatedPerson.name}`);
        })
    })
}

module.exports = { watcher }