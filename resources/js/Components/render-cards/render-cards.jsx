import { useState, useEffect } from 'react';
import TodoModal from '../modal-form/modal-form';
import './render-cards.css'

function RenderCards(newCard) {
    const [cards, setCards] = useState({
        cards: null,
    });
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [id, setId] = useState({
        id: null,
    })

    const [update, setUpdate] = useState(false)

    useEffect(() => {
        async function getCards() {
            try {
                const response = await fetch(`${window.location.origin}/index`);
                if (response.ok) {
                    const data = await response.json();
                    setCards({ cards: data });
                } else {
                    console.error('Error');
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
        if (newCard) {
            getCards();
        }
    }, [newCard]); 

    function UpdateToDo(id) {
        handleShow()
        const data = JSON.stringify(id)
        setId({ id : "/updateToDo/" + data})
    }
    
    function DeleteCard(url) {
        async function deleteCard() {
            try {
                const response = await fetch(`${window.location.origin}`+url, {
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
                            setCards({ cards: null });
                            const data = await response.json();
                            setCards({ cards: data });
                        } else {
                            console.error('Error');
                        }
                    } catch (error) {
                        console.error('Error', error);
                    }
                } else {
                    console.error('Error');
                }
            } catch (error) {
                console.error('Error', error);
            }
        }
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
                        <div className='card-title'>{card.name}</div>
                        <div className='card-description'>{card.description}</div>
                    </div>
                    <div className='buttons'>
                        <button className='update-button' onClick={() => UpdateToDo(card.id)}>Edit</button>
                        <button className='delete-button' onClick={() => DeleteCard(`/delete/${card.id}`)}>Delete</button>
                    </div>
                    
                </div>
                
            ));
        }
    }
    
    return (
        <div className='cards-container'>
            {renderStateCards()}
            <TodoModal show={show} handleClose={handleClose} url={id.id} method='patch' updateCard={true} modalTitle='Update Todo'></TodoModal>
        </div>
        
    );
}

export default RenderCards;
