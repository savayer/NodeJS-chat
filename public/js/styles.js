const body = document.body;
const settingsToggleButton = document.querySelector('.settings__toggle');
const settingsToggleSection = document.querySelector('.settings');


settingsToggleButton.addEventListener('click', function() {
    settingsToggleSection.classList.toggle('active');
    this.querySelector('.settings__icon').classList.toggle('rotate');
})


const bgColor = Pickr.create({
    el: '.bg-color',
    theme: 'nano', // or 'monolith', or 'nano'
    swatches: ['rgba(244, 67, 54, 1)','rgba(233, 30, 99, 0.95)','rgba(156, 39, 176, 0.9)','rgba(103, 58, 183, 0.85)','rgba(63, 81, 181, 0.8)','rgba(33, 150, 243, 0.75)','rgba(3, 169, 244, 0.7)','rgba(0, 188, 212, 0.7)','rgba(0, 150, 136, 0.75)','rgba(76, 175, 80, 0.8)','rgba(139, 195, 74, 0.85)','rgba(205, 220, 57, 0.9)','rgba(255, 235, 59, 0.95)','rgba(255, 193, 7, 1)'],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

setTimeout(function() {
    bgColor.setColor('#2a4b55')
}, 500)

bgColor.on('save', color => {
    body.style.background = color.toHEXA().toString();    
})


const fontColor = Pickr.create({
    el: '.font-color',
    theme: 'nano', // or 'monolith', or 'nano'
    swatches: ['rgba(244, 67, 54, 1)','rgba(233, 30, 99, 0.95)','rgba(156, 39, 176, 0.9)','rgba(103, 58, 183, 0.85)','rgba(63, 81, 181, 0.8)','rgba(33, 150, 243, 0.75)','rgba(3, 169, 244, 0.7)','rgba(0, 188, 212, 0.7)','rgba(0, 150, 136, 0.75)','rgba(76, 175, 80, 0.8)','rgba(139, 195, 74, 0.85)','rgba(205, 220, 57, 0.9)','rgba(255, 235, 59, 0.95)','rgba(255, 193, 7, 1)'],
    components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
            hex: true,
            rgba: true,
            input: true,
            clear: true,
            save: true
        }
    }
});

setTimeout(function() {
    fontColor.setColor('#c2cecf')
}, 500)

fontColor.on('save', color => {
    body.style.color = color.toHEXA().toString();    
})