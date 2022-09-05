// function getText(){
//     if (document.getSelection){
//         let text = document.getSelection().toString()
//         console.log(text)
//     } else{
//         if (document.selection){
//             let text2 = document.selection.createRange();
//             console.log(text2)
//         }
//     }
// }


const textarea = document.querySelector('textarea'), 
voiceList = document.querySelector("select"),
speechbtn = document.querySelector('button')

let synth = speechSynthesis,
isSpeaking = true

voices();

function voices(){
    for (let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "Selected":""
        let option = `<option value = "${voice.name}">${voice.name} (${voice.lang})</option>`
        voiceList.insertAdjacentHTML('beforeend',option)
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text)
    for (let voice of synth.getVoices()){
        utternance.voice = voice
    }
    synth.speak(utternance)

}

speechbtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechbtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechbtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechbtn.innerText = "Resume Speech";
            }
        }else{
            speechbtn.innerText = "Convert To Speech";
        }
    }
});