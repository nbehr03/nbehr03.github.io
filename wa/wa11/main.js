const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = [
    'pic1.png',
    'pic2.jpg',
    'pic3.jpg',
    'pic4.jpg',
    'pic5.jpg'];

/* Declaring the alternative text for each image file */

const alts = {
    'pic1.png' : 'Closeup of a human eye',
    'pic2.jpg' : 'pic of the ocean',
    'pic3.jpg' : 'Boulder sunset',
    'pic4.jpg' : 'Rockies stadium sunset',
    'pic5.jpg' : 'Sunset from the highway'
}

/* Looping through images */

for (const image of images)
{

    const newImage = document.createElement('img');
    newImage.setAttribute('src', image);
    newImage.setAttribute('alt', alts[image]);
    thumbBar.appendChild(newImage);

    newImage.addEventListener('click', function()
    {

        displayedImage.setAttribute('src', this.getAttribute('src'));
        displayedImage.setAttribute('alt', this.getAttribute('alt'));


    }
    );

}

/* Wiring up the Darken/Lighten button */


btn.addEventListener('click', function()
{

    if (btn.getAttribute('class') === 'dark' ) 
    {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    }

    else
    {
        btn.setAttribute('class','dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }

}
);