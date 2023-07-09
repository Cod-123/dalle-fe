import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt) {

    // function written in order to get a random index from the surpriseMePrompts array and assign it to a variable
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
    const randomPrompt= surpriseMePrompts[randomIndex];

    //ensures that the same prompt isnt generated twice in a row
    if(randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }

    return randomPrompt;

}

//triggers a user download of the image
export async function downloadImage(_id,photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}


