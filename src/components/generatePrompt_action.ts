// promptGenerator for situation/action/result reading
export function generatePrompt_action(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `Create a tattoo design in the theme of 'memorial'. The style of the tattoo should 
    reflect '${variables.MOODHERE}' with elements that resonate with the concept of remembrance 
    and homage. Incorporate specific symbols or imagery mentioned: '${variables.CONTEXTHERE}', 
    to make the design personal and meaningful. The tattoo should evoke a sense of tribute, 
    celebrating the memory of the loved one or the cherished idea it represents.
    IMPORTANT: MAKE THE BACKGROUND WHITE SO THE IMAGE CAN BE USED AS TATTOO STENSIL!`;
}
