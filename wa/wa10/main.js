const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array)
{
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = 'In a land where :insertz:s ruled supreme, a rebellious :insertz: named :insertx: dreamed of becoming king of the :insertz:s. So, :insertx: went on a quest to :inserty: to get the super special sword. But :insertx: never returned from :inserty:.';
const insertX = 
[
    'Bumblesnoot McGiggles',
    'Bubba McFluffernutter',
    'Kyle'  
];

const insertY = 
[
    'Wibble Wobble Junction',
    'Mommy Meadows',
    'George Gorge'
];
  
const insertZ = 
[
    'potatoe',
    'giraffe',
    'narwal'
];

randomize.addEventListener('click', result);

function result() 
{
    let newStory = storyText;

    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);
  
    newStory = newStory.replaceAll(':insertx:', xItem);
    newStory = newStory.replaceAll(':inserty:', yItem);
    newStory = newStory.replaceAll(':insertz:', zItem);


    if(customName.value !== '') 
    {
        const name = customName.value;
        newStory = newStory.replaceAll('Bob', name);
    }
  
    if(document.getElementById("uk").checked) 
    {
        const weight = Math.round(300 * 0.071429) + ' stone';
        const temperature = Math.round((94 - 32) * (5 / 9)) + ' centigrade';
        newStory = newStory.replaceAll('94 fahrenheit', temperature);
        newStory = newStory.replaceAll('300 pounds', weight);
    }

    story.textContent = newStory;
    story.style.visibility = 'visible';

  }