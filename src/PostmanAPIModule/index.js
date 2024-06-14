const Workspaces = require('./workspaces')
const Collections = require('./collections')
const Environments = require('./environments')

global.APIKey = "";

const SetAPIKey = function (apikey) {
    global.APIKey = apikey;
}

module.exports = {
    SetAPIKey,
    Workspaces,
    Collections,
    Environments,
}