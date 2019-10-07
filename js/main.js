// Header styles on scroll
(() => {
    if (document.body.clientWidth < 1025) return;
    function switchHeaderTheme() {
        const header = document.querySelector('.page-header');
        if (scrollY < 98) {
        if (header.classList.contains('-clean')) return;
        header.classList.add('-clean');
        } else if (header.classList.contains('-clean')) {
        header.classList.remove('-clean');
        }
    }

    switchHeaderTheme();
    document.addEventListener('scroll', switchHeaderTheme);
})();