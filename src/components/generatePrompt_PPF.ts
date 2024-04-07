// promptGenerator for past/present/future
export function generatePrompt_PPF(variables: {
    NAMEHERE: string;
    MOODHERE: string;
    CONTEXTHERE: string;
}): string {
    return `Generate an image that visually represents the mood of uncertainty and anticipation in a tarot reading. Include symbolic elements like tarot cards with ambiguous symbols, a dimly lit room suggesting introspection, and objects that symbolize transition or decision-making.`;

}
