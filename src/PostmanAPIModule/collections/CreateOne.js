const axios = require('axios').default;
/**
 * 新增Collection
 * @param {String} workspaceID
 * @param {Object} data
 * @returns
 */
const CreateOne = async (workspaceID, data) => {
    let url = `https://api.getpostman.com/collections?workspace=${workspaceID}`;

    try {
        return await axios({
            url: url,
            method: 'POST',
            data: {
                collection: data
            },
            headers: {
                'X-Api-Key': global.APIKey,
                'Content-Type': 'application/json'
            },
        }).then((res) => {
            return res;
        });
    } catch (err) {
        console.error(err);
        return ""
    }
}

module.exports = CreateOne;