import React from 'react';

import '../styles/components/Card.scss';

const Card = props => {
    const { info } = props;

    return (
        <>
            <img className='card__img' src={info.image} alt='character avatar' />
            <span className='card__text'>{info.name}</span>
        </>
    )
}
export default React.memo(Card);