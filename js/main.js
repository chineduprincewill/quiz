if(document.querySelector("#request")){
    let container = document.querySelector('#container');


    let getQuestionNumber =  function(){
        let inputValue  =  document.querySelector('#question_number');
        let category =  document.querySelector('#category');
        return [inputValue.value, category.value];
    }

    let set_question_in_page =  function(data){
        let questionNumber = getQuestionNumber()[0];
        let category = getQuestionNumber()[1];
        container.innerHTML = `<div class="question"><p style="color: red;">Question ( ${questionNumber} )</p> ${data[category][questionNumber].question}</div>`;
    }

    let set_answer_in_page =  function(data){
        let questionNumber = getQuestionNumber()[0];
        let category = getQuestionNumber()[1];
        container.innerHTML = `<div class="question"><p style="color: red;">Answer ( ${questionNumber} )</p> ${data[category][questionNumber].answer}</div>`;
    }

    let populate_page_with_question = async function(e){
        e.preventDefault();

        fetch('./json/questions.json')
        .then( res => res.text())
        .then( (datas) =>  {
            set_question_in_page(JSON.parse(datas));
        });
    }

    let populate_page_with_answer =  async function(e){
        e.preventDefault();

        fetch('./json/questions.json')
        .then( res => res.text())
        .then( (datas) =>  {
            set_answer_in_page(JSON.parse(datas));
        });
    }



    document.querySelector('form#request').addEventListener('submit', populate_page_with_question);
    document.querySelector('button#answer_submit').addEventListener('click', populate_page_with_answer);
}


(function() {
    var FX = {
        easing: {
            linear: function(progress) {
                return progress;
            },
            quadratic: function(progress) {
                return Math.pow(progress, 2);
            },
            swing: function(progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            circ: function(progress) {
                return 1 - Math.sin(Math.acos(progress));
            },
            back: function(progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            },
            bounce: function(progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            elastic: function(progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            }
        },
        animate: function(options) {
            var start = new Date;
            var id = setInterval(function() {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress == 1) {
                    clearInterval(id);
                    options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function(element, options) {
            var to = 1;
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = to - delta;
                }
            });
        },
        fadeIn: function(element, options) {
            var to = 0;
            this.animate({
                duration: options.duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                complete: options.complete,
                step: function(delta) {
                    element.style.opacity = to + delta;
                }
            });
        }
    };
    window.FX = FX;
})()

document.getElementById('question_submit').addEventListener('click', function() {
    FX.fadeIn(document.getElementById('container'), {
        duration: 3000
    });
}, false);


document.getElementById('answer_submit').addEventListener('click', function() {
    FX.fadeIn(document.getElementById('container'), {
        duration: 5000
    });
}, false);
