const Octokit = require('octokit').Octokit

class GitHubApi {
    static _instance = undefined;

    static getInstance() {
        if (this._instance)
            return this._instance
        
        this._instance = new Octokit({
            auth: process.env.GITHUB_TOKEN
        })
        return this._instance;
    }
    
    static async getPublicGists(username = '') {
        return await this.getInstance().request('GET /users/{username}/gists', {
            username
        })
    }
}

module.exports = GitHubApi