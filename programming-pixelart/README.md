# Programming Pixel Art in JavaScript Talk Notes




## Programming Bitmaps / Pixel Art in Code



https://github.com/gmattie/Data-Pixels



Mario Bros

``` js

/**
 * @description DataPixels example of Nintendo's Mario Brothers
 *
 */
import DataPixels from "data-pixels";

/**
 * @description Creates a Mario or Luigi pixelData object
 * @param {boolean} isMario - Defines the brother's hat and shirt color.  Mario is red and Luigi is green.
 *
 */
function createMarioBrother(isMario = true) {

    const mainColor = (isMario) ? "255, 0, 0" : "0, 180, 0";

    const C = mainColor;        //Hat & Shirt
    const B = "100, 50, 0";     //Brown Hair & Boots
    const S = "255, 200, 150";  //Skin Tone
    const O = "0, 0, 255";      //Blue Overalls
    const Y = "255, 255, 0";    //Yellow Buckles
    const W = "255, 255, 255";  //White Gloves
    const _ = "0, 0, 0, 0";     //Transparent (RGBA Format)

    return [[_, _, _, C, C, C, C, C, _, _, _, _],
            [_, _, C, C, C, C, C, C, C, C, C, _],
            [_, _, B, B, B, S, S, B, S, _, _, _],
            [_, B, S, B, S, S, S, B, S, S, S, _],
            [_, B, S, B, B, S, S, S, B, S, S, B],
            [_, B, B, S, S, S, S, B, B, B, B, _],
            [_, _, _, S, S, S, S, S, S, S, _, _],
            [_, _, C, C, O, C, C, C, C, _, _, _],
            [_, C, C, C, O, C, C, O, C, C, C, _],
            [C, C, C, C, O, O, O, O, C, C, C, C],
            [W, W, C, O, Y, O, O, Y, O, C, W, W],
            [W, W, W, O, O, O, O, O, O, W, W, W],
            [W, W, O, O, O, O, O, O, O, O, W, W],
            [_, _, O, O, O, _, _, O, O, O, _, _],
            [_, B, B, B, _, _, _, _, B, B, B, _],
            [B, B, B, B, _, _, _, _, B, B, B, B]];
}

/*
 * Create and append a Mario Brother canvas instance
 *
 */
const pixelSize = 30;

const brother = new DataPixels(createMarioBrother(true), pixelSize).canvas;
brother.style.filter = "drop-shadow(0 10px 20px #000000)";

document.body.appendChild(brother);
```



## Color Schemes

rgb  - red / green / blue

with 8-bit (0-255) values




Hearts

``` js
/**
 * @description DataPixels example of multiple heart shaped instances of different hues and rotations
 *
 */
import DataPixels from "data-pixels";

/**
 * @description Properties of type <strong>{number}</strong> consist of:
 * <ul>
 *     <li> S </li>
 *     <li> M </li>
 *     <li> L </li>
 *     <li> XL </li>
 * </ul>
 *
 * @constant
 *
 */
const Size = {

    S: 10,
    M: 15,
    L: 20,
    XL: 25
};

/**
 * @description Creates a new heart shaped pixelData object of a specified hue
 * @param {number} red - The hue's red value
 * @param {number} green - The hue's green value
 * @param {number} blue - The hue's blue value
 * @param {number} lightness - The hue's applied value for brightness and darkness
 *
 */
function createPixelDataHeart(red, green, blue, lightness = 20) {

    const R = red;
    const G = green;
    const B = blue;
    const L1 = lightness;
    const L2 = L1 * 2;
    const H = `${R}, ${G}, ${B}`;                  //Main Hue
    const A = `${R + L2}, ${G + L2}, ${B + L2}`;   //Main Hue Light
    const Y = `${R - L1}, ${G - L1}, ${B - L1}`;   //Main Hue Dark
    const Z = `${R - L2}, ${G - L2}, ${B - L2}`;   //Main Hue Darker
    const $ = "0, 0, 0";                           //Stroke
    const _ = "0, 0, 0, 0";                        //Transparent

    return [[_, _, $, $, $, _, _, _, $, $, $, _, _],
            [_, $, H, H, H, $, _, $, Y, Y, Z, $, _],
            [$, H, H, A, H, H, $, H, H, Y, Y, Z, $],
            [$, H, A, H, H, H, H, H, H, H, Y, Z, $],
            [$, H, A, H, H, H, H, H, H, H, Y, Z, $],
            [$, H, H, H, H, H, H, H, H, H, Y, Z, $],
            [_, $, H, H, H, H, H, H, H, Y, Z, $, _],
            [_, _, $, H, H, H, H, H, H, Y, $, _, _],
            [_, _, _, $, H, H, H, H, Y, $, _, _, _],
            [_, _, _, _, $, H, H, Y, $, _, _, _, _],
            [_, _, _, _, _, $, Y, $, _, _, _, _, _],
            [_, _, _, _, _, _, $, _, _, _, _, _, _]];
}

/*
 * Create multiple heart canvases of different colors and sizes
 *
 */
const redHeart = new DataPixels(createPixelDataHeart(200, 0, 50), Size.XL).canvas;
const blueHeart = new DataPixels(createPixelDataHeart(50, 30, 210), Size.L).canvas;
const purpleHeart = new DataPixels(createPixelDataHeart(125, 70, 180), Size.M).canvas;
const greenHeart = new DataPixels(createPixelDataHeart(25, 160, 50), Size.S).canvas;

/*
 * Create a container for the heart canvases
 *
 */
const heartsContainer = document.createElement("div");
heartsContainer.style.filter = "drop-shadow(0 0 30px #FFFFFF)";

document.body.appendChild(heartsContainer);

/*
 * Rotate and append each heart canvas to the container
 *
 */
const rotationDelta = 15;

[redHeart, blueHeart, purpleHeart, greenHeart].forEach((heart, index) => {

    heart.style.transform = `rotate(${rotationDelta * index}deg)`;
    heartsContainer.appendChild(heart);
});
```





## Color Schemes Cont.

rgb  - red / green / blue

with 8-bit (0-255) values

### Alpha () Channel ?!

rgba  - red / green / blue / alpha

alpha values - 0-255

- 0 - transparent
- 255 - (fully) opaque  (same a no alpha channel)


Tip:
use - alpha channel only pixels
for:

face blemishes   - e.g. mole, spots

beard   -

hair  - e.g.   bold hair





## Notes on Graphics Formats



Why not .jpeg?

.jpeg is more for photos, etc.?

Use compression algos =>  NOT lossless.



For pixel art use .png.  - "lossless" format

.png - portable network graphics


supports different types:

- 8-bit pixel art / bitmaps  (rgba) - pixels encoded with indexed colors (0-255)

=> smallest possible encoding!

- true color pixel art / bitmaps (rgba)  - pixels encoded as 4 "true" color bytes (rgba)



## Notes on Pixel Art in HTML / CSS


default images are photos (NOT pixel art!)
why care?

if you zoon in / scale up  images (in your browser),
pixel art images get "blurry"

Why?


Different algorithms to scale-up images

Trivia Quiz  - What's the "scientific" name
for the "brute force" best-quality pixel art scaling algorithm?

- [A] Bilinear interpolation ?
- [B] Bicubic interpolation ?
- [C] Fourier-based interpolation ?
- [D] Edge-directed interpolation ?
- [E] Nearest-neighbor interpolation ?


see <https://en.wikipedia.org/wiki/Comparison_gallery_of_image_scaling_algorithms>




Use the "magic" css image-rendering property
to switch your image to pixel art (yes, supported in all browsers)

see <https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering>


use

```
image-rendering: pixelated;
```

Can I use?

see <https://caniuse.com/mdn-css_properties_image-rendering_pixelated>


Real-world example:

Ready-made pixel punks  - 24x24 in original
zoomed / scaled up via browser  4x

see <https://cryptopunksnotdead.github.io/punks.readymade/>



Tip:  Note - on github readmes you can use html img tag
BUT pixelated property if added gets stripped / auto-removed -
NOT whitelisted.  "Workaround" use github pages.





## Pixel Art Characters - Case Study - Ordinal Punks


- What are Ordinal Punks?

- 100 Pixel Art Punks (in 24x24) Inscribed On the Bitcoin Blockchain
  on February 9th, 2023

- Top Selling Collection!  All 100 Inscribition Below 1000!
  Current Count 100 000+ Inscription and Up.

see <https://github.com/cryptopunksnotdead/cryptopunks/tree/master/awesome-ordinalpunks>






## Ordinal (Pixel) Punks  Character Designer

What is a spritesheet?


- spritesheet.png
- spritesheet.csv

Example:

- <https://github.com/cryptopunksnotdead/cryptopunks/blob/master/ordinalpunks/spritesheet/spritesheet.png>
- 4x <https://github.com/cryptopunksnotdead/cryptopunks/blob/master/ordinalpunks/spritesheet/spritesheet%404x.png>
- <https://github.com/cryptopunksnotdead/cryptopunks/blob/master/ordinalpunks/spritesheet/spritesheet.csv>




## Aside  - Pixel Punks

see <https://github.com/cryptopunksnotdead/cryptopunks/tree/master/insidepunks>






## Learn Pixel Art

pixelart.js Libraries / Helpers


- https://learnpixelart.github.io/pixelart.js/dataset.js/dataset.js
- https://learnpixelart.github.io/pixelart.js/pixelart.js/composite.js
- https://learnpixelart.github.io/pixelart.js/pixelart.js/spritesheet.js
- https://learnpixelart.github.io/pixelart.js/pixelart.js/generator.js




Dataset

``` js
const dataset = Dataset.parseCsv( `id, name
  0, male 1
1, male 2
2, male 3
3, male 4
4, male blue
... `)
```














## (Open-Source) Ready-To-Use Character Generator in JavaScript

Note:  Most character sets are using vector graphics (svg).

Dice Bear by  Florian Körner (https://github.com/FlorianKoerner), Germany

- see <https://dicebear.com/>
- https://github.com/dicebear/dicebear

For Styles see
- <https://dicebear.com/styles>



