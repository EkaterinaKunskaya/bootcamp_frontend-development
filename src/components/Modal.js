import '../styles/components/Modal.scss';

export const Modal = props => {
    const { isOpened, onModalClose, card } = props;

    if (card) {
        return (
            <div className={`modal__wrapper ${isOpened ? 'open' : 'close'}`} onClick={onModalClose}>
                <div className='modal__content'
                    style={{ background: `linear-gradient(270deg, rgb(255, 255, 255) 65%, rgb(0, 0, 0, 0) 100%), url(${card.image})` }}
                >
                    <div className='modal__info' key={card.id}>
                        <span className='modal__info-text'><b>Name:</b><br />{card.name}</span>
                        <span className='modal__info-text'><b>Origin:</b><br />{card.origin.name}</span>
                        <span className='modal__info-text'><b>Status:</b><br />{card.status}</span>
                        <span className='modal__info-text'><b>Location:</b><br />{card.location.name}</span>
                        <span className='modal__info-text'><b>Species:</b><br />{card.species}</span>
                        <span className='modal__info-text'><b>Gender:</b><br />{card.gender}</span>
                    </div>
                </div>
            </div>
        );
    }
}