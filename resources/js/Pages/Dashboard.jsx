import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import TodoModal from '@/Components/modal-form/modal-form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import RenderCards from '@/Components/render-cards/render-cards';

export default function Dashboard({ auth }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">To-do</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Button variant="primary" onClick={handleShow}> New To Do</Button>
                    </div>
                    <RenderCards></RenderCards>
                </div>
                
            </div>
            <TodoModal show={show} handleClose={handleClose}></TodoModal>
            
        </AuthenticatedLayout>
    );
}
