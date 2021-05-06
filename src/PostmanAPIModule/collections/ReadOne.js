const axios = require('axios').default;
/**
 * 取得單一Collection
 * @param {String} collectionID
 * @returns
 */
 const ReadOne = async (collectionID) => {
    let url = `https://api.getpostman.com/collections/${collectionID}`;

    try {
        return await axios({
            url: url,
            method: 'GET',
            headers: {
                'X-Api-Key': global.APIKey
            },
        }).then((res) => {
            return res.data.collection;
        });
    } catch (err) {
        console.error(err);
        return ""
    }
}

module.exports = ReadOne;