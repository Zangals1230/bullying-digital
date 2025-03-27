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
        question: "O que é considerado violência escolar?",
        options: [
            "Apenas agressão física entre alunos.",
            "Qualquer comportamento que cause dano físico, psicológico ou emocional dentro do ambiente escolar.",
            "Somente brigas entre professores e alunos.",
            "Somente quando há uso de armas."
        ],
        correct_answer: "b"
    },
    {
        question: "Quais são os principais tipos de violência nas escolas?",
        options: [
            "Apenas física e verbal.",
            "Física, verbal, psicológica e cyberbullying.",
            "Somente agressão física e vandalismo.",
            "Apenas quando há violência entre alunos e professores."
        ],
        correct_answer: "b"
    },
    {
        question: "Qual das opções abaixo é um exemplo de violência psicológica na escola?",
        options: [
            "Empurrar um colega no corredor.",
            "Exclusão social e humilhação repetitiva.",
            "Fazer uma denúncia sobre um caso de agressão.",
            "Ajudar um colega a estudar para uma prova."
        ],
        correct_answer: "b"
    },
    {
        question: "Quais são as consequências da violência escolar para as vítimas?",
        options: [
            "Melhoria na autoestima e desempenho escolar.",
            "Apenas lesões físicas leves.",
            "Ansiedade, depressão, dificuldades de aprendizado e até evasão escolar.",
            "Nenhuma consequência significativa."
        ],
        correct_answer: "c"
    },
    {
        question: "O que pode levar um estudante a praticar violência na escola?",
        options: [
            "Fatores como problemas familiares, exposição à violência e falta de suporte emocional.",
            "Apenas influência dos colegas.",
            "Somente problemas de disciplina na escola.",
            "Apenas o desejo de se destacar entre os amigos."
        ],
        correct_answer: "a"
    },
    {
        question: "Como a escola pode ajudar a prevenir a violência entre os alunos?",
        options: [
            "Punindo severamente todos os alunos envolvidos.",
            "Ignorando os casos para evitar conflitos maiores.",
            "Criando campanhas de conscientização, promovendo diálogo e reforçando o respeito mútuo.",
            "Separando os alunos agressivos do restante da turma sem oferecer apoio."
        ],
        correct_answer: "c"
    },
    {
        question: "O que fazer ao presenciar um caso de violência na escola?",
        options: [
            "Filmar e postar nas redes sociais.",
            "Ajudar o agressor para não se tornar vítima.",
            "Informar um professor ou responsável para que medidas sejam tomadas.",
            "Aplaudir a briga para incentivar a competição."
        ],
        correct_answer: "c"
    },
    {
        question: "Qual dessas opções é um exemplo de violência verbal?",
        options: [
            "Fazer um elogio a um colega.",
            "Xingar, gritar e humilhar um estudante na frente dos outros.",
            "Empurrar um aluno no corredor.",
            "Evitar conversar com um colega por não gostar dele."
        ],
        correct_answer: "b"
    },
    {
        question: "Como os professores podem contribuir para a redução da violência escolar?",
        options: [
            "Aplicando punições severas a todos os alunos.",
            "Ignorando os casos de agressão.",
            "Criando um ambiente seguro e incentivando o diálogo e respeito entre os alunos.",
            "Evitando qualquer tipo de intervenção nos conflitos escolares."
        ],
        correct_answer: "c"
    },
    {
        question: "Qual é o impacto da violência escolar no desempenho dos alunos?",
        options: [
            "Apenas dificuldades em algumas matérias.",
            "Melhora na capacidade de defesa pessoal.",
            "Prejuízos na concentração, aprendizado e autoestima.",
            "Nenhum impacto significativo, pois faz parte da rotina escolar."
        ],
        correct_answer: "c"
    },
    {
        question: "Por que o cyberbullying também é considerado um tipo de violência escolar?",
        options: [
            "Porque acontece exclusivamente dentro da escola.",
            "Porque pode afetar emocionalmente os alunos e impactar sua vida escolar.",
            "Porque envolve apenas brincadeiras entre amigos.",
            "Porque não tem impacto na vida das vítimas."
        ],
        correct_answer: "b"
    },
    {
        question: "Como os pais podem ajudar a prevenir a violência escolar?",
        options: [
            "Conversando com os filhos, ensinando respeito e acompanhando sua vida escolar.",
            "Ignorando os relatos dos filhos para evitar problemas.",
            "Permitindo que os filhos resolvam tudo sozinhos.",
            "Incentivando os filhos a se defenderem com violência."
        ],
        correct_answer: "a"
    },
    {
        question: "Qual é o papel dos colegas na prevenção da violência escolar?",
        options: [
            "Apoiar e incentivar os agressores.",
            "Ser indiferente e não se envolver.",
            "Ajudar a vítima e denunciar casos de violência para os responsáveis.",
            "Filmar e divulgar agressões para conscientizar os outros."
        ],
        correct_answer: "c"
    },
    {
        question: "O que pode ser feito para ajudar um aluno vítima de violência escolar?",
        options: [
            "Ignorar a situação para não se envolver.",
            "Conversar com a vítima, oferecer apoio e denunciar o caso para um adulto responsável.",
            "Evitar falar com a vítima para não se tornar alvo.",
            "Encobrir os agressores para evitar confusão."
        ],
        correct_answer: "b"
    },
    {
        question: "O que pode ser considerado uma atitude violenta dentro da escola?",
        options: [
            "Brincadeiras inofensivas entre amigos.",
            "Apoiar um colega em momentos difíceis.",
            "Agressões físicas, insultos, ameaças e exclusão social.",
            "Resolver desentendimentos através do diálogo."
        ],
        correct_answer: "c"
    }
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
