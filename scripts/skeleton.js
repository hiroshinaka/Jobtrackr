function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./text/navbar.html'));
    console.log($('#footerPlaceholder').load('./text/footer.html'));
} 
loadSkeleton(); //invoke the function