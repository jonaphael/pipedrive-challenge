
const GitHubApi = require('./github/github_api')


const watcher = async () => {
    console.log('running')

    return;
    const { data } = await GitHubApi.getPublicGists('chronon')
    
    const { login } = data[0].owner
    await createPerson(login)
}

module.exports = { watcher }