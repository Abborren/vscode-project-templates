'use strict';

import vscode = require("vscode");
import fs = require('fs');
import path = require('path');

import ProjectTemplatesPlugin from "../projectTemplatesPlugin";

/**
 * Main command to create a new project script folder.
 * This command can be invoked by the Command Palette or in a folder context menu on the explorer view.
 * @export
 * @param {ProjectTemplatesPlugin} templateManager
 * @param {*} args
 */
export async function run(templateManager: ProjectTemplatesPlugin, args: any) {

    // get workspace folder
    let workspace = await templateManager.selectWorkspace(args);
    if (!workspace) {
        vscode.window.showErrorMessage("No workspace selected");
        return;
    }
    let dest = workspace + path.sep + "templateScripts"; 
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
    }
        
}