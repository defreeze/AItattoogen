// promptGenerator for traditional tattoo
export function generatePrompt_traditional(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `
    Design a traditional style tattoo that embodies the time-honored aesthetics of classic tattooing, tailored for an individual whose reason for the tattoo is '${variables.MOODHERE}'. 
    The centerpiece of this tattoo is '${variables.CONTEXTHERE}'. 
    A subject that demands creative interpretation within the boundaries of traditional tattoo elements such as bold lines, solid fill colors, and iconic motifs. 
    The tattoo should primarily utilize a palette of classic colors—deep blacks, vibrant reds, and pure blues—to highlight and frame the topic, adding layers of depth and interest to the composition. Emphasize the contrast between the simplicity and the dynamism of traditional tattooing techniques to capture the topics unique charm, ensuring the design resonates with the timeless appeal of the traditional style, reflecting a deep respect for the art form's rich history and its enduring symbols.`;
}
