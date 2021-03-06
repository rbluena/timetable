const fs = require('fs');
const path = require('path');
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const getConfigurationFile = (file) => {
  const pathToConfigFile = `config/cypress.${file}.json`;
  const rawdata = fs.readFileSync(path.join('./', pathToConfigFile));
  const json = JSON.parse(rawdata);
  return !!file && json;
};

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  // config.ignoreTestFiles = '**/examples/*.spec.js';

  const environment = config.env.configFile;

  const configForEnvironment = getConfigurationFile(environment);
  configForEnvironment.ignoreTestFiles = '**/examples/*.spec.js';

  return configForEnvironment || config;
};
