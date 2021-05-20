require('dotenv').config()
const axios = require('axios').default;
const fs = require('fs');
const postman = require('./PostmanAPIModule')

//讀取.env設定檔的內容
const POSTMAN_APIKey = process.env.POSTMAN_APIKey;
const TEAM_WORKSPACE_NAME = process.env.TEAM_WORKSPACE_NAME;
postman.SetAPIKey(POSTMAN_APIKey);

async function Init() {

    //先取得所有的Workspaces
    let workspaces = await postman.Workspaces.ReadAll();

    //用特定的名稱篩選
    let targetWorkspace = workspaces.find(w => w.name == TEAM_WORKSPACE_NAME);

    if (targetWorkspace != undefined) {
        let LCWorkspace = await postman.Workspaces.ReadOne(targetWorkspace.id);

        //匯出所有的Collections
        let LCCollections = LCWorkspace.collections;
        for (let i = 0; i < LCCollections.length; i++) {
            let collection = await postman.Collections.ReadOne(LCCollections[i].id);
            delete collection.info._postman_id;
            collection.item.forEach(function (item) {
                delete item.id;
            });

            let filePath = `./Data/Collections/${collection.info.name}.json`;
            if (fs.existsSync(filePath)) { //若檔案存在
                fs.unlinkSync(filePath) //刪除檔案
            }

            //寫入檔案
            fs.writeFile(filePath, JSON.stringify(collection, null, 4), { flag: 'wx' }, function (err, data) {
                if (err) {
                    return console.log(err);
                }
            });
        }

        //匯出所有的Environments
        let LCEnvironments = LCWorkspace.environments;
        for (let i = 0; i < LCEnvironments.length; i++) {
            let environment = await postman.Environments.ReadOne(LCEnvironments[i].id);
            delete environment.id;

            let filePath = `./Data/Environments/${environment.name}.json`;
            if (fs.existsSync(filePath)) { //若檔案存在
                fs.unlinkSync(filePath) //刪除檔案
            }

            //寫入檔案
            fs.writeFile(filePath, JSON.stringify(environment, null, 4), { flag: 'wx' }, function (err, data) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    }
}

Init();