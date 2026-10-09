const formGasto = document.getElementById('formGasto');
const descricaoInput = document.getElementById('descricao');
const valorInput = document.getElementById('valor');
const listaGastos = document.getElementById('listaGastos');
const saldoTotal = document.getElementById('saldoTotal');

// Carregar gastos do navegador ao iniciar
let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

function atualizarApp() {
    listaGastos.innerHTML = '';
    let total = 0;

    gastos.forEach((gasto, index) => {
        total += gasto.valor;

        const li = document.createElement('li');
        li.className = 'gasto-item';
        li.innerHTML = `
            <div class="gasto-info">
                <span>${gasto.descricao}</span>
            </div>
            <div>
                <span class="gasto-valor">R$ ${gasto.valor.toFixed(2)}</span>
                <button class="btn-apagar" onclick="removerGasto(${index})">❌</button>
            </div>
        `;
        listaGastos.appendChild(li);
    });

    saldoTotal.innerText = `R$ ${total.toFixed(2)}`;
    localStorage.setItem('gastos', JSON.stringify(gastos));
}

formGasto.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const novoGasto = {
        descricao: descricaoInput.value,
        valor: parseFloat(valorInput.value)
    };

    gastos.push(novoGasto);
    descricaoInput.value = '';
    valorInput.value = '';

    atualizarApp();
});

function removerGasto(index) {
    gastos.splice(index, 1);
    atualizarApp();
}

atualizarApp();