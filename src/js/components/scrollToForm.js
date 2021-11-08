const formToscrollButtons = document.querySelectorAll("[data-scroll_button]"),
selectInputValue = document.querySelector("[data-select_item]");

for(item of formToscrollButtons){
    item.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(".consultation__inner").scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })

        selectInputValue.value = this.dataset.vacancy;
    });
};