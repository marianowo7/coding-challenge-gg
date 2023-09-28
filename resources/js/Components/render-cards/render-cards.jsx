import { useState, useEffect } from 'react';

function RenderCards(newCard) {
    const [cards, setCards] = useState({
        cards: null,
    });

    useEffect(() => {
        async function getCards() {
            try {
                const response = await fetch(`${window.location.origin}/index`);
                if (response.ok) {
                    const data = await response.json();
                    setCards({ cards: data });
                } else {
                    console.error('Error al obtener las cards');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }

        if (newCard) {
            getCards();
        }
    }, [newCard]); 

    
    function renderStateCards() {
        const cardsData = cards.cards
        if (!cardsData) {
            return <div>Loading...</div>
        } else {
            return cardsData.map((card) => (
                <div className='cards'>
                    <div>{card.name}</div>
                    <div>{card.description}</div>
                </div>
                
            ));
        }
    }
    
    return (
        <div>
            {renderStateCards()}
        </div>
    );
}

export default RenderCards;
