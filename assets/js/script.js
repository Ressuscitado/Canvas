
//INITIAL DATA
let currentColor = "black";
let canDraw = false;
let mouseX = 0;
let mouseY = 0;
let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');//pra usar o canvas HTML precisamos pegar seu contexto, estamos pegando o 2d

//EVENTS
//adicionando um evento de click para todas as divs com as cores
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
//3 eventos para o mouse, ao clicar, arrastar e soltar
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
document.querySelector('.clear').addEventListener('click', clearScreen);

//FUNCTIONS
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');//pegando o valor de data-color
    currentColor = color;
//tirando a classe active e jogando no item que foi clicado
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

//e.pageX e.pageY sao as coordenadas do mouse na tela, mas considera a página toda, por isso usamos menos o offsetLeft e o offsetTop para considerar apenas o elemento canvas
function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

//A cada pixel ele faz o desenho, não é bem uma linha, é um ponto por pixel
    ctx.beginPath();//função nativa do JS que faz o desenho
    ctx.lineWidth = 5;//largura da linha de 5px
    ctx.lineJoin = 'round';//formato da linha que sera redonda
    ctx.moveTo(mouseX, mouseY);//função nativa q move o mouse para o ponto x e y
    ctx.lineTo(pointX, pointY);//desenha uma linha para o ponto x e y
    ctx.closePath();//fecha o desenho
    ctx.strokeStyle = currentColor;//cor da linha pela variável que criamos
    ctx.stroke();//desenha e finaliza o processo preenchendo ela

//Pega a posição do mouse anterior e continua a cada movimento a partir dela
    mouseX = pointX;
    mouseY = pointY;    
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, screen.width, screen.height);
}
/*Os números dentro da função setTransform(1, 0, 0, 1, 0, 0) representam a matriz de transformação usada para manipular o contexto do canvas. Essa matriz é usada para aplicar transformações como escalas, rotações, translações, e cisalhamentos (shear) aos desenhos no canvas.

A matriz de transformação é composta por seis valores, que são organizados da seguinte forma:

[a, c, e]
[b, d, f]
[0, 0, 1]
No código ctx.setTransform(1, 0, 0, 1, 0, 0);, os números são mapeados diretamente para essa matriz:

a = 1: Define a escala horizontal (alongamento ou compressão) no eixo X. O valor 1 significa que não há transformação (ou seja, escala padrão).

b = 0: Define a inclinação (shear) no eixo Y. O valor 0 significa que não há cisalhamento na vertical.

c = 0: Define a inclinação (shear) no eixo X. O valor 0 significa que não há cisalhamento na horizontal.

d = 1: Define a escala vertical (alongamento ou compressão) no eixo Y. O valor 1 significa que não há transformação (ou seja, escala padrão).

e = 0: Define a translação (deslocamento) no eixo X. O valor 0 significa que não há deslocamento horizontal.

f = 0: Define a translação (deslocamento) no eixo Y. O valor 0 significa que não há deslocamento vertical.

Portanto, a chamada ctx.setTransform(1, 0, 0, 1, 0, 0); redefine o contexto gráfico do canvas para sua configuração inicial, garantindo que qualquer desenho subsequente ocorra sem transformações aplicadas

ctx.clearRect(0, 0, screen.width, screen.height);: Esta linha é a que realmente faz a limpeza. Ela define um retângulo que cobre toda a área do canvas (do canto superior esquerdo (0, 0) até a largura e altura totais do canvas). A função clearRect() apaga todo o conteúdo dentro desse retângulo, limpando o canvas.*/