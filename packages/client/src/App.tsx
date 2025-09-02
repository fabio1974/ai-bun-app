import { useEffect, useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/hello')
            .then((res) => res.json())
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <>
            <p className="text-2xl font-bold p-4 text-3xl">{message}</p>
            <div className="p-4">
                <Button>Click me </Button>
            </div>
        </>
    );
}

export default App;
