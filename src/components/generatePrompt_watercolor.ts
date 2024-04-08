// promptGenerator for watercolor tattoo
export function generatePrompt_watercolor(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `
    Envision a tattoo design that marries the delicate and vibrant essence of watercolor painting with the enduring charm of traditional tattoo symbolism. 
    At the heart of this unique piece is the topic described by the user: '${variables.CONTEXTHERE}'. The motivation of the user to get the tattoo is '${variables.MOODHERE}', consider this when designing.
    It needs to be depicted not with bold lines and solid fills, but with the flowing, diffuse edges and gradient hues characteristic of watercolor art. 
    The topic described is surrounded by a selection of motifs borrowed from traditional tattoo iconographyrendered in the luminous, fluid style of watercolors. 
    The colors should be rich and varied, moving seamlessly from one to another, to emulate the natural bleeding of watercolor pigments on paper. 
    Highlights and shadows are suggested through color density and the juxtaposition of hues rather than defined lines. `;
}
