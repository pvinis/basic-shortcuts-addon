console.log("basic shortcuts addon started");

var { Hotkey } = require("sdk/hotkeys");
var selection;
var tabs;
var sp;
var loaded = false;

var googleSearchHotkey = Hotkey ({
	combo: "control-shift-s",
	onPress: function() {
		console.log("googleSearchHotkey pressed");
		googleSearch();
	}
});

var youtubeSearchHotkey = Hotkey ({
	combo: "control-shift-y",
	onPress: function() {
		console.log("youtubeSearchHotkey pressed");
		youtubeSearch();
	}
});

var emailUrlHotkey = Hotkey ({
	combo: "control-shift-a",
	onPress: function() {
		console.log("emailHotkey pressed");
		emailUrl();
	}
});

function load() {
	console.log("loading modules");
	selection = require("sdk/selection");
	tabs = require("sdk/tabs");
	sp = require("sdk/simple-prefs");
	loaded = true;
}

function googleSearch() {
	if (!loaded) {
		load();
	}
	if (selection.text) {
		var url = "https://google.com/search?q=" + selection.text;
		console.log("searching for \"" + selection.text + "\"");
		if (sp.prefs['newtab']) {
			tabs.open({
				url: url,
				inBackground: sp.prefs['bgtab']
			});
		} else {
			tabs.activeTab.url = url;
		}
	}
}

function youtubeSearch() {
	if (!loaded) {
		load();
	}
	if (selection.text) {
		var url = "https://youtube.com/results?search_query=" + selection.text;
		console.log("searching for \"" + selection.text + "\"");
		if (sp.prefs['newtab']) {
			tabs.open({
				url: url,
				inBackground: sp.prefs['bgtab']
			});
		} else {
			tabs.activeTab.url = url;
		}
	}
}

function emailUrl() {
	if (!loaded) {
		load();
	}
	if (sp.prefs['email'] == someone@example.com) {
		var panel = require("sdk.panel").Panel ({
			width: 180,
			height: 180,
			contentURL: require("sdk/self").data.url("email-panel.html"),
			onHide: function() {
				tabs.open("about:addons")l
			}
		});
		panel.show();
	} else {
		url = tabs.activeTab.url;
		tabs.open("mailto:" + sp.prefs['email'] + "?subject=Sent from Firefox&body=" + url);
	}
}

/// make a map with the query urls and use one func
/// make prefs for custom hotkeys? also custom searches?
/// fix emailing

