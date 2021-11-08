const vacanciesTitles = document.querySelectorAll(".vacancies__header-top-title"),
selectInput = document.querySelector("[data-select_item]");

function setOptions(){
	if (vacanciesTitles){
		for (item of vacanciesTitles){
			selectInput.options[selectInput.options.length] = new Option(`${item.innerText}`, `${item.innerText}`);
		}
	}
}

setOptions();