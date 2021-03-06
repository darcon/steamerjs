'use strict';

const SteamerPlugin = require('steamer-plugin'),
    config = require('./config');

const pluginPrefix = 'steamer-plugin-';

class ListPlugin extends SteamerPlugin {
    constructor(args) {
        super(args);
        this.argv = args;
        this.pluginName = 'steamer-plugin-list';
        this.description = 'list steamerjs commands';
    }

    list() {
        let files = this.filterCmds().sort();

        this.printListTitle();

        files.map((item) => {
            this.success(item);
        });

        this.printListUsage();
    }

    /**
     * get command names
     * @return {Array} [command file]
     */
    filterCmds() {
        let globalModules = this.getGlobalModules();
        if (!globalModules) {
            return [];
        }

        let files = this.fs.readdirSync(globalModules);

        files = files.filter((item) => {
            return item.indexOf(pluginPrefix) === 0;
        });

        files = files.map((item) => {
            return item.replace(pluginPrefix, '');
        });

        files = (files.concat(config.reserveCmd));

        return files;
    }

    /**
     * print title
     * @return {String} [title string]
     */
    printListTitle() {
        this.log('Hello! You can use following commands: ');
    }

    /**
     * print usage 
     * @return {String} [usage string]
     */
    printListUsage() {
        let msg = '';
        msg += this.printTitle('How to use above commands', 'white');
        msg += this.success('steamer <command>');
        msg += this.success('steamer <command> --[<args>]');
        msg += this.success('steamer <command> -[<args alias>]');
        msg += this.printEnd('white');
        return msg;
    }

    init() {
        this.list();
    }

    help() {
        this.printUsage('list all available commands', 'list');
    }
}

module.exports = ListPlugin;