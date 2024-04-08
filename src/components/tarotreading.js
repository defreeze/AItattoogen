import React, { useState, useEffect } from "react";
import '../App.css';
import { generatePrompt_traditional } from "./generatePrompt_traditional.ts";
import { generatePrompt_geometric } from "./generatePrompt_geometric.ts";
import { generatePrompt_watercolor } from "./generatePrompt_watercolor.ts";
import { generatePrompt_japanese } from "./generatePrompt_japanese.ts";
import { generatePrompt_cartoon } from "./generatePrompt_cartoon.ts";
import { generatePrompt_ignorant } from "./generatePrompt_ignorant.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

function Tarotgen({ profile, setLoading, loading, choice, setChoice, setShowPasswordPage }) {
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState("");
    const [moodChoice, setMoodChoice] = useState("");

    const [context, setContext] = useState("");
    const [result, setResult] = useState("");
    const [generatedText, setGeneratedText] = useState("");
    const [generatedImageUrl, setGeneratedImageUrl] = useState("");
    const [stage, setStage] = useState(0); // 0 for initial, 1 for after card selection, 2 for after evaluation
    const [loading2, setLoading2] = useState(false);
    const [showLimitPopup, setShowLimitPopup] = useState(false);
    const [inputsDisabled, setInputsDisabled] = useState(false);


    <Tarotgen
        showPasswordPage={() => setShowPasswordPage(true)}
    />

    useEffect(() => {
        // Function to pick a random emoji
        const emojis = ['👺', '🌈', '☮️', '👾', '👽', '🤡', '💸', '🎐', '🔗', '💉', '🤖'];
        const pickRandomEmoji = () => {
            const randomIndex = Math.floor(Math.random() * emojis.length);
            return emojis[randomIndex];
        };
        setEmoji(pickRandomEmoji());
    }, []);

    const nicknames = [
        "Ink Impala", "Sketchy Shark", "Canvas Coyote", "Stencil Stallion",
        "Pigment Panther", "Palette Peacock", "Etch Elephant", "Shade Swan",
        "Line Lynx", "Design Dragon", "Needle Nighthawk", "Shade Serpent",
        "Artistic Antelope", "Mural Moose", "Graffiti Gorilla", "Inkwell Iguana",
        "Tattooed Turtle", "Pictorial Penguin", "Draft Dolphin", "Brush Bison",
        "Scribe Sparrow", "Portrait Puma", "Colorist Crow", "Mosaic Mongoose",
        "Patterned Python", "Vibrant Viper", "Etching Eagle", "Inked Ibex",
        "Doodle Dingo", "Silhouette Squirrel", "Masterpiece Meerkat", "Graphic Gecko",
        "Outline Orca", "Flash Falcon", "Vector Vulture", "Hue Hyena",
        "Illustration Imp", "Artisan Aardvark", "Quill Quokka", "Chisel Cheetah",
        "Polish Parrot", "Ink Illusionist", "Tinted Tiger", "Carve Crane",
        "Stencil Stoat", "Bristle Bat", "Aesthetic Anaconda", "Sketch Scorpion"
    ];
    

    const now = new Date();
    // Retrieve stored click timestamps from localStorage
    const clicks = JSON.parse(localStorage.getItem('tarotClicks')) || [];
    // Filter out clicks that are not from today
    const todayClicks = clicks.filter(click => {
        const clickDate = new Date(click);
        return clickDate.toDateString() === now.toDateString();
    });

    // Function to get a random nickname
    const getRandomNickname = () => {
        const randomIndex = Math.floor(Math.random() * nicknames.length);
        return nicknames[randomIndex];
    };
    const resetReading = () => {
        setInputsDisabled(false);
        setStage(0);
        setGeneratedText("");
        setMoodChoice('');
        setName('');
        setContext('');
        setResult("");    };


    const resetReading_alt = () => {
        setInputsDisabled(false);
        setStage(0);
        setGeneratedText("");
        setMoodChoice('');
        setName('');
        setContext('');
        setChoice('');
        setResult("");
    };

    const ReadingLimitPopup = () => {
        return (
            <div className="popup-overlay">
                <div className="popup-content">
                    <p>You've reached the limit of 2 readings per day.
                        <br />
                        If you like the app you can buy me a
                        <a href="https://www.buymeacoffee.com/alexdevries" target="_blank" rel="noopener noreferrer"> coffee ☕
                        </a>
                    </p>
                    <button onClick={() => setShowLimitPopup(false)}>Close</button>
                </div>
            </div>
        );
    };

    const generateTextAndImage = async () => {
        if (!profile) {
            setShowPasswordPage(true);
            return;
        }
        setInputsDisabled(true);
        const tattoomotivation = {
            "1": "Memorial",
            "2": "Spiritual",
            "3": "Personal milestone",
            "4": "for fun",
            "5": "self expression",
            "6": "sense of belonging",
            "7": "heartbreak",
            "8": "i dont want to share"
        };
        const promptGenerators = {
            "1": generatePrompt_traditional,
            "2": generatePrompt_geometric,
            "3": generatePrompt_watercolor,
            "4": generatePrompt_japanese,
            "5": generatePrompt_cartoon,
            "6": generatePrompt_ignorant,
            "": generatePrompt_traditional,
        };
        const promptGenerator = promptGenerators[choice];
        const userMood = tattoomotivation[moodChoice] || "Undefined";

        if (todayClicks.length < 100) {
            setLoading(true);
            const textPrompt = promptGenerator({
                NAMEHERE: name,
                MOODHERE: userMood,
                CONTEXTHERE: context
            });
            try {
                const URL2 = `${process.env.REACT_APP_VALUE3}${process.env.REACT_APP_VALUE1}${process.env.REACT_APP_VALUE4}`;
                const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${URL2}`
                    },
                    body: JSON.stringify({
                        prompt: textPrompt,
                        n: 1,
                        size: "1024x1024"
                    })
                });
            
                if (!imageResponse.ok) {
                    console.log(imageResponse);
                    imageResponse.json().then(data => console.log(data));
                    throw new Error('Network response was not ok.');
                }
            
                const imageData = await imageResponse.json();
                // Ensure imageData has the structure you expect before accessing it
                if (!imageData.data || imageData.data.length === 0) {
                    throw new Error('No image data found.');
                }
            
                const generatedImageUrl = imageData.data[0].url;
                console.log('Generated image URL:', imageData.data[0].url);
                setGeneratedImageUrl(generatedImageUrl);

            } catch (error) {
                console.error(`Error: ${error.message}`);
            } finally {
                setLoading(false);
                setStage(2);
            }
            todayClicks.push(now);
            localStorage.setItem('tarotClicks', JSON.stringify(todayClicks));
        } else {

            setShowLimitPopup(true);
        }

    };
    const [currentMessage, setCurrentMessage] = useState(0);
    const loadingMessages = [
        "Preparing the ink...",
        "Sketching the outlines...",
        "Selecting the perfect needle...",
        "Setting up the artist's station...",
        "Dipping into the color palette...",
        "Sterilizing equipment...",
        "Cleaning the canvas...",
        "Stretching the skin...",
        "Fine-tuning the details...",
        "Applying the stencil..."
    ];

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generatedImageUrl;
        link.download = 'generated_tattoo.png';
        link.target = '_blank'; // Open in a new tab
        link.click();
    };
    

    useEffect(() => {
        if (loading) {
            const intervalId = setInterval(() => {
                setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
            }, 3000); // Change message every 3 seconds

            return () => clearInterval(intervalId);
        }
    }, [loading, loadingMessages.length]); // Added loadingMessages.length here


    return (
        <div className="container">
            <h2>{emoji} Tattoos by AI {emoji}</h2>
            <div className="input-wrapper">
                <div className="user-info">
                    <input
                        type="text"
                        className="user-input"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        title="Any name you self-identify with"
                        disabled={inputsDisabled}
                        maxLength={25}
                    />
                    <select
                        className="user-input"
                        value={moodChoice}
                        onChange={(e) => setMoodChoice(e.target.value)}
                        disabled={inputsDisabled}
                    >
                        {moodChoice === "" && <option value="" hidden>reason for tattoo</option>}
                        <option value="4">🤪 for fun</option>
                        <option value="5">🎙️ self expression</option>
                        <option value="1">🕊️ Memorial</option>
                        <option value="6">💞 sense of belonging</option>
                        <option value="3">🏅 Personal milestone</option>
                        <option value="2">📿 Spiritual</option>
                        <option value="7">💔 heartbreak</option>
                        <option value="8">🚫 i dont want to share</option>
                    </select>

                    <select
                        className={`user-select`}
                        value={choice}
                        onChange={(e) => setChoice(e.target.value)}
                        disabled={inputsDisabled}
                    >
                        {choice === "" && <option value="" hidden>Tattoo style</option>}
                        <option value="1">traditional</option>
                        <option value="2">geometric</option>
                        <option value="3">watercolor</option>
                        <option value="4">Japanese</option>
                        <option value="5">cartoon</option>
                        <option value="6">ignorant</option>

                    </select>
                </div>
                <textarea
                    className="prompt-input"
                    placeholder="Share your tattoo ideas for a personalized design here! Leave it blank for a random suggestion..."
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    disabled={inputsDisabled}
                    rows="1"
                    maxLength={207}
                />
            </div>

            {stage === 0 && (
                <button
                    className="button-design" 
                    onClick={() => {
                        if (name === "") {
                            setName(getRandomNickname());
                        }
                        if (moodChoice === "") {
                            const randomMoodChoice = Math.floor(Math.random() * 8) + 1;
                            setMoodChoice(randomMoodChoice.toString());
                        }
                        if (choice === "") {
                            // Set a random value for choice between 1 and 6
                            const randomChoice = Math.floor(Math.random() * 6) + 1;
                            setChoice(randomChoice.toString());
                        }
                        if (context ==="") {
                            const tattooIdeas = [
                            "Anchor tattoo: Symbol of stability and strength.", 
                            "Rose tattoo: Represents love, beauty, and passion.", 
                            "Feather tattoo: Signifies freedom and spirituality.", 
                            "Skull tattoo: Emblem of mortality and rebellion.", 
                            "Infinity tattoo: Symbolizes eternity and endless possibilities.",
                            "Arrow tattoo: Sign of direction and progress.",
                            "Sunflower tattoo: Symbol of happiness and vitality.",
                            "Dragon tattoo: Represents power, wisdom, and protection.",
                            "Butterfly tattoo: Signifies transformation and beauty.",
                            "Compass tattoo: Emblem of guidance and exploration.",
                            "Phoenix tattoo: Symbolizes rebirth and renewal.",
                            "Wave tattoo: Represents the ebb and flow of life.",
                            "Lotus tattoo: Symbol of purity and enlightenment.",
                            "Tree of life tattoo: Signifies connection and growth.",
                            "Mandala tattoo: Emblem of balance and harmony.",
                            "Lion tattoo: Represents strength, courage, and leadership.",
                            "Wolf tattoo: Sign of loyalty, independence, and resilience.",
                            "Elephant tattoo: Symbolizes wisdom, loyalty, and longevity.",
                            "Dreamcatcher tattoo: Signifies protection and spiritual connection.",
                            "Hourglass tattoo: Emblem of the passage of time and mortality.",
                            "Semicolon tattoo: Symbolizes hope and mental health awareness.",
                            "Abstract geometric tattoo: Represents complexity and individuality.",
                            "Quill and ink tattoo: Symbol of creativity and expression.",
                            "Crescent moon tattoo: Signifies intuition and feminine power.",
                            "Fingerprint heart tattoo: Represents unique love and connection.",
                            "Origami tattoo: Symbolizes patience and the art of transformation.",
                            "Starry night sky tattoo: Emblem of wonder and exploration.",
                            "Bonsai tree tattoo: Signifies balance, harmony, and resilience.",
                            "Octopus tattoo: Symbol of intelligence, adaptability, and mystery.",
                            "Molecule tattoo: Represents passion for science or personal significance.",
                            "Paper plane tattoo: Represents freedom, wanderlust, and adventure.",
                            "Teapot tattoo: Emblem of comfort, hospitality, and creativity.",
                            "Sailor Jerry mermaid tattoo: Classic maritime imagery symbolizing beauty and danger.",
                            "Old school ship tattoo: Represents adventure, resilience, and the journey of life.",
                            "Swallow tattoo: Emblem of loyalty, freedom, and safe return home.",
                            "Dagger through heart tattoo: Symbolizes betrayal, heartbreak, and resilience.",
                            "Snake and dagger tattoo: Traditional design representing danger, protection, and mortality.",
                            "Traditional eagle tattoo: Emblem of courage, freedom, and power.",
                            "Anchor with banner tattoo: Customizable design for adding names or meaningful quotes.",
                            "Traditional rose with dagger tattoo: Symbolizes beauty, love, and protection.",
                            "Classic pin-up girl tattoo: Represents femininity, allure, and vintage aesthetics.",
                            "Ship in a bottle tattoo: Emblem of exploration, nostalgia, and adventure.",
                            "Tiger tattoo: Emblem of strength, courage, and protection in East Asian cultures.",
                            "Bamboo tattoo: Signifies resilience, flexibility, and longevity in Asian cultures.",
                            "Peony flower tattoo: Symbolizes prosperity, honor, and good fortune in Chinese culture.",
                            "Hannya mask tattoo: Represents jealousy, rage, and protection against evil spirits in Japanese folklore.",
                            "Bonsai tree tattoo: Emblem of balance, harmony, and patience in Japanese culture.",
                            "Phoenix tattoo: Symbolizes rebirth, renewal, and immortality in East Asian mythology.",
                            "Dragon and phoenix tattoo: Represents the balance of masculine and feminine energies and harmony in relationships.",
                            "Korean hanbok tattoo: Signifies traditional Korean culture, elegance, and grace.",
                            "Tibetan mandala tattoo: Symbolizes the universe, spiritual journey, and meditation in Tibetan Buddhism.",
                            "Thai elephant tattoo: Emblem of strength, wisdom, and good luck in Thai culture."
                        ];
                            const randomIndex = Math.floor(Math.random() * tattooIdeas.length);
                            setContext(tattooIdeas[randomIndex]);

                        }
                        generateTextAndImage();
                        //pickCards();
                    }}
                    disabled={loading2}

                >
                    {loading2 ? 'preparing stencil' : 'Generate Tattoo'}
                </button>


            )}
           
            {/*stage >= 1 && (
                <div className="tarot-cards-container">
                    <TarotCards reading={reading.current} />
                </div>
            )*/}

            {stage === 1 && (
                <div className="button-layout">

                    <button className="button-design" onClick={generateTextAndImage} disabled={loading}>
                        {loading ? 'thinking' : 'Receive reading by AI'}
                    </button>

                    <button className="button-design-refresh" onClick={resetReading_alt}>
                        <FontAwesomeIcon icon={faRefresh} />
                    </button>
                </div>
            )}
            {showLimitPopup && <ReadingLimitPopup />}

            {stage === 2 && (
                <button className="button-design" onClick={resetReading}>
                    Reset
                </button>
            )}


            {stage === 2 && generatedImageUrl && (
                <div className="generated-text">
                    <p style={{ textAlign: "right", color: "rgb(40, 60, 160)" }}>{new Date().toLocaleString("en-US", { hour: '2-digit', minute: '2-digit', year: 'numeric', month: 'numeric', day: 'numeric', hour12: true })}</p>
                    <p style={{ textAlign: "center", fontSize: "18px" }}>Generated Tattoo</p>
                    <img src={generatedImageUrl} alt="Generated Tattoo" style={{ display: "block", width: "100%", height: "auto", maxWidth: "100%", margin: "0 auto" }} />
                    <button onClick={handleDownload} className="download-button" style={{ float: "right", zIndex: "9999" }}>Download</button>
                    <br />
                    <p style={{ textAlign: "center", color: "rgb(40, 60, 160)", fontStyle: "italic" }}>Disclaimer: Our AI tattoo artists can have bad days with varying results.</p>
                </div>
            )}



            {loading && (
                <>
                    <p className="loading-text">⏳ AI is designing your tattoo ⌛️</p>
                    <p className="loading-subtext">{loadingMessages[currentMessage]}</p>
                </>
            )}

            {stage === 2 && result && (
                <div className="result-image-wrapper">
                    <h3>Your Tarot reading visualized</h3>
                    <p>The AI generated a unique visualization representing your tarot reading.</p>
                    <img className="result-image" src={result} alt="Generated Tarot Reading" />
                </div>
            )}
        </div>
    );
}

export default Tarotgen;
