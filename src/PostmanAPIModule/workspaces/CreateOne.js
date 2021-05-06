const axios = require('axios').default;
/**
 * 新增Workspace
 * @param {String} workspaceID
 * @param {Object} data
 * @returns
 */
 const CreateOne = async (data) => {
    let url = `https://api.getpostman.com/workspaces`;

    try {
        return await axios({
            url: url,
            method: 'POST',
            data: {
                workspace: data
            },
            headers: {
                'X-Api-Key': global.APIKey,
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            return res.workspace;
        });
    } catch (err) {
        console.error(err);
        return ""
    }
}

module.exports = CreateOne;