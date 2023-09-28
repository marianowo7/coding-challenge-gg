import { useState, useEffect } from 'react';
import './render-cards.css'

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

    function DeleteCard(id) {
        async function deleteCard() {
            try {
                const response = await fetch(`${window.location.origin}/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    },
                });
                if (response.ok) {
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
                } else {
                    console.error('Error al eliminar la tarjeta');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        }
    
        // Llama a la función deleteCard para eliminar la tarjeta
        deleteCard();
    }
    
    function renderStateCards() {
        const cardsData = cards.cards
        if (!cardsData) {
            return <div>Loading...</div>
        } else {
            return cardsData.map((card) => (
                <div className="cards">
                    <div className='card-data'>
                        <div>{card.name}</div>
                        <div>{card.description}</div>
                    </div>
                    <div className='buttons'>
                        <button>Done</button>
                        <button>Edit</button>
                        <button onClick= {() => DeleteCard(card.id)}>Delete</button>
                    </div>
                    
                </div>
                
            ));
        }
    }
    
    return (
        <div className='cards-container'>
            {renderStateCards()}
        </div>
    );
}

export default RenderCards;
