const TypeWriter = function(txtElement, words, wait = 3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;

}

// Type Method - adding the method type to TypeWriter by using prototype
TypeWriter.prototype.type = function(){
    // Current index of word -> using modulus make sure we are not getting out of bounds error
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting){
        // Remove char - create a substring of full word shorter by one char
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        // Add char - create a substring of full word from 0 to length + 1
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if(this.isDeleting){
        typeSpeed /= 2;
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fullTxt){
        // setting speed to wait time will create a pause at the end
        typeSpeed = this.wait;
        // Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        // Move to next word - word index is divided by length and a modulus is taken
        this.wordIndex++;
        // Pause before start typing
        typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed)
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);


//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    
    // Parsing by running through JSON.parse -> as otherwise all the words would be a single string
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
    
}

window.onload = function init2(){
    console.log("I have loaded");
}