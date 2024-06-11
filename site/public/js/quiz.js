const questions = [
    {
        question: "Onde está localizado o Canadá?",
        answers: [

            { text: "América do Norte", correct: true },
            { text: "Europa", correct: false },
            { text: "América Central", correct: false },
            { text: "América do Sul", correct: false }
        ]
    },
    {
        question: "Quais os idiomas oficiais do Canadá?",
        answers: [

            { text: "Somente o Inglês", correct: false },
            { text: "Inglês e Alemão", correct: false },
            { text: "Inglês e Francês", correct: true },
            { text: "Inglês e Italiano", correct: false }
        ]
    },
    {
        question: "De quantas províncias o Canadá é formado?",
        answers: [

            { text: "8 províncias", correct: false },
            { text: "11 províncias", correct: false },
            { text: "7 províncias", correct: false },
            { text: "10 províncias", correct: true }
        ]
    },
    {
        question: "Qual é a capital do Canadá?",
        answers: [

            { text: "Vancouver", correct: false },
            { text: "Calgary", correct: false },
            { text: "Toronto", correct: false },
            { text: "Ottawa", correct: true }
        ]
    },
    {
        question: "Qual desses esportes é a paixão nacional no Canadá?",
        answers: [

            { text: "Rúgbi", correct: false },
            { text: "Hockey no Gelo", correct: true },
            { text: "Futebol", correct: false },
            { text: "Basquete", correct: false }
        ]
    },
    {
        question: "Quais dessas cidades não estão entre as 10 mais populosas do Canadá?",
        answers: [

            { text: "Hamilton e Kitchener", correct: false },
            { text: "Winnipeg e Quebec", correct: false },
            { text: "Edmonton e Calgary", correct: false },
            { text: "St. Catharines e Victoria", correct: true }
        ]
    },
    {
        question: "No Canadá está localizada a 3ª melhor cidade do mundo pra se viver. Qual é o nome dessa cidade?",
        answers: [

            { text: "Vancouver", correct: true },
            { text: "Wellington", correct: false },
            { text: "Toronto", correct: false },
            { text: "San Francisco", correct: false }
        ]
    },
    {
        question: "Quantos habitantes aproximadamente tem o Canadá?",
        answers: [

            { text: "29,7 milhões", correct: false },
            { text: "30,9 milhões", correct: false },
            { text: "38,9 milhões", correct: true },
            { text: "40,7 milhões", correct: false }
        ]
    },
    {
        question: "De qual outro país o Canadá mais depende?",
        answers: [

            { text: "Brasil", correct: false },
            { text: "Estados Unidos", correct: true },
            { text: "Reino Unido", correct: false },
            { text: "França", correct: false }
        ]
    },
    {
        question: "Como se chama a folha símbolo do Canadá?",
        answers: [

            { text: "Aspen", correct: false },
            { text: "Hazel", correct: false },
            { text: "Willow", correct: false },
            { text: "Maple", correct: true }
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('resposta');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        // if (button.dataset.correct === "true") {
        //     button.classList.add("correct");
        // }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `
    Você marcou ${score} de ${questions.length}!
    <br><br>
    <button onclick="startQuiz()" class="botao-reiniciar">Tentar Novamente!</button>`;
    document.getElementById('next-btn').style.display="none"
    armazenarPontuacao();
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

function armazenarPontuacao(){

    var idUsuario = sessionStorage.getItem('ID_USUARIO')
    fetch("../quiz/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "appLication/json"
        },
        body: JSON.stringify ({
            scoreServer : score,
            idUsuarioServer: idUsuario 
        })
    }) .then(function (resposta){
        console.log("Resposta da pontuação", resposta)
    }) .catch(function (erro){
        console.log("Erro", erro)
    })
}