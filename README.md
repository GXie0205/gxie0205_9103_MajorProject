# Creative Coding Major Project - Perlin Noise
## Instructions
Click anywhere on the screen to watch the city come to life. Click again to watch the city sleep once more.

## Details of approach
**Method chosen:** Perlin noise


### Inspirations and Motivations
For my animation, I wanted to focus on really bringing the city to life, making it feel even more chaotic and lively. I really wanted to capture the essence of chaos in Piet Mondrian's work. I also took inspiration from other pieces such as Reginald Marsh's [*Pip and Flip (1932)*](https://conversations.terraamericanart.org/artworks/pip-and-flip/) which really emphasises the sense of liveliness. I wanted to convey this same feeling through movement of the seemingly rigid building structures, implying that the New York night life (of which the original is based off) is so boistorous such that even the buildings seem to move and sway to the music.

![Pip and Flip (1932) by Reginald Marsh](https://github.com/GXie0205/gxie0205_9103_MajorProject/blob/main/pip_and_flip.jpg?raw=true)
[Pip and Flip (1932) by Reginald Marsh](https://conversations.terraamericanart.org/artworks/pip-and-flip/) 

### Animation Overview
In general, due to the prevalence of very specific colours in Piet Mondrian's works, as a group we avoided playing around too much with colour as we felt that detracted to much from the original work. Instead, we focussed on other aspects such as size and position. 

For my animation, I focussed predominantly on changing each individual rectangle's X position as well as height. This was to give off the sense of each rectangle alost appearing like a person swaying and dancing in the night. I specifically chose to fix the Y positions as well as the widths to avoid the piece becoming too messy and losing the original shape of the buildings. Furthermore, I fixed the position of the main yellow and black rectangles that defined the main building structure (the walls/floors/ceilings) in order to further maintain the original shapes of the buildings.

Additionally, to add to the liveliness of the atmosphere, I added pulses of light to the background to simulate music and flashing lights as one might see in a typical New York nightscape. This was inspired by photography of the New York cityscape as shown in some of Andrew Prokos' works.

![Panoramic View of Times Square at Night III by Andrew Prokos](https://github.com/GXie0205/gxie0205_9103_MajorProject/blob/main/newyork_night.jpg?raw=true)
[Panoramic View of Times Square at Night III by Andrew Prokos](https://andrewprokos.com/photo/times-square-panoramic-view-night/) 

This differs from the way in which my group members animate their works as this focusses more on small movements of all individual blocks that move independently of one another to create a more chaotic view of our original work.

### Technical Overview
The key major change I had to make was to change all the drawRect() functions to instead instantiate a new class object named ChangeRect. This was so I could individually change the position and size of each rectangle using perlin noise.

The rest of the building animation was completed by applying perlin noise to the both the X position and height of the rectangle. Each rectangle was instantiated with a randomised starting position for the X and height noise values. This would ensure the rectangles would move in different patterns.Furthermore, the animation is only triggered once a boolean 'daytime' is false. The transition between day and night is assisted with a fading background into black as well as the usage of the lerp() function to gradually increase the amplitude of noise() function.

The lights are also animated using perlin noise but instead affecting the light's size. These were kept square to maintain the neo-plasticism style of Piet Mondrian and a rectMode(CENTER) was applied in order to ensure the rects pulsated from the center rather than the corner.