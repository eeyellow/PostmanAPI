const axios = require('axios').default;
/**
 * 取得單一Environment
 * @param {String} environmentID
 * @returns
 */
 const ReadOne = async (environmentID) => {
    let url = `https://api.getpostman.com/environments/${environmentID}`;

    try {
        return await axios({
            url: url,
            method: 'GET',
            headers: {
                'X-Api-Key': global.APIKey
            },
        }).then((res) => {
            return res.data.environment;
        });
    } catch (err) {
        console.error(err);
        return ""
    }
}

module.exports = ReadOne;