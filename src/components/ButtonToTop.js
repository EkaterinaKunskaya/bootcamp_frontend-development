import '../styles/ButtonToTop.scss';

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById('btn-top').style.display = 'block';
    } else {
        document.getElementById('btn-top').style.display = 'none';
    }
}

export const ButtonToTop = () => <a href="#top" className='button-to-top' id='btn-top'>Top</a>;