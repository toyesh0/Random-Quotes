import { RotateCcw, Twitter } from 'lucide-react';
import React, { useState } from 'react';
import './RandomQuote.css';

const RandomQuote = () => {
    const [quote, setQuote] = useState({
        text: 'Difficulties increase the nearer we get to the goal',
        author: 'Johann Wolfgang von Goethe',
    });
    const [loading, setLoading] = useState(false); // State to track loading status
    const [backgroundColor, setBackgroundColor] = useState('rgb(82 90 123)'); // State for background color
    const [containerBackgroundColor, setContainerBackgroundColor] = useState('#625ac4'); // State for container background color

    // Function to fetch random quote
    const fetchRandomQuote = async () => {
        setLoading(true); // Set loading state to true
        try {
            const response = await fetch('https://type.fit/api/quotes');
            const quotes = await response.json();
            const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(selectedQuote);
            setBackgroundColor(getRandomColor()); // Set random background color
            setContainerBackgroundColor(getRandomColor());
        } catch (error) {
            console.error('Error fetching random quote:', error);
        } finally {
            setLoading(false); // Set loading state to false after API call completes
        }
    };

    // Function to handle clicking on Twitter icon
    const handleTwitterClick = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
    };

    // Helper function to get a random color
    const getRandomColor = () => {
        const colors = [
            '#ffcccc', // Light Red
            '#ccffcc', // Light Green
            '#ccccff', // Light Blue
            '#ffffcc', // Light Yellow
            '#ffccff', // Light Purple
            '#e6f7ff', // Light Sky Blue
            '#ffe6e6', // Light Salmon
            '#e6e6fa', // Lavender
            '#f0f8ff', // Alice Blue
            '#f0f8ff', // Azure
            '#ffb3ba', // Light Pink
            '#ffcc99', // Peach
            '#ccffff', // Light Cyan
            '#d8bfd8', // Thistle
            '#f0e68c', // Khaki
            '#98fb98', // Pale Green
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <body style={{ backgroundColor }}>
            <div className='container' style={{ backgroundColor: containerBackgroundColor }}>
                <div className="quote">
                    {quote.text}
                </div>
                <div className="line"></div>
                <div className="bottom">
                    <div className="author">- {quote.author.split(',')[0]}</div>
                    <div className="icons">
                        <RotateCcw
                            onClick={fetchRandomQuote}
                            style={{ width: '40px', height: '40px', pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                        />
                        <Twitter
                            onClick={handleTwitterClick}
                            style={{ width: '40px', height: '40px', pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
                        />
                    </div>
                </div>
            </div>
            <div className="toyesh">~ toyesh</div>
        </body>
    );
};

export default RandomQuote;
