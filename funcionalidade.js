const bloco = document.querySelectorAll('.bloco')
let checarTurno = true

//add nomes
const playerX = 'X'
const playerO = 'O'

const checagem = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6]
]
//formulario
function botaoPlay() {
    let nome1 = document.getElementById('nome1')
    let nome2 = document.getElementById('nome2')
    let guarda1 = String(nome1.value)
    let guarda2 = String(nome2.value)
    let nomes = document.querySelector('.nomes')
    

    const areaContainer= document.querySelector('.container')
    areaContainer.style.display= 'flex'

    if(guarda1 == '' && guarda2 ==''){
        alert('Você não definiu nenhum nome, portanto definimos um nome para ambos jogadores!')
        guarda1 = 'PlayerX'
        guarda2 = 'PlayerO'
        nomes.innerHTML = `<strong>${guarda1}</strong> VS <strong>${guarda2}</strong>`
    }
    else{
       nomes.innerHTML = `${guarda1} VS ${guarda2}` 
    }
    
}

document.addEventListener('click', (evento) => {
    if(evento.target.matches('.bloco')) {
        jogar(evento.target.id, playerX)
        //setTimeout(() => bot(),800)
    }
})

/*function bot()  {
    const pDisponiveis=[]
    for (index in bloco) {
        if(!isNaN(index)) {
            if(
                !bloco[index].classList.contains('X') && 
                !bloco[index].classList.contains('O')) {
                pDisponiveis.push(index)
            }
        }
    }
    const pAleatoria = Math.floor(
        Math.random() * pDisponiveis.length
    )

    jogar(pDisponiveis[pAleatoria], playerO)
}*/

function jogar(id){
    const bloc = document.getElementById(id)
    turno = checarTurno ? playerX : playerO
    bloc.innerHTML = turno
    bloc.classList.add(turno)
    checarGanhador(turno)
}

function checarGanhador(turno) {
    const vencedor = checagem.some((check) => {
        return check.every((index) => {
            return bloco[index].classList.contains(turno)
        })
    })

    if(vencedor) {
        gameOver(turno)

    }
    else if(checarEmpate()){
        gameOver()
    }
    else{
        checarTurno = !checarTurno
    }
}

function checarEmpate(){
    let x= 0
    let o= 0
    for (index in bloco) {
        if(!isNaN(index)) {
            if(bloco[index].classList.contains(playerX)){
                x++
            }
            
    
            if (bloco[index].classList.contains(playerO)){
                o++
            }
        }
    }

    return x + o === 9 ? true : false
}

function gameOver(vencedor = null){
    const fim_de_jogo = document.getElementById('fim_de_jogo') 
    const h2 = document.createElement('h2')
    const h3 = document.createElement('h3')
    //const button = document.createElement('button')
    let msg = null
    fim_de_jogo.style.display = "block"
    fim_de_jogo.appendChild(h2)
    fim_de_jogo.appendChild(h3)

    //fim_de_jogo.appendChild(button)
    //botao.append('Reiniciar')
    if(vencedor) {
        h2.innerHTML = `O <span>${vencedor}</span> é o vencedor do jogo da veia! Parabéns!`
    }
    else{
        h2.innerHTML = 'Dessa vez ninguém saiu perdendo.Tentem novamente! <strong>EMPATOU</strong>!'
    }
    let iniciar = 5
    if(iniciar){
        setInterval(() => {
            h3.innerHTML = `Reiniciando jogo em ${iniciar--}...`
        },1000)
        setTimeout(() => location.reload(), 6000)
        }
        
}
