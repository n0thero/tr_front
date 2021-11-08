const vacanciesItems = document.querySelectorAll(".vacancies__container-item");

function vacanciesHideAll(){
	if (vacanciesItems){
		for (item of vacanciesItems)
		{
			let childItem = item.querySelector(".vacancies__preview");
			item.style.height = childItem.scrollHeight + "px";
		}
	}
};

function vacanciesShowHide(){
	if (vacanciesItems){
		for (item of vacanciesItems)
		{
			let child = item.querySelector(".vacancies__preview");
			child.addEventListener("click", function(){
				let parentElement = this.parentElement;
				if (parentElement.classList.contains("vacancies_hide"))
				{
					parentElement.classList.remove("vacancies_hide");
					parentElement.style.height = this.scrollHeight + "px";
				}
				else{
					parentElement.classList.add("vacancies_hide");
					parentElement.style.height = parentElement.scrollHeight + "px";
				}

			})
		}
	}
};

vacanciesHideAll();

vacanciesShowHide();

function resizeBlocks(){
	currentSizeItems = document.querySelectorAll(".vacancies__container-item");
	if (currentSizeItems){
		for (item of currentSizeItems)
		{
			let child = item.querySelector(".vacancies__preview");
			if (item.classList.contains("vacancies_hide"))
			{
				item.style.height = "100%";//item.scrollHeight + "px";
			}
			else{
				item.style.height = child.scrollHeight + "px";
			}
		}
	}
}

let width = 0;

function myInterval() {
	if (document.querySelector(".vacancies__container-item")){
		let interval = setInterval(function(){
			if(width <= 0){
				width = document.querySelector(".vacancies__container-item").clientWidth;
			}
			if(document.querySelector(".vacancies__container-item").clientWidth !== width) { 
				width = document.querySelector(".vacancies__container-item").clientWidth;
				resizeBlocks();
			}
		}, 250);
	}
}

myInterval();