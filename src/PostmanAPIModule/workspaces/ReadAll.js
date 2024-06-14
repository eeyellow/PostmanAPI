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
        console.error(``)
        console.error(`==============================`)
        console.error(`Workspaces ReadAll Error !`)
        console.error({
            status: err.response.status,
            statusText: err.response.statusText,
        })
        console.error("無法存取Workspaces，請檢查.env設定，確認APIKey是否過期。")
        console.error(`==============================`)
        console.error(``)
        return ""
    }
}

module.exports = ReadAll;