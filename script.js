var palavras = [
    { palavra: "assédio", dica: "Comportamento agressivo repetido, físico ou verbal, que é intencional e envolve um desequilíbrio de poder." },
    { palavra: "exclusão", dica: "Ato de deixar alguém de fora de um grupo de propósito." },
    { palavra: "intimidação", dica: "Comportamento deliberado que é destinado a causar medo ou desconforto em outra pessoa." },
    { palavra: "cyberbullying", dica: "Bullying que ocorre através de meios digitais, como mensagens de texto, e-mail, mídia social, etc." },
    { palavra: "vitimização", dica: "Ato de fazer alguém se sentir como uma vítima, especialmente através de bullying repetido." },
    { palavra: "humilhação", dica: "Ato de tornar alguém se sentir envergonhado ou inferior através de palavras ou ações." },
    { palavra: "ameaça", dica: "Expressão de intenção de causar dano, medo ou ansiedade em outra pessoa." },
    { palavra: "isolamento", dica: "Ato de separar alguém ou fazê-lo se sentir sozinho e sem apoio social." },
    { palavra: "agressão", dica: "Comportamento hostil ou violento direcionado a outra pessoa." },
    { palavra: "ridicularização", dica: "Ato de fazer piadas cruéis ou zombar de alguém para causar constrangimento." },
    { palavra: "Luciana", dica: "Quem é a vítima do Cyberbullying no livro 'A face oculta'?" }
];

var palavraAtualIndex = 0;
var palavraAtual = palavras[palavraAtualIndex];
var acertos = 0;
var totalPalavras = palavras.length;

function iniciarJogo() {
    mostrarPalavraAtual();
}

function mostrarPalavraAtual() {
    document.getElementById("result").textContent = "";
    document.getElementById("hint").textContent = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("palavraAtual").textContent = palavraAtual.palavra;
    document.getElementById("dica").textContent = "Dica: " + palavraAtual.dica;
}
function checkGuess() {
    var palpite = document.getElementById("guessInput").value.toLowerCase().trim(); // Converte para minúsculas e remove espaços em branco do início e do fim

    if (palpite === palavraAtual.palavra.toLowerCase()) { // Converte a palavra atual para minúsculas para comparar
        acertos++;
        proximaPalavra();
    } else {
        document.getElementById("result").textContent = "Tente novamente!";
    }
}

function proximaPalavra() {
    palavraAtualIndex++;
    if (palavraAtualIndex < totalPalavras) {
        palavraAtual = palavras[palavraAtualIndex];
        mostrarPalavraAtual();
    } else {
        document.getElementById("jogo").style.display = "none";
        document.getElementById("parabens").style.display = "block";
        document.getElementById("acertos").textContent = "Você acertou " + acertos + " de " + totalPalavras + " palavras!";
    }
}

function getHint() {
    document.getElementById("hint").textContent = palavraAtual.dica;
}
