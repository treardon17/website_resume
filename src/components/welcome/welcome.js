class Welcome{
    constructor(){
        this.blinking = false;
        this.element = $('.welcome')[0];
        this.writer = '#welcome-message-1';
        this.welcomeNavs = $(this.element).find('.welcome-nav');
        this.welcomeNavButtons = $(this.element).find('.welcome-nav-button');
        this.writeToScreen(this.writer);
    }

    writeToScreen(writer){
        this.startCursorBlink({writer: writer, timeBetweenBlinks: 700})
        this.writeAndRemoveWordArray({writer: writer, array: ['Hi there', 'I\'m Tyler Reardon'], timeBetweenWords: 2000, timeBetweenLetters: 250, callback:()=>{
                this.stopCursorBlink()
                this.expandWelcome();
            }
        });
    }

    expandWelcome(){
        $(this.writer).addClass('welcome-expanded');
        $(this.welcomeNavs).addClass('welcome-nav-expanded');
        $(this.welcomeNavButtons).addClass('welcome-nav-button-visible');
    }

    contractWelcome(){
        $(this.writer).removeClass('welcome-expanded');
        $(this.welcomeNavs).removeClass('welcome-nav-expanded');
        $(this.welcomeNavButtons).removeClass('welcome-nav-button-visible');
    }

    startCursorBlink(pObject = {writer: null, timeBetweenBlinks: 0}){
        this.blinking = true;
        this.blinkCursorRepeat({writer: pObject.writer, timeBetweenBlinks: pObject.timeBetweenBlinks});
    }

    stopCursorBlink(){
        this.blinking = false;
    }

    blinkCursorRepeat(pObject = {writer: null, timeBetweenBlinks: 0}){
        if(this.blinking){
            this.blinkCursor({writer: pObject.writer, timeBetweenBlinks: pObject.timeBetweenBlinks, callback: ()=>{
                setTimeout(()=>{
                    this.blinkCursorRepeat({writer: pObject.writer, timeBetweenBlinks: pObject.timeBetweenBlinks});
                }, pObject.timeBetweenBlinks)
            }});
        }
    }

    blinkCursor(pObject = {writer: null, timeBetweenBlinks: 0, callback: ()=>{}}){
        $(pObject.writer).addClass('cursor-on');
        setTimeout(()=>{
            $(pObject.writer).removeClass('cursor-on');
            if(typeof pObject.callback === 'function'){
                pObject.callback();
            }
        }, pObject.timeBetweenBlinks);
    }

    writeAndRemoveWordArray(pObject = {writer: null, array: [], timeBetweenWords: 0, timeBetweenLetters: 0, callback: ()=>{}}){
        if(pObject.array.length == 0){
            if(typeof pObject.callback === 'function'){
                pObject.callback();
            }
            return;
        }

        this.writeAndRemoveWord({writer: pObject.writer, word: pObject.array[0], timeBetweenLetters: pObject.timeBetweenLetters, timeBetweenWords: pObject.timeBetweenWords, callback: ()=>{
            let slicedArray = pObject.array.slice(1, pObject.array.length);
            this.writeAndRemoveWordArray({writer: pObject.writer, array: slicedArray, timeBetweenWords: pObject.timeBetweenWords, timeBetweenLetters: pObject.timeBetweenLetters, callback: pObject.callback})
        }});
    }

    writeAndRemoveWord(pObject = {writer: null, word: '', timeBetweenLetters: 0, timeBetweenWords: 0, callback:()=>{}}){
        this.writeWordTowriter({writer: pObject.writer, word: pObject.word, timeBetween: pObject.timeBetweenLetters*(2/3), callback: ()=>{
            setTimeout(()=>{
                this.removeWordFromwriter({writer: pObject.writer, timeBetween: pObject.timeBetweenLetters*(1/3), callback: pObject.callback});
            }, pObject.timeBetweenWords);
        }});
    }

    writeWordTowriter(pObject = {writer: null, word: '', timeBetween: 0, callback: ()=>{}}){
        let writer = $(pObject.writer);
        let word = pObject.word;
        if(writer === null || word === null || word === '')
            return;

        for(let i = 0; i < word.length; i++){
            let partial = word.slice(0,i+1);
            setTimeout(()=>{
                $(writer).text(partial);
                if(this.blinking){
                    $(writer).addClass('cursor-on');
                }
            }, pObject.timeBetween*i);
        }

        if(typeof pObject.callback === 'function'){
            setTimeout(()=>{
                pObject.callback();
            }, pObject.timeBetween*word.length);
        }
    }

    removeWordFromwriter(pObject = {writer: null, timeBetween: 0, callback: ()=>{}}){
        let writer = $(pObject.writer);
        if(writer === null)
            return;

        let word = $(writer).text();
        for(let i = word.length; i >= 0; i--){
            let partial = word.slice(0,i);
            setTimeout(()=>{
                $(writer).text(partial);
                if(this.blinking){
                    $(writer).addClass('cursor-on');
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
