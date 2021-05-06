const axios = require('axios').default;
/**
 * 更新Environment
 * @param {String} environmentID
 * @param {Object} data
 * @returns
 */
const UpdateOne = async (environmentID, data) => {
    let url = `https://api.getpostman.com/environments/${environmentID}`;

    try {
        return await axios({
            url: url,
            method: 'PUT',
            data: {
                environment: data
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

module.exports = UpdateOne;