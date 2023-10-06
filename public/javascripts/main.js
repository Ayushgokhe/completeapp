var productTemplate;
var mainPageLoaderFunction = () => {
    $.ajax({
        url:'templates/productTemplate.htm',
        method:'GET',
        data : {},
        success:(response)=>{
            productTemplate = Handlebars.compile(response);
        }
    })
}

mainPageLoaderFunction()

var loadSelectedPage = (pageType) => {
    var pageTemplateUrl = '';
    switch (pageType) {
        case "login":
            pageTemplateUrl = 'templates/login.htm'
            break;
        case "signup":
            pageTemplateUrl = 'templates/signup.htm'
            break;
        case "forgotpwd":
            pageTemplateUrl = 'templates/forgotpwd.htm'
            break;
        case "pDetails":
            pageTemplateUrl = 'templates/productDetails.htm'
            break;
    }
    loadPageTemplate(pageTemplateUrl, pageType);
}

var loadPageTemplate = (templateUrl, pageType) => {
    $.ajax({
        url: templateUrl,
        method: "GET",
        data: {},
        success: (response) => {
            $(".pageMainBlock").html('')
            $(".pageMainBlock").append(response)
            if (pageType == 'pDetails') {
                loadProductDetailsPage()
            }
        }
    })
}

var loadProductDetailsPage = () => {
    $.ajax({
        url: '/getProducts',
        method: 'GET',
        dataType: 'JSON',
        data: {},
        success: (productDetails) => {
            productDetails.forEach(productItems=>{
                $("#productDetailsContainer").append(productTemplate(productItems))
            })
        },
        error: (error) => {
            console.log(error)
        }
    })
}

loadSelectedPage('login')