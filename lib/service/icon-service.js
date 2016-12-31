"use strict";

const {CompositeDisposable, Disposable} = require("atom");
const StrategyManager = require("./strategy-manager.js");
const FileSystem = require("../filesystem/filesystem.js");
const IconTables = require("../icons/icon-tables.js");
const IconNode = require("./icon-node.js");


class IconService{
	
	init(paths){
		this.disposables = new CompositeDisposable();
		StrategyManager.init();
		this.isReady = true;
	}
	
	
	reset(){
		this.disposables.dispose();
		this.disposables.clear();
		this.disposables = null;
		
		StrategyManager.reset();
		this.isReady = false;
	}
	
	
	iconClassForPath(path, context = ""){
		const file = FileSystem.get(path);
		return file.icon.getClasses() || null;
	}
	
	
	addIconToElement(element, options){
		return IconNode.forElement(element, options);
	}
}

IconService.prototype.isReady = false;

module.exports = new IconService();


/**
 * Noop to suppress breakage at runtime.
 *
 * TODO: Delete once these PRs have all been publicly shipped -
 *
 *    atom/tree-view#967
 *    atom/tabs/#392
 *    atom/find-and-replace#802
 *    atom/fuzzy-finder#262
 *    atom/archive-view#40
 *
 * TODO: Don't forget to crank the minimum required Atom version, too.
 */
module.exports.onWillDeactivate = function(){
	const {Disposable} = require("atom");
	return new Disposable();
};