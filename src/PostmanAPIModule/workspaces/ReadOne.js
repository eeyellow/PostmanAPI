const axios = require('axios').default;
/**
 * 取得單一Wrokspace
 * @param {String} workspaceID
 * @returns
 */
 const ReadOne = async (workspaceID) => {
    let url = `https://api.getpostman.com/workspaces/${workspaceID}`;

    try {
        return await axios({
            url: url,
            method: 'GET',
            headers: {
                'X-Api-Key': global.APIKey
            },
        }).then((res) => {
            return res.data.workspace;
        });
    } catch (err) {
        console.error(err);
        return ""
    }
}

module.exports = ReadOne;