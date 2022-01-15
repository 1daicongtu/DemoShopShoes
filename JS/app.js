var container = document.querySelector(".container");
var headerNav = container.querySelector(".header__nav");
var elementBtnPrev = container.querySelector(".galery-prev");
var elementBtnNext = container.querySelector(".galery-next");
var arrImgSlide = ["Image/galery-2.jpg", "Image/galery-3.jpg", "Image/galery-4.jpg", "Image/galery-5.jpg", "Image/galery-6.jpg" ,"Image/galery-7.jpg"]
var listImageSlide = container.querySelector(".column-right__slide-list");
var elementBigDeal = container.querySelector(".column-left__deal");
var elementHeaderTopProduct = container.querySelector(".top-product__header");
var elementWhatSay = container.querySelector(".column-left__what-say");
var elementFeaturedProducts = container.querySelector(".featured-Products__slide");

function start(){
    renderHeadSlide();
    handleOnScroll();
    handleQuickView();
    handleCloseModal();
    elementBtnNext.addEventListener("click", handleNextImg);
    elementBtnPrev.addEventListener("click", handlePrevImg);
    setInterval(handleNextImg, 5000);

    handleSlideBigDeal(elementBigDeal);
    handleLayOutTopProduct(elementHeaderTopProduct);
    handleWhatSays(elementWhatSay);
    handleFeatureProduct(elementFeaturedProducts);
}

start();


// function
function renderHeadSlide(){
    console.log(listImageSlide);
    for(var i = 0; i < arrImgSlide.length; i++){
        var tempElement = document.createElement("div");
        tempElement.classList.add("column-right__slide-image");
        if (i == 0){
            tempElement.classList.add("active");
        }
        tempElementImg = document.createElement("img");
        tempElementImg.src = arrImgSlide[i];
        tempElementImg.classList.add("column-right__slide-picture");
        tempElement.appendChild(tempElementImg)
        listImageSlide.appendChild(tempElement);
    }
}
function handleOnScroll(){
    window.addEventListener("scroll", function(){
        headerNav.classList.toggle("sticky", window.scrollY > 180)
    })
}
function handleNextImg(){
    var listElementInGalery = document.querySelectorAll(".column-right__slide-image");

    for (var i = 0; i < listElementInGalery.length; i++){
        if (listElementInGalery[i].classList.contains("active")){
            listElementInGalery[i].classList.remove("active");
            if (i == listElementInGalery.length-1){
                i = -1;
            }
            listElementInGalery[i+1].classList.add("active");
            break;
        }
    }

}
function handlePrevImg(){
    var listElementInGalery = document.querySelectorAll(".column-right__slide-image");

    for (var i = 0; i < listElementInGalery.length; i++){
        if (listElementInGalery[i].classList.contains("active")){
            listElementInGalery[i].classList.remove("active");
            if (i == 0){
                i = listElementInGalery.length;
            }
            listElementInGalery[i-1].classList.add("active");
            break;
        }
    }

}
function handleQuickView(){
    var elementQuickViews = document.querySelectorAll(".top-product__options-quickview");
    for(var i = 0; i < elementQuickViews.length; i++){
        elementQuickViews[i].addEventListener("click", function(){
            var elementOfItem = findFatherOfItem(this, "father-item");
            elementOfItem.querySelector(".top-product__lastest-item-modal").classList.add("modal-active");
            var elementFeaturedRow = document.querySelector(".featured-Products__body-row");
            console.log(elementFeaturedRow.style.transform);
            if (elementFeaturedRow.style.transform != null){
                elementFeaturedRow.style.transform = "unset";
            }
        })
    }

}
function findFatherOfItem(e, classFather){
    while(e.parentElement){
        if (e.parentElement.classList.contains(classFather)){
            return e.parentElement;
        } else {
            e = e.parentElement;
        }
    }
    return e;
}
function handleCloseModal(){
    var elementCloseModals = document.querySelectorAll(".modal__body-close");
    for (var i = 0; i < elementCloseModals.length; i++){
        elementCloseModals[i].addEventListener("click", function(){
            var elementModal = findFatherOfItem(this, "top-product__lastest-item-modal");
     
            if (elementModal.classList.contains("modal-active")){
                
                elementModal.classList.remove("modal-active");
            }
        })
    }
}
function handleSlideBigDeal(e){
    var index = 0;
    var elementNextOfBigDeal = e.querySelector(".column-left__deal-move-next");
    var elementPrevOfBigDeal = e.querySelector(".column-left__deal-move-prev");
    var elementDealList = e.querySelector(".column-left__deal-list");
    var lengthOfList = e.querySelectorAll(".column-left__deal-list > .column-left__deal-product").length;
    elementNextOfBigDeal.addEventListener("click", function(){
        
        elementDealList.style.transform = `translateX(calc((100%/${lengthOfList})*${-(index+1)}))`;
        index++;
       
        if (index == lengthOfList-1){
            index = -1;
        }
    })
    elementPrevOfBigDeal.addEventListener("click", function(){
        if (index == 0){
            index = lengthOfList;
        }
        elementDealList.style.transform = `translateX(calc((100%/${lengthOfList})*${-(index-1)}))`;
        index--;
       

    })
}
function handleLayOutTopProduct(elementHeaderTopProduct){
    var listElementTypeProduct = elementHeaderTopProduct.querySelectorAll(".top-product__header-options > p");
    
    for (var i = 0; i < listElementTypeProduct.length; i++){
       
        listElementTypeProduct[i].addEventListener("click", function(){
            var elementTopProductActived = elementHeaderTopProduct.querySelector(".active");
            elementTopProductActived.classList.remove("active");
            
            var elementListProductBefore = document.querySelector("." + elementTopProductActived.id);
            console.log(elementListProductBefore);
            elementListProductBefore.style.display = "none";
            var elementHasBeenChoose = document.querySelector("." + this.id);
            this.classList.add("active");
            elementHasBeenChoose.style.display = "flex";
        })
    }
}
function handleWhatSays(e){
    var elementNextContent = e.querySelector(".what-say-control-move-next");
    var elementPrevContent =  e.querySelector(".what-say-control-move-prev");
    var index = 0;
    var numberItemInList = e.querySelectorAll(".column-left__what-say__body-comment").length;
    var elementListWhatSay = e.querySelector(".column-left__what-say__body");

    elementNextContent.addEventListener("click", function(){
        elementListWhatSay.style.transform = `translateX(calc((100%/${numberItemInList})*${-(index+1)}))`;
        index++;
        if (index == numberItemInList-1){
            index = -1;
        }
    })
    elementPrevContent.addEventListener("click", function(){
        if (index == 0){
            index = numberItemInList;
        }
        
        elementListWhatSay.style.transform = `translateX(calc((100%/${numberItemInList})*${-(index-1)}))`;
        index--;
    })
}

function handleFeatureProduct(e){
    var elementNextItem = e.querySelector(".featured-Products__header__controls-next");
    var elementPrevItem = e.querySelector(".featured-Products__header__controls-prev");
    var index = 0;
    var numberItemInList = e.querySelectorAll(".featured-Products__body-column").length/3;
    var elementListFeaturedProduct = e.querySelector(".featured-Products__body-row");

    elementNextItem.addEventListener("click", function(){
        elementListFeaturedProduct.style.transform = `translateX(calc((100%/${numberItemInList})*${-(index+1)}))`;
        index++;
        if (index == numberItemInList-1){
            index = -1;
        }
    })
    elementPrevItem.addEventListener("click", function(){
        if (index == 0){
            index = numberItemInList;
        }
        
        elementListFeaturedProduct.style.transform = `translateX(calc((100%/${numberItemInList})*${-(index-1)}))`;
        index--;
    })
}