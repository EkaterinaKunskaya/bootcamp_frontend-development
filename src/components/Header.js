import '../styles/components/Header.scss';

export const Header = () => {
    return (
        <header className='header wrapper' id='top'>
            <h1 className='header__title'>List of Rick and Morty characters</h1>
            <div className='header__text'>
                Created by Ekaterina Kunskaya:<br />
                <a className='header__text-link' href='https://www.linkedin.com/in/ekaterina-kunskaya-bb3778252/' target='blank'>
                    LinkedIn
                </a>
                <span> and </span>
                <a className='header__text-link' href='https://disk.yandex.com/d/FwrjhTrTQY3tFw' target='blank'>
                    CV
                </a>
            </div>
        </header>
    );
}