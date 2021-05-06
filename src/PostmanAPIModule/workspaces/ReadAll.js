const axios = require('axios').default;
/**
 * 取得所有的Workspaces
 * @returns {Array}
 */
const ReadAll = async () => {
    let url = `https://api.getpostman.com/workspaces/`;

    try {
        return await axios({
            url: url,
            method: 'GET',
            headers: {
                'X-Api-Key': global.APIKey
            },
        }).then((res) => {
            return res.data.workspaces;
        });
    } catch (err) {
        console.error(err);
        return ""
    }
}

module.exports = ReadAll;