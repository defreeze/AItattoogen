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

    const generateTextAndImage = async (name, moodChoice, choice, context) => {
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
            console.log(`Name: ${name}, Mood: ${userMood}, Context: ${context}`);

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
                        // Calculate the updated values first
                        let updatedName = name !== "" ? name : getRandomNickname();
                        let updatedMoodChoice = moodChoice !== "" ? moodChoice : (Math.floor(Math.random() * 8) + 1).toString();
                        let updatedChoice = choice !== "" ? choice : (Math.floor(Math.random() * 6) + 1).toString();
                        let updatedContext = context !== "" ? context : (() => {
                            const tattooIdeas = [
                                "Anchor tattoo: A detailed, heavy iron anchor, possibly with a rope wound around it.",
                                "Rose tattoo: A vibrant red rose, with dewdrops on its petals, surrounded by thorns.",
                                "Feather tattoo: A delicate, finely detailed feather, possibly from an eagle or a peacock.",
                                "Skull tattoo: A human skull, possibly with crossbones or adorned with flowers.",
                                "Infinity tattoo: The infinity symbol, sleek and continuous, perhaps intertwined with names or dates.",
                                "Arrow tattoo: A straight, sharp arrow in mid-flight, with intricate feathering at the tail.",
                                "Sunflower tattoo: A large, bright sunflower in full bloom, with detailed seeds in the center.",
                                "Dragon tattoo: A mythical dragon, coiled and ready to strike, with scales and fire.",
                                "Butterfly tattoo: A colorful butterfly, with wings spread, showing intricate patterns.",
                                "Compass tattoo: An old nautical compass, with a detailed face and cardinal directions.",
                                "Phoenix tattoo: A phoenix in the process of rebirth, surrounded by flames.",
                                "Wave tattoo: A series of detailed, curling ocean waves, possibly with foam crests.",
                                "Lotus tattoo: A blooming lotus flower, with detailed petals over a pond surface.",
                                "Tree of life tattoo: A sprawling tree, with roots and branches intricately intertwined.",
                                "Mandala tattoo: A complex, symmetrical mandala, with detailed geometric patterns.",
                                "Lion tattoo: A majestic lion's face, with a detailed mane and fierce expression.",
                                "Wolf tattoo: A lone wolf, howling or prowling, with fur details.",
                                "Elephant tattoo: A majestic elephant, with detailed skin texture and peaceful eyes.",
                                "Dreamcatcher tattoo: A traditional dreamcatcher, with feathers and beads hanging from it.",
                                "Hourglass tattoo: An hourglass with sand flowing, with detailed glass and sand textures.",
                                "Semicolon tattoo: A simple semicolon, possibly incorporated into a larger design.",
                                "Abstract geometric tattoo: Complex geometric shapes, interlocking in an abstract design.",
                                "Quill and ink tattoo: An antique quill pen, with ink splatters, possibly writing words.",
                                "Crescent moon tattoo: A delicate crescent moon, possibly with a face or surrounded by stars.",
                                "Fingerprint heart tattoo: A heart made of two overlapping fingerprints, showing unique patterns.",
                                "Origami tattoo: A detailed origami crane, with precise folds and creases.",
                                "Starry night sky tattoo: A night sky filled with stars, possibly with a galaxy or constellation.",
                                "Bonsai tree tattoo: A miniature bonsai tree, with detailed leaves and a twisted trunk.",
                                "Octopus tattoo: An octopus spreading its tentacles, with detailed suction cups.",
                                "Molecule tattoo: A specific molecule structure, with atoms connected by bonds.",
                                "Paper plane tattoo: A simple paper plane, with detailed folds and shadows.",
                                "Teapot tattoo: A classic porcelain teapot, with a detailed pattern and steam.",
                                "Sailor Jerry mermaid tattoo: A stylized mermaid, with classic Sailor Jerry tattoo elements.",
                                "Old school ship tattoo: A traditional tall ship, with full sails and waves.",
                                "Swallow tattoo: A pair of swallows in flight, with detailed feathers and colors.",
                                "Dagger through heart tattoo: A heart pierced by a detailed dagger, with drops of blood.",
                                "Snake and dagger tattoo: A coiled snake around a dagger, with detailed scales and blade.",
                                "Traditional eagle tattoo: An eagle in flight, with spread wings and detailed feathers.",
                                "Anchor with banner tattoo: An anchor with a flowing banner for names or quotes.",
                                "Traditional rose with dagger tattoo: A rose intertwined with a dagger, showing both beauty and danger.",
                                "Classic girl tattoo: A vintage reasonably dressed pin-up girl, with classic attire and pose.",
                                "Ship in a bottle tattoo: A detailed ship inside a glass bottle, with waves and cork.",
                                "Tiger tattoo: A fierce tiger, with detailed stripes and menacing eyes.",
                                "Bamboo tattoo: A cluster of bamboo stalks, with detailed leaves and joints.",
                                "Peony flower tattoo: A blooming peony, with detailed petals and lush leaves.",
                                "Hannya mask tattoo: A detailed Hannya mask, showing expressions of rage and sorrow.",
                                "Bonsai tree tattoo: A serene bonsai tree, with intricate branches and peaceful aura.",
                                "Phoenix tattoo: A vibrant phoenix in flight, with detailed feathers and flames.",
                                "Dragon and phoenix tattoo: A dragon and phoenix circling each other, symbolizing balance.",
                                "Korean hanbok tattoo: A detailed Korean hanbok, showing elegance and beauty."                            
                            ];
                            const randomIndex = Math.floor(Math.random() * tattooIdeas.length);
                            return tattooIdeas[randomIndex];
                        })();
                    
                        // Then, update the state with these values
                        setName(updatedName);
                        setMoodChoice(updatedMoodChoice);
                        setChoice(updatedChoice);
                        setContext(updatedContext);
                    
                        // Finally, pass the updated values to the function
                        generateTextAndImage(updatedName, updatedMoodChoice, updatedChoice, updatedContext);
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
