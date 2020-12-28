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
        container.innerHTML = `<div class="question">Question: ${data[category][questionNumber].question}</div>`;
    }

    let set_answer_in_page =  function(data){
        let questionNumber = getQuestionNumber()[0];
        let category = getQuestionNumber()[1];
        container.innerHTML += `<div class="answer">Answer: <br><br>${data[category][questionNumber].answer}</div>`;
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
