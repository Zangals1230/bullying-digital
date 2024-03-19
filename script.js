const questionDiv = document.getElementById('question');
const submitButton = document.getElementById('submitBtn');
const difficultySelector = document.createElement('div');
const playerNameInput = document.createElement('input');
playerNameInput.placeholder = "Insira seu nome";
playerNameInput.style.marginBottom = "10px";
difficultySelector.innerHTML = `
    <p>Selecione o nível de dificuldade:</p>
    <button id="normalBtn">Normal</button>
    <button id="hardBtn">Difícil</button>
`;
difficultySelector.style.marginBottom = "20px";
questionDiv.appendChild(playerNameInput);
questionDiv.appendChild(difficultySelector);

let playerName = '';
let playerData = JSON.parse(localStorage.getItem('playerData')) || [];
let currentDifficulty = '';

const questions = [
    {
        question: "Como podemos ajudar alguém que está sofrendo bullying?",
        options: [
           "Ignorar o problema e esperar que desapareça.",
            "Participar do bullying para não se tornar alvo.",
            "Rir da vítima para não ser alvo do bullying.",
            "Conversar com a vítima e oferecer apoio emocional.",
        ],
        correct_answer: "d"
    },
    {
        question: "Quais são as causas do bullying?",
        options: [
            "Diversos fatores, incluindo problemas familiares, sociais e psicológicos.",
            "Apenas diferenças físicas entre as pessoas.",
            "Falta de punição para os agressores.",
            "Pressão dos amigos para praticar bullying."
        ],
        correct_answer: "a"
    },
    {
        question: "Quais são os principais tipos de bullying?",
        options: [
            "Verbal, físico, psicológico e cyberbullying.",
            "Agressão, indiferença, conformismo e exclusão.",
            "Competição, discriminação, preconceito e abuso de poder.",
            "Provocação, negação, minimização e justificação."
        ],
        correct_answer: "a"
    },
    {
        question: "Quais são os efeitos do bullying na vítima?",
        options: [
             "Forte resistência psicológica e emocional.",
            "Melhoria na autoimagem e confiança.",
            "Desenvolvimento saudável de habilidades sociais.",
            "Baixa autoestima, depressão, ansiedade e até mesmo pensamentos suicidas.",
        ],
        correct_answer: "d"
    },
    {
        question: "Como prevenir o bullying?",
        options: [
           "Ignorando o problema e esperando que desapareça por si só.",
           "Promovendo a conscientização e ensinando habilidades sociais desde cedo.",
            "Punindo severamente as vítimas do bullying.",
            "Isolando os agressores do convívio social."
        ],
        correct_answer: "b"
    },
    {
        question: "O que motivou a autora a escrever o livro 'A face oculta?'",
        options: [
              "Ela queria ganhar dinheiro.",
            "Ela estava entediada e decidiu escrever um livro.",
            "Ela quis se vingar de alguém.",
            "Ela ouviu centenas de histórias de pessoas que sofrem bullying e cyberbullying de quem pratica e de quem participa dessas ações.",    
        ],
        correct_answer: "d"
    },
    {
        question: "Qual o objetivo do livro 'A face oculta?'",
        options: [
            "Promover o bullying.",
            "Incentivar o cyberbullying.",
            "Ajudar quem sofre bullying.",    
            "Divulgar os agressores."
        ],
        correct_answer: "c"
    },
    {
        question: "Quem é a Luciana, do livro 'A face oculta?'",
        options: [
              "A autora do livro.",
            "A melhor amiga da autora.",
            "A professora da escola.",
            "Uma vítima do Cyberbullying.",
       
        ],
        correct_answer: "d"
    },
    {
        question: "Por que Luciana não pediu ajuda para algum adulto após sofrer cyberbullying?",
        options: [
            "Porque ela teme ficar sem o seu precioso computador.",
            "Porque ela acha que não é um grande problema.",
            "Porque ela não gosta de adultos.",
            "Porque ela não tem amigos."
        ],
        correct_answer: "a"
    },
    {
        question: "Por que o escritor sofreu bullying quando era criança?",
        options: [
            "Porque ele era muito popular.",
            "Porque ele era muito rico.",
            "Porque ele era diferente das outras crianças.",
            "Não existe motivo para sofrer bullying."
         
        ],
        correct_answer: "d"
    },
    {
        question: "O bullying é considerado uma brincadeira?",
        options: [
             "Sim, sempre.",
            "Depende do contexto.",
            "Às vezes.",
            "Não.",
        ],
        correct_answer: "d"
    },
    {
        question: "Qual é a definição de bullying?",
        options: [
            "Bullying é um comportamento agressivo e repetitivo que tem o objetivo de intimidar, ameaçar ou humilhar alguém.",
            "Bullying é uma forma de entretenimento.",
            "Bullying é uma prática aceitável na sociedade.",
            "Bullying é uma expressão de amor."
        ],
        correct_answer: "a"
    },
    {
        question: "Como identificar se alguém está sofrendo bullying?",
        options: [
            "Não é possível identificar se alguém está sofrendo bullying.",
            "Apenas perguntando diretamente à pessoa.",
            "Observando se a pessoa está sempre rodeada de amigos.",
            "Alguns sinais de que alguém está sofrendo bullying incluem mudanças de comportamento, isolamento, evitação de certos lugares ou pessoas, entre outros.",
         
        ],
        correct_answer: "d"
    },
    {
        question: "Como ajudar alguém que está sofrendo bullying?",
        options: [
           "Ignorar a situação e esperar que ela se resolva sozinha.",
           "É importante ouvir a pessoa, oferecer apoio e encorajá-la a procurar ajuda de um adulto de sua confiança, como um professor ou os pais.",       
            "Participar do bullying para se sentir incluído.",
            "Rir da vítima para evitar ser alvo."
        ],
        correct_answer: "b"
    },
    // Novas perguntas adicionadas:
    {
        question: "Qual é uma das formas de bullying?",
        options: [      
            "Elogio",
            "Complimento",
            "Apoio",
            "Verbal",
        ],
        correct_answer: "d"
    },
    {
        question: "O que significa cyberbullying?",
        options: [
             "Bullying realizado na rua.",
            "Bullying realizado na escola.",
            "Bullying realizado através de meios eletrônicos, como a internet e o celular.",          
            "Bullying realizado por professores."
        ],
        correct_answer: "c"
    },
    {
        question: "Por que é importante prevenir o bullying?",
        options: [
            "Porque é uma forma de entretenimento.",
            "Porque é uma prática aceitável na sociedade.",
            "Porque demonstra amor e preocupação.",
            "Porque pode causar sérios danos emocionais e psicológicos às vítimas."
        ],
        correct_answer: "d"
    },
    {
        question: "Como você acha que podemos criar um ambiente escolar mais seguro e livre de bullying?",
        options: [
            "Promovendo a inclusão e o respeito mútuo entre os alunos.",
            "Ignorando os casos de bullying e esperando que desapareçam por si só.",
            "Aumentando a competição entre os alunos.",
            "Punindo severamente os culpados do bullying."
        ],
        correct_answer: "a"
    },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;

// Função para exibir a próxima pergunta
function showNextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionDiv.innerHTML = ''; // Limpa o conteúdo anterior

    // Exibe a pergunta atual
    const questionElem = document.createElement('p');
    questionElem.textContent = (currentQuestionIndex + 1) + '. ' + currentQuestion.question;
    questionDiv.appendChild(questionElem);

    // Exibe as opções da pergunta atual
    const optionsList = document.createElement('ul');
    optionsList.classList.add('options');

    currentQuestion.options.forEach((option, optionIndex) => {
        const optionItem = document.createElement('li');
        const optionInput = document.createElement('input');
        optionInput.setAttribute('type', 'radio');
        optionInput.setAttribute('name', 'question');
        optionInput.setAttribute('value', String.fromCharCode(97 + optionIndex)); // A, B, C, D...
        const optionText = document.createTextNode(option);

        optionItem.appendChild(optionInput);
        optionItem.appendChild(optionText);
        optionsList.appendChild(optionItem);
    });

    questionDiv.appendChild(optionsList);

    // Adiciona um evento de clique para verificar a resposta selecionada
    submitButton.addEventListener('click', verifyAnswer);
}

function verifyAnswer() {
    const selectedOption = document.querySelector('input[name="question"]:checked');

    if (selectedOption) {
        const selectedAnswer = selectedOption.value;
        const currentQuestion = questions[currentQuestionIndex];
        const correctAnswerIndex = currentQuestion.correct_answer.charCodeAt(0) - 97;

        if (selectedAnswer === String.fromCharCode(97 + correctAnswerIndex)) {
            correctAnswers++; // Incrementa o contador de respostas corretas
        } else {
            if (currentDifficulty === 'hard') {
                   alert(`Resposta incorreta! A resposta correta é: ${currentQuestion.options[correctAnswerIndex]}`);
      
                resetGame();
                return;
            } else {
                alert(`Resposta incorreta! A resposta correta é: ${currentQuestion.options[correctAnswerIndex]}`);
            }
        }

        currentQuestionIndex++; // Move para a próxima pergunta

        if (currentQuestionIndex < questions.length) {
            showNextQuestion(); // Exibe a próxima pergunta
        } else {
            // Calcula o resultado do quiz e exibe
            const percentage = (correctAnswers / questions.length) * 100;
            alert(`Você acertou ${correctAnswers} de ${questions.length} perguntas. Sua porcentagem de acerto é: ${percentage.toFixed(2)}%`);

            // Salva o nome do jogador e a pontuação em JSON
            addPlayer({ name: playerName, score: correctAnswers, percentage: percentage });
        }
    } else {
        alert('Por favor, selecione uma opção.');
    }
}

function showCorrectAnswers() {
    questions.forEach((question, index) => {
        alert(`Pergunta ${index + 1}: ${question.question}\nResposta correta: ${question.options[question.correct_answer.charCodeAt(0) - 97]}`);
    });
}

// Função para salvar o nome do jogador e a pontuação no armazenamento local como JSON
function saveToLocalStorage() {
    localStorage.setItem('playerData', JSON.stringify(playerData));
}

// Função para adicionar os dados do jogador ao armazenamento local
function addPlayer(data) {
    playerData.push(data);
    saveToLocalStorage(); // Salva os dados após adicionar um novo jogador
}

function startGame() {
    playerNameInput.addEventListener('input', function(event) {
        playerName = event.target.value;
    });

    document.getElementById('normalBtn').addEventListener('click', function() {
        currentDifficulty = 'normal';
        questionDiv.removeChild(difficultySelector);
        showNextQuestion();
    });

    document.getElementById('hardBtn').addEventListener('click', function() {
        currentDifficulty = 'hard';
        questionDiv.removeChild(difficultySelector);
        showNextQuestion();
    });
}

// Função para reiniciar o jogo
function resetGame() {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    showNextQuestion(); // Inicia o jogo novamente
}

startGame(); // Inicia o jogo quando a página é carregada
