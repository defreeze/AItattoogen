// preloadImages.js

const imageUrls = [
    "/AI_tattoo_girl_1.png",
    "/AI_tattoo_girl_1_animate2.png",
    "/spell-visual1.png",
    //"/AI_tarot_final1_female.png",
    //"/AI_tarot_final1_female_animation.png",
    "/AI_tattoo_man_1.png",
    "/AI_tattoo_man_1_animation2.png",
    "/AI_tattoo_clown_2.png",
    "/AI_tattoo_clown_2_animate.png",
    "/AI_tattoo_clown_2_animation_balloon1.png"
];

export const preloadImages = () => {
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
};
