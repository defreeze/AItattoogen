// promptGenerator for ignorant tattoo
export function generatePrompt_ignorant(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `
    Design an amazing black and white 'ignorant' style tattoo that embodies the distinctive and intricate style of the renowned tattoo artist Fuzi. 
    This tattoo, created for someone with the motivation '${variables.MOODHERE}'. They explain the topic of the tattoo as follows: '${variables.CONTEXTHERE}'. 
    The ignorant style by renowned artist Fuzi features simplistic and whimsical illustrations with bold thin lines and minimalistic designs. 
    The art should look deliberately naive, resembling drawings by someone without traditional training, delibrately poorly drawn. 
    Predominantly in black ink with occasional vibrant color accents. The composition should echo contemporary street art's ethos of being edgy and unique.`;
}
