// promptGenerator for japanese tattoo
export function generatePrompt_japanese(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `
    
    Design a Japanese style tattoo that captures the essence of traditional Irezumi, for someone who is motivated by '${variables.MOODHERE}'. 
    The central motif '${variables.CONTEXTHERE}' that should be interpreted with the rich symbolism and intricate detail characteristic of Japanese tattoo art. 
    The tattoo should be primarily in black and grey shading, with potential for vibrant color highlights to accentuate the image and integrated elements, adding depth and life to the design. 
    Aim for a composition that balances the playful spirit of the subject with the elegance and precision of Japanese tattooing, reflecting a deep appreciation for nature, mythology, and the art form's storied history.`;
}
