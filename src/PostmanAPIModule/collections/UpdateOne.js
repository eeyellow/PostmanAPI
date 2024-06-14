const axios = require('axios').default;
/**
 * 更新Collection
 * @param {String} collectionID
 * @param {Object} data
 * @returns
 */
const UpdateOne = async (collectionID, data) => {
    let url = `https://api.getpostman.com/collections/${collectionID}`;

    try {
        return await axios({
            url: url,
            method: 'PUT',
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

module.exports = UpdateOne;