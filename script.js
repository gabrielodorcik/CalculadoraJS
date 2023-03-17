//indentificando os elementos do html e solicitando para pegar certos elementos
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');//especificando que quer um id específico

//declarando variaveis de apoio
let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;

//declarando o método calcular, verifica se já tem uma operação pendente para fazer a conta
const calcular = () => {
    
    if (operacaoPendente()) {
        const numeroAtual = parseFloat(display.textContent.replace('.','').replace(',', '.'));
        novoNumero = true;
        /*if (operador == '+' ){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == '-'){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == '*'){
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == '/'){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }*/
        const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);//usando template string
        atualizarDisplay(resultado);
        //função eval para deixar o código menor
    }

};

//criando o método que atualiza o display
const atualizarDisplay = (texto) => {

    if (novoNumero) {
        display.textContent = texto.toLocaleString('BR');// função que traz o decimal usado no Brasil
        novoNumero = false;

    } else {
        display.textContent += texto.toLocaleString('BR');
    }
    
    document.querySelector('#igual').focus();

};
//método que pega o elemento que for clicado
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);

//criar um evento para cada um dos numeros
numeros.forEach((numero) => numero.addEventListener('click', inserirNumero));

//método de selecionar o operador, para fazer a conta
const selecionarOperador = (evento) => {

    if (!novoNumero) {
        calcular();
        novoNumero = true;
        operador = evento.target.textContent;
        numeroAnterior = parseFloat(display.textContent.replace('.','').replace(',', '.'));//replace atualiza
    
    }

};

//setando os operadores sempre que clicar
operadores.forEach((operador) => operador.addEventListener('click', selecionarOperador));

//método para ativar o igual
const ativarIgual = () => {

    calcular();
    operador = undefined;
    //não vai ter uma conta pendente

};

//chamando diretamente o evento de click
document.getElementById('igual').addEventListener('click', ativarIgual);

//função de limpar displau
const limparDisplay = () => (display.textContent = '');

//chamando diretamente o botão de limpar o display
document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//função de limpar calculo, zerando a calculadroa
const limparCalculo = () => {

    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;

};

//chamando diretamente o limpar calculo, igualmente ao limpar display
document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//função que remove sempre o ultimo caractere
const removerUltimoNumero = () => (display.textContent = display.textContent.slice(0, -1));//slice, metodo de array, string é uma array de caracteres

//chamando o botão de deletar
document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//método de inverter o sinal
const inverterSinal = () => {

    novoNumero = true;
    atualizarDisplay(display.textContent * -1);

};

//chamar o método
document.getElementById('inverter').addEventListener('click', inverterSinal);

//método para veriivar se existe uma virgula
const existeDecimal = () => display.textContent.indexOf(',') !== -1;

//método para verificar se existe um valor
const existeValor = () => display.textContent.length > 0;

//método de criar a virgula, decimal, para inserir apenas uma 
const inserirDecimal = () => {

    if (!existeDecimal()) {

        if (novoNumero) {
            atualizarDisplay('0,');

        } else {
            atualizarDisplay(',');

        }

    }

};

//chamando o método de decimal
document.getElementById('decimal').addEventListener('click', inserirDecimal);

//método de mapeamento através do teclado do usuário
const mapaTeclado = {

    0           : 'tecla0',
    1           : 'tecla1',
    2           : 'tecla2',
    3           : 'tecla3',
    4           : 'tecla4',
    5           : 'tecla5',
    6           : 'tecla6',
    7           : 'tecla7',
    8           : 'tecla8',
    9           : 'tecla9',
    ':'         : 'operadorDividir',
    '*'         : 'operadorMultiplicar',
    '-'         : 'operadorSubtrair',
    '+'         : 'operadorAdicionar',
    '='         : 'igual',
    Enter       : 'igual',
    Backspace   : 'backspace',
    c           : 'limparDisplay',
    Escape      : 'limparCalculo',
    ','         : 'decimal',

};

//método que mapeia as teclas e os eventos 
const mapearTeclado = (evento) => {

    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;//verificando se a tecla existe
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();

};

//chamando o método
document.addEventListener('keydown', mapearTeclado);