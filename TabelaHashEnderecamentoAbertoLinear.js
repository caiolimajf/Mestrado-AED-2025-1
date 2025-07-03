// HASHING
// TAMANHO DA TABELA -> Idealmente não deve ser potência de 2 e não deve ser primo de M(Tamanho da Tabela)

// Encadeamento Aberto / Interior -> Linear

// função hash
function h(numero, tentativa = 0, tamanho) {
    return (numero + tentativa) % tamanho;
}

class TabelaHash {

    constructor(tamanho) {
        this.tamanho = tamanho;
        this.tabela = new Array(tamanho);
    }

    // Inserir Valor
    inserir(valor) {
        let novoPonteiro = new Ponteiro(valor);
        let index = h(valor, 0, this.tamanho);
        if (!this.tabela[index] || this.tabela[index].valor == "REMOVIDO") {
            this.tabela[index] = novoPonteiro;
        } else {
            for (let i = 0; i < this.tamanho; i++) {
                let novaPosicao = h(valor, i, this.tamanho);
                const elemento = this.tabela[novaPosicao];
                if (!elemento || elemento.valor == "REMOVIDO") {
                    if (!this.tabela[novaPosicao]) {
                        this.tabela[novaPosicao] = novoPonteiro;
                        return;
                    }
                    continue;
                }
            }
            throw "TABELA ESTÁ CHEIA";
        }
    }

    // Buscar Valor
    buscar(valor) {
        let index = h(valor, 0, this.tamanho);
        let atual = this.tabela[index];

        if (atual) {
            if (atual.valor == valor) {
                return atual.valor;
            } else {
                // Tratamento de Colisão
                for (let i = 0; i < this.tamanho; i++) {
                    let indice = h(valor, i, this.tamanho);
                    if (this.tabela[indice]?.valor == valor) {
                        console.log(" ENCONTRADO ");
                        return this.tabela[indice].valor;
                    }
                }
                return "NAO ENCONTRADO.";
            }

        } else {
            return "NAO ENCONTRADO.";
        }

    }

    remover(valor) {
        for (let i = 0; i < this.tamanho; i++) {
            let index = h(valor, i, this.tamanho);
            let atual = this.tabela[index];
            if (!atual) return "Não consegui remover";
            if (atual.valor === valor) {
                this.tabela[index].valor = "REMOVIDO";
                return "Removido com sucesso.";
            }
        }
        return "Não consegui remover";
    }

    imprimir() {
        console.log(" ***************************************** ");
        this.tabela.forEach((lista, i) => {
            let linha = `INDICE ${i}: `;
            console.log(linha + lista?.valor);
        })
        console.log(" ***************************************** ");
    }
}

class Ponteiro {
    constructor(valor = null) {
        this.valor = valor;
        this.removido = false;
    }
}

console.log(" *** TABELA HASH - ENCADEAMENTO ABERTO - INTERIOR *** ");
console.log("                   by CAIO A'LIMA ");

const tabela = new TabelaHash(9);


tabela.inserir(10);
tabela.inserir(11);
tabela.inserir(12);
tabela.inserir(13);

tabela.remover(11)

tabela.inserir(20);


console.log(tabela.buscar(20));

tabela.imprimir()