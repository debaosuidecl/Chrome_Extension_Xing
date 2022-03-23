const buttonSelector = '.sc-11cbuc5-1.iAfnRB';
const EmployeeParagraphSelector = '.EmployeesDetail-EmployeesDetail-totalEmployees-7d3ca3f8';
async function delay(ms) {
	return new Promise((res) => {
		setTimeout(() => {
			res('done');
		}, ms);
	});
}

async function addActionButton() {
	const BODY = document.querySelector('body');
	const button = document.createElement('BUTTON');
	const buttonCont = document.createElement('DIV');

	button.classList.add('extension_button');
	buttonCont.classList.add('extension_button_cont');
	button.textContent = 'Automate Employee Search';
	buttonCont.appendChild(button);
	button.addEventListener('click', runEmployeeSearch);

	BODY.appendChild(buttonCont);
}
console.log('running script');
runEmployeeSearch();

async function runEmployeeSearch() {
	if (window.location.href.indexOf('employees') !== -1) {
		// return;
		let newcontent = null;
		try {
			const emppar = document.querySelector(EmployeeParagraphSelector);

			if (emppar) {
				const newSpan = document.createElement('SPAN');
				newSpan.setAttribute('id', 'loadingtext');
				newSpan.style.color = '#C6F16D';
				newSpan.textContent = ' (Loading more Employees) ';
				emppar.appendChild(newSpan);

				const newimage = document.createElement('IMG');
				newimage.setAttribute('src', 'https://i.gifer.com/ZZ5H.gif');
				newimage.setAttribute('id', 'loadinggif');
				newimage.style.height = '20px';
				newimage.style.width = '20px';
				emppar.appendChild(newimage);
			}
		} catch (error) {
			console.log(error);
		}
		try {
			await recursiveClick(0, 10, newcontent);
		} catch (error) {
			console.log(error);
		}
	} else {
		alert('You must be on an employee page for this to work');
	}
}

async function recursiveClick(counter = 0, limit = 10, newcontent) {
	let button = null;

	button = document.querySelector(buttonSelector);

	if (!button) {
		counter++;
		console.log('adding to counter: ', counter, limit);
	}

	if (counter >= limit) {
		try {
			const emppar = document.querySelector(EmployeeParagraphSelector);

			if (emppar) {
				emppar.removeChild(document.querySelector('#loadingtext'));
				emppar.removeChild(document.querySelector('#loadinggif'));
			}
		} catch (error) {
			console.log(error);
		}
		return;
	}

	if (button) {
		button.click();
	} else {
		console.log('No  button to click yet: ');
	}

	await delay(1000);
	recursiveClick(counter, limit, newcontent);
}
