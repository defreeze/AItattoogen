// promptGenerator for geometric tattoo
export function generatePrompt_geometric(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `
    Design a black and white geometric tattoo that embodies the distinctive and intricate style of the renowned tattoo artist Nissaco. 
    This tattoo, created for someone with the motivation '${variables.MOODHERE}'.  
    hey explain the  topic of the tattoo as follows: '${variables.CONTEXTHERE}'.
    The design should be devoid of text, focusing purely on the geometric and abstract patterns that define Nissaco's work. 
    It's important that the design is visually striking, with clear and bold lines that would translate well into a tattoo, set against a white background to emphasize the geometric details.`;
}
