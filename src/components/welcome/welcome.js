class Welcome{
    constructor(){
        this.blinking = false;
        this.writeToScreen()
    }

    writeToScreen(){
        let element = '#welcome-message-1';
        this.startCursorBlink({element: element, timeBetweenBlinks: 700})
        this.writeAndRemoveWordArray({element: element, array: ['Hi there', 'I\'m Tyler Reardon'], timeBetweenWords: 2000, timeBetweenLetters: 250, callback:()=>{
                this.stopCursorBlink()
                this.expandWelcome({element: element});
            }
        });
    }

    expandWelcome(pObject = {element: null}){
        $(pObject.element).addClass('welcome-expanded');
    }

    contractWelcome(pObject = {element: null}){
        $(pObject.element).removeClass('welcome-expanded');
    }

    startCursorBlink(pObject = {element: null, timeBetweenBlinks: 0}){
        this.blinking = true;
        this.blinkCursorRepeat({element: pObject.element, timeBetweenBlinks: pObject.timeBetweenBlinks});
    }

    stopCursorBlink(){
        this.blinking = false;
    }

    blinkCursorRepeat(pObject = {element: null, timeBetweenBlinks: 0}){
        if(this.blinking){
            this.blinkCursor({element: pObject.element, timeBetweenBlinks: pObject.timeBetweenBlinks, callback: ()=>{
                setTimeout(()=>{
                    this.blinkCursorRepeat({element: pObject.element, timeBetweenBlinks: pObject.timeBetweenBlinks});
                }, pObject.timeBetweenBlinks)
            }});
        }
    }

    blinkCursor(pObject = {element: null, timeBetweenBlinks: 0, callback: ()=>{}}){
        $(pObject.element).addClass('cursor-on');
        setTimeout(()=>{
            $(pObject.element).removeClass('cursor-on');
            if(typeof pObject.callback === 'function'){
                pObject.callback();
            }
        }, pObject.timeBetweenBlinks);
    }

    writeAndRemoveWordArray(pObject = {element: null, array: [], timeBetweenWords: 0, timeBetweenLetters: 0, callback: ()=>{}}){
        if(pObject.array.length == 0){
            if(typeof pObject.callback === 'function'){
                pObject.callback();
            }
            return;
        }

        this.writeAndRemoveWord({element: pObject.element, word: pObject.array[0], timeBetweenLetters: pObject.timeBetweenLetters, timeBetweenWords: pObject.timeBetweenWords, callback: ()=>{
            let slicedArray = pObject.array.slice(1, pObject.array.length);
            this.writeAndRemoveWordArray({element: pObject.element, array: slicedArray, timeBetweenWords: pObject.timeBetweenWords, timeBetweenLetters: pObject.timeBetweenLetters, callback: pObject.callback})
        }});
    }

    writeAndRemoveWord(pObject = {element: null, word: '', timeBetweenLetters: 0, timeBetweenWords: 0, callback:()=>{}}){
        this.writeWordToElement({element: pObject.element, word: pObject.word, timeBetween: pObject.timeBetweenLetters*(2/3), callback: ()=>{
            setTimeout(()=>{
                this.removeWordFromElement({element: pObject.element, timeBetween: pObject.timeBetweenLetters*(1/3), callback: pObject.callback});
            }, pObject.timeBetweenWords);
        }});
    }

    writeWordToElement(pObject = {element: null, word: '', timeBetween: 0, callback: ()=>{}}){
        let element = $(pObject.element);
        let word = pObject.word;
        if(element === null || word === null || word === '')
            return;

        for(let i = 0; i < word.length; i++){
            let partial = word.slice(0,i+1);
            setTimeout(()=>{
                $(element).text(partial);
                if(this.blinking){
                    $(element).addClass('cursor-on');
                }
            }, pObject.timeBetween*i);
        }

        if(typeof pObject.callback === 'function'){
            setTimeout(()=>{
                pObject.callback();
            }, pObject.timeBetween*word.length);
        }
    }

    removeWordFromElement(pObject = {element: null, timeBetween: 0, callback: ()=>{}}){
        let element = $(pObject.element);
        if(element === null)
            return;

        let word = $(element).text();
        for(let i = word.length; i >= 0; i--){
            let partial = word.slice(0,i);
            setTimeout(()=>{
                $(element).text(partial);
                if(this.blinking){
                    $(element).addClass('cursor-on');
                }
            }, pObject.timeBetween*(word.length-i));
        }

        if(typeof pObject.callback === 'function'){
            setTimeout(()=>{
                pObject.callback();
            }, pObject.timeBetween*word.length);
        }
    }
}

$(document).ready(()=>{
    let welcome = new Welcome();
});
