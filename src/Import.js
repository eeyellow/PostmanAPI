require('dotenv').config()
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
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
    let targetWorkspaceID = '';
    //檢查Workspace是否存在
    if (targetWorkspace == undefined) {
        let newWorkspaceData = {
            "name": TEAM_WORKSPACE_NAME,
            "type": "personal",
        };
        targetWorkspace = await postman.Workspaces.CreateOne(newWorkspaceData);
    }
    targetWorkspaceID = targetWorkspace.id

    let LCWorkspace = await postman.Workspaces.ReadOne(targetWorkspaceID);

    //#region ====== Collections ======
    //取得Data資料夾中的所有Collections
    let CollectionsDir = `./Data/Collections`;
    let CollectionFiles = fs.readdirSync(CollectionsDir).filter((file) => { //篩選.json結尾的檔案
        let ext = `.json`;
        return new RegExp(ext + '$').test(file);
    }).map(file => file.replace('.json', ''));
    //取得Workspace中所有的Collections
    let LCCollections = LCWorkspace.collections;

    for (let i = 0; i < CollectionFiles.length; i++){
        let collectionName = CollectionFiles[i];
        if (LCCollections == undefined || !LCCollections.map(e => e.name).includes(collectionName)) {
            //沒有資料，用Create
            fs.readFile(path.resolve(CollectionsDir, collectionName + '.json'), async function (err, data) {
                let createResult = await postman.Collections.CreateOne(targetWorkspaceID, JSON.parse(data.toString()));
            });
        }
        else {
            //有資料，用Update
            let collectionID = LCCollections.find(e => e.name == collectionName).id;
            fs.readFile(path.resolve(CollectionsDir, collectionName + '.json'), async function (err, data) {
                let createResult = await postman.Collections.UpdateOne(collectionID, JSON.parse(data.toString()));
            });
        }
    }
    //#endregion ====== Collections ======

    //#region ====== Environments ======
    //取得Data資料夾中的所有Environments
    let EnvironmentsDir = `./Data/Environments`;
    let EnvironmentFiles = fs.readdirSync(EnvironmentsDir).filter((file) => { //篩選.json結尾的檔案
        let ext = `.json`;
        return new RegExp(ext + '$').test(file);
    }).map(file => file.replace('.json', ''));
    //取得Workspace中所有的Environments
    let LCEnvironments = LCWorkspace.environments;

    for (let i = 0; i < EnvironmentFiles.length; i++){
        let environmentName = EnvironmentFiles[i];
        if (LCEnvironments == undefined || !LCEnvironments.map(e => e.name).includes(environmentName)) {
            //沒有資料，用Create
            fs.readFile(path.resolve(EnvironmentsDir, environmentName + '.json'), async function (err, data) {
                let createResult = await postman.Environments.CreateOne(targetWorkspaceID, JSON.parse(data.toString()));
            });
        }
        else {
            //有資料，用Update
            let environmentID = LCEnvironments.find(e => e.name == environmentName).id;
            fs.readFile(path.resolve(EnvironmentsDir, environmentName + '.json'), async function (err, data) {
                let createResult = await postman.Environments.UpdateOne(environmentID, JSON.parse(data.toString()));
            });
        }
    }
    //#endregion ====== Environments ======
}

Init();