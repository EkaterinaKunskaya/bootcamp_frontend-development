export function buttonScrollCreator () {
    window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById('btn-top').style.display = 'block';
        } else {
            document.getElementById('btn-top').style.display = 'none';
        }
    }
}