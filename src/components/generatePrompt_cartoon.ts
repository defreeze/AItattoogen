// promptGenerator for cartoon tattoo
export function generatePrompt_cartoon(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `
    Envision a vibrant and compelling tattoo design set against a stark white background, executed in the iconic, cartoon-inspired style reminiscent of the famous tattoo artist Mr. Cartoon. 
    This design is to be deeply influenced by the specified mood: '${variables.MOODHERE}', which should resonate through every aspect of the artwork, from its colors to its expressions and overall vibe. 
    The central theme of the tattoo revolves around '${variables.CONTEXTHERE}', a topic that holds significant importance and is to be interpreted with creativity and depth. 
    Each element of the tattoo, from its characters to its symbols and scenery, should reflect this theme, marrying the lightheartedness of cartoon aesthetics with the profound meanings and personal narratives behind the design. 
    Consider the interplay of bold lines, dynamic characters, and vivid, emotive colors that are characteristic of Mr. Cartoon's work, ensuring that the design not only captures the essence of the specified mood and context but also stands as a unique and timeless piece of art.`;
}
