'use strict';

import { WorkspaceConfiguration } from 'vscode';
import vscode = require("vscode");
import fs = require('fs');
import path = require('path');

export function run(scriptFolder: string, config: WorkspaceConfiguration) {

    const terminal: vscode.Terminal = vscode.window.createTerminal("Running scripts");
    terminal.show();

    scriptFolder += path.sep + "templateScripts";

    if (fs.existsSync(scriptFolder)) {
        fs.readdir(scriptFolder, function (err, files) {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                //Checks all supported filetypes
                runSupportedScript(file, config, terminal, scriptFolder);
            });
            let deleteScripts: boolean = config.get("deleteScripts", true);
            if (deleteScripts) {
                terminal.sendText("rm -r " + scriptFolder);
            }
        });
    }
}
/**
 * Returns a the prefix for running a supported filetype, otherwise null.
 * @param file The specified file.
 * @param config The workspace config with the settings variables.
 * @param terminal The new terminal window.
 */
function runSupportedScript(file: string, config: WorkspaceConfiguration, terminal: vscode.Terminal, workspace: string) {

    let suffix = path.extname(file).replace(".", "");
    let types: { [types: string]: string[] | null } = config.get("supportedScipts", {});
    let prefix: string[] | null = null;
    if (types !== undefined) {
        Object.keys(types).forEach(function (k) {
            if (k === suffix) {
                prefix = types[k];        
            }
        });
    }
    if (prefix !== null) {
        terminal.sendText(prefix + " " + workspace + path.sep + file);
    }
}