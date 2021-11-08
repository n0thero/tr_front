const webinarsFiltersButtons = document.querySelectorAll(".account-navigation__container-item"),
allCategoryItems = document.querySelectorAll("[data-category_item]"),
webinarsSwitchButtons = document.querySelectorAll(".webinars-catalog__switch-item");


let currentFilter = "all";

function showFilteredItems(){
	if (currentFilter == "all"){
		for(item of allCategoryItems){
			item.style.display = "block";
		}
	}
	else{
		for(item of allCategoryItems){
			if (item.dataset.category_item == currentFilter){
				item.style.display = "block";
			}
			else{
				item.style.display = "none";
			}
		}
	}
}

function switchFilteredButton(setButton){
	for (button of webinarsFiltersButtons){
		button.classList.remove("account-navigation_active");
		if (button.dataset.switch_category == setButton){
			button.classList.add("account-navigation_active");
		}
	}		
}

function switchFiltersState(){
	if (webinarsFiltersButtons){
		for (item of webinarsFiltersButtons){
			item.addEventListener("click", function(){
				if (!this.classList.contains("account-navigation_active")){
					for (button of webinarsFiltersButtons){
						button.classList.remove("account-navigation_active");
					}
					this.classList.add("account-navigation_active");
					currentFilter = this.dataset.switch_category;
					showFilteredItems();
				}
			})
		}
	}
}

switchFiltersState();

function switchButtonState(){
	if (webinarsSwitchButtons){
		for (item of webinarsSwitchButtons){
			item.addEventListener("click", function(){
				if (!this.classList.contains("webinars-catalog_active")){
					for (button of webinarsSwitchButtons){
						button.classList.remove("webinars-catalog_active");
						let switchContainer = document.querySelector("[data-switch=" + button.dataset.button +"]");
						switchContainer.style.display = "none";
					}
					this.classList.add("webinars-catalog_active");
					document.querySelector("[data-switch=" + this.dataset.button +"]").style.display = "block";
					console.log(this.dataset.button)
					if (this.dataset.button == "webinars"){
						currentFilter = "all";
						showFilteredItems();
						switchFilteredButton("all")
					}
					else{
						currentFilter = "invest";
						showFilteredItems();
						switchFilteredButton("invest")
					}
				}
			})
		}
	}
}

switchButtonState();