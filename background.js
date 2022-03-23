chrome.action.onClicked.addListener(async (tab) => {
	console.log('seen');
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		chrome.scripting
			.executeScript({
				target: { tabId: tabs[0].id },
				files: [ './foreground.js' ]
			})
			.then(() => {
				console.log('INJECTED THE FOREGROUND SCRIPT.');
			})
			.catch((err) => console.log(err));
	});
});
