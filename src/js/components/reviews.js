const filterItems = document.querySelectorAll("[data-category]"),
filterButtons = document.querySelectorAll("[data-filter]"),
showMoreButton = document.querySelector(".reviews-more");

let filterValue = "all";

function addEventsForFilters(){
	if (filterButtons){
		for(item of filterButtons){
			item.addEventListener("click", function(){
				filterValue = this.dataset.filter;
				filterButtons.forEach((currentIndex) =>{
					if (currentIndex.classList.contains("reviews_active-filter")){
						currentIndex.classList.remove("reviews_active-filter");
					}	
				});
				this.classList.add("reviews_active-filter");
				if (showMoreButton){
					showMoreButton.dataset.active = "0";
					showMoreButton.innerText = "Загрузить ещё";
				}
				hideMoreItems();
			})
		}
	}
	
	if (showMoreButton){
		showMoreButton.addEventListener("click", function(){
			if (this.dataset.active == "0"){
				showMoreItems();
				this.dataset.active = "1";
				this.innerText = "Свернуть";
			}
			else{
				hideMoreItems();
				this.dataset.active = "0";
				this.innerText = "Загрузить ещё";
			}
		});
	}

}

function hideMoreItems(){
	if (filterItems){
		let counter = 0;
		filterItems.forEach((currentIndex) =>{
			if (filterValue != "all"){
				if (currentIndex.dataset.category != filterValue){
					currentIndex.style.display = "none";
				}
				else{
					currentIndex.style.display = "block";
					counter++;
				}
			}
			else{
				currentIndex.style.display = "block";
				counter++;
			}
			if (counter > 3){
				currentIndex.style.display = "none";
			}
		})
	}
}

function showMoreItems(){
	filterItems.forEach((currentIndex) =>{
		if (filterValue != "all"){
			if (currentIndex.dataset.category != filterValue){
				currentIndex.style.display = "none";
			}
			else{
				currentIndex.style.display = "block";
			}
		}
		else{
			currentIndex.style.display = "block";
		}
	})
}

addEventsForFilters();
hideMoreItems();