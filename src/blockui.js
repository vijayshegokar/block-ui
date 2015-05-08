/**
 * This javascript library can be used to block the UI.
 * 
 * @author Vijay Shegokar
 * @version 1.0
 * @date 07-May-2015
 * 
 * My purpose of creating this library to help HTML and Frontend developers to
 * block ui while waiting for some ajax call response or user wants to block ui
 * due to some requirement.
 */
function BlockUI(options) {
	if(!options)
		options = {};
	
	this.elementBlock = false;
	if(options.area) {
		var blockingArea = document.getElementById(options.area);
		this.area = blockingArea;
		this.elementBlock = true;
	} else {
		this.area = document.body;
		this.elementBlock = false;
	}
	
	this.id = null;
	
	if(options.log == true)
		this.log = true;
	else
		this.log = false;
	
	if(this.elementBlock) {
		this.parentCssClass = "blockui blockuiEParent";
	} else {
		this.parentCssClass = "blockui blockuiParent";
	}
	if(options.parentCssClass)
		this.parentCssClass += " " + options.parentCssClass;
	
	if(this.elementBlock) {
		this.darkbgCssClass = "blockui darkEBg";
	} else {
		this.darkbgCssClass = "blockui darkBg";
	}
	if(options.darkbgCssClass)
		this.darkbgCssClass += " " + options.darkbgCssClass;
	
	if(this.elementBlock) {
		this.contentCssClass = "blockui blockuiEContent";
	} else {
		this.contentCssClass = "blockui blockuiContent";
	}
	if(options.contentCssClass)
		this.contentCssClass += " " + options.contentCssClass;
	
	if(this.elementBlock) {
		this.msgParentCssClass = "blockui messageEParent";
	} else {
		this.msgParentCssClass = "blockui messageParent";
	}
	if(options.msgParentCssClass)
		this.msgParentCssClass += " " + options.msgParentCssClass;
	
	this.blockMsgHtml = null;
	if(options.blockMsgHtml)
		this.blockMsgHtml = options.blockMsgHtml;
	
	if(this.elementBlock) {
		this.loaderParentCssClass = "blockui loaderEParent";
	} else {
		this.loaderParentCssClass = "blockui loaderParent";
	}
	if(options.loaderParentCssClass)
		this.loaderParentCssClass += " " + options.loaderParentCssClass;
	
	this.loaderIconHtml = null; //"<img src='images/loader.gif' class='blockui loaderIcon'/>";
	if(options.loaderIconHtml)
		this.loaderIconHtml = options.loaderIconHtml;
	
}

BlockUI.prototype.blockedArray = new Array();

var $b = {
	blockuiInstacne : null, // It will hold the BlockUI instance which is created in below blockUI function
	// To block the ui
	blockUI : function(options) {
		this.blockuiInstacne = new BlockUI(options).blockUI();
		return this.blockuiInstacne;
	},
	// To unblock the blocked ui
	unblockUI : function(blockuiInstacne, options) {
		if(blockuiInstacne) {
			blockuiInstacne.unblockUI(options);
		} else {
			this.blockuiInstacne.unblockUI(options);
		}
	}
}

//Add methods like this. All InfiniteScroll objects will be able to invoke this
BlockUI.prototype.blockUI = function() {
	this.id = this.blockedArray.length;
	this.addBlockHTML();
	this.blockedArray.push(this);
	return this;
};



BlockUI.prototype.unblockUI = function() {
	// remove block area
	this.removeBlockUIParent();
	this.blockedArray.splice(this.id, 1);
}

BlockUI.prototype.addBlockHTML = function() {
	var blockuiParent = this.createBlockUIParent();
	this.createDarkBg(blockuiParent);
	var blockuiContent = this.createBLockUIContent();
	if(this.loaderIconHtml) {
		this.createLoader(blockuiContent);	
	}
	if(this.blockMsgHtml) {
		if(this.loaderIconHtml) {
			blockuiContent.appendChild(document.createElement("br"));
		}
		this.createMessage(blockuiContent);
	}
	blockuiParent.appendChild(blockuiContent);
	this.area.appendChild(blockuiParent);
	if(this.elementBlock) {
		this.centerEFixed(blockuiParent, this.area);
		//this.centerFixed(blockuiContent, blockuiParent);
	} else {
		this.centerFixed(blockuiParent);
	}
}

BlockUI.prototype.createBlockUIParent = function() {
	var blockuiParent = document.createElement("div");
	blockuiParent.setAttribute("class", this.parentCssClass);
	blockuiParent.setAttribute("id", "blockuiParent" + this.id);
	return blockuiParent;
}

BlockUI.prototype.removeBlockUIParent = function() {
	var id = this.id;
	var deletingBlockuiParent = document.getElementById("blockuiParent" + id);
	deletingBlockuiParent.outerHTML = "";
	delete deletingBlockuiParent;
}

BlockUI.prototype.createBLockUIContent = function() {
	var blockuiContent = document.createElement("div");
	blockuiContent.setAttribute("class", this.contentCssClass);
	blockuiContent.setAttribute("id", "blockuiContent" + this.id);
	return blockuiContent;
}

BlockUI.prototype.createDarkBg = function(blockuiParent) {
	var darkBgNode = document.createElement("div");
	darkBgNode.setAttribute("class", this.darkbgCssClass);
	darkBgNode.setAttribute("id", "darkBg" + this.id);
	blockuiParent.appendChild(darkBgNode);
}

BlockUI.prototype.removeDarkBg = function() {
	var id = this.id;
	var deletingDarkBg = document.getElementById("darkBg" + id);
	deletingDarkBg.outerHTML = "";
	delete deletingDarkBg;
//	deletingDarkBg.parentElement.removeChild(deletingDarkBg);
}

BlockUI.prototype.createMessage = function(blockuiContent) {
	// user has set the default block ui message
	var blockMsgParentNode = document.createElement("div");
	blockMsgParentNode.setAttribute("class", this.msgParentCssClass);
	blockMsgParentNode.setAttribute("id", "messageParent" + this.id);
	blockMsgParentNode.innerHTML = this.blockMsgHtml;
	/*var blockMsgNode = document.createElement("div");
	blockMsgNode.setAttribute("class", this.blockMsgCssClass);
	blockMsgNode.setAttribute("id", "msg" + this.id);
	blockMsgParentNode.appendChild(blockMsgNode);*/
	blockuiContent.appendChild(blockMsgParentNode);
}

BlockUI.prototype.removeMsg = function() {
	var id = this.id;
	var deletingMsg = document.getElementById("messageParent" + id);
	deletingMsg.outerHTML = "";
	delete deletingMsg;
//	deletingMsg.parentElement.removeChild(deletingMsg);
}

BlockUI.prototype.createLoader = function(blockuiContent) {
	// user has set the default block ui message
	var blockLoaderParentNode = document.createElement("div");
	blockLoaderParentNode.setAttribute("class", this.loaderParentCssClass);
	blockLoaderParentNode.setAttribute("id", "loaderParent" + this.id);
	blockLoaderParentNode.innerHTML = this.loaderIconHtml;
	blockuiContent.appendChild(blockLoaderParentNode);
}

BlockUI.prototype.removeLoader = function() {
	var id = this.id;
	var deletingLoader = document.getElementById("loaderParent" + id);
	deletingLoader.outerHTML = "";
	delete deletingLoader;
}

/**
 * To set the pop-up position in center of a page by setting popup position fixed, this function can be used.
 * call on popup.
 */
BlockUI.prototype.centerFixed = function(element, container) {
	if(!container)
		container = window;
	element.style.position = "fixed";
	element.style.top = Math.max(0, ((window.innerHeight - element.clientHeight) / 2)) + "px";
	element.style.left = Math.max(0, ((window.innerWidth - element.clientWidth) / 2)) + "px";
	return element;
}

BlockUI.prototype.centerEFixed = function(element, container) {
	element.style.position = "absolute";
	element.style.top = container.offsetTop + "px";
	element.style.left = container.offsetLeft + "px";
	element.style.height = container.offsetHeight + "px";
	element.style.width = container.offsetWidth + "px";
	return element;
}

/* Custom functions are created to use it in an easy way*/
// An anonymous function to load image while page load, to avoid loading time while first time block ui will called.
(function() {
	var loaderImgPath = "images/loader.gif";
	var loaderImg = new Image;
	loaderImg.src = loaderImgPath;
	loaderImg.onload = function() {}
})();

function blockUI(area) {
	return blockUIWithLoader(area);
}

function blockUIOnly(area) {
	return $b.blockUI({
		area: area
	});
}

function blockUIWIthMsg(area, msg) {
	return $b.blockUI({
		area: area,
		msgParentCssClass : "messageParent_C",
		blockMsgHtml : "<div>" + msg + "</div>",
	});
}

function blockUIWithLoader(area) {
	return $b.blockUI({
		area: area,
		loaderIconHtml : "<img src='images/loader.gif' class='blockui loaderIcon loaderIcon_C'/>"
	});
}

function blockUIWithLoaderNMsg(area, msg) {
	return $b.blockUI({
		area: area,
		msgParentCssClass : "messageParent_CWL",
		blockMsgHtml : "<div>" + msg + "</div>",
		loaderIconHtml : "<img src='images/loader.gif' class='blockui loaderIcon loaderIcon_C'/>"
	});
}

function unblockUI(blockuiInstance) {
	$b.unblockUI(blockuiInstance);
}