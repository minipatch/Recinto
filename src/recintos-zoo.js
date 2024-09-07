const tabela = [
    { numero: 1, bioma: "savana", tamanhototal: 10, animal: "3 macacos" },
    { numero: 2, bioma: "floresta", tamanhototal: 5, animal: "vazio" },
    { numero: 3, bioma: "savana e rio", tamanhototal: 7, animal: "1 gazela" },
    { numero: 4, bioma: "rio", tamanhototal: 8, animal: "vazio" },
    { numero: 5, bioma: "savana", tamanhototal: 9, animal: "1 leao" }
];

const tabelaAnimal = [
    { animal: "LEAO", tamanho: 3, bioma: "savana" },
    { animal: "LEOPARDO", tamanho: 2, bioma: "savana" },
    { animal: "CROCODILO", tamanho: 3, bioma: "rio" },
    { animal: "MACACO", tamanho: 1, bioma: "savana ou floresta" },
    { animal: "GAZELA", tamanho: 2, bioma: "savana" },
    { animal: "HIPOPOTAMO", tamanho: 4, bioma: "savana ou rio" }
];

class RecintosZoo {

    analisaRecintos(animal, quantidade) {
        const animalInfo = tabelaAnimal.find(item => item.animal.toLowerCase() === animal.toLowerCase());

        if (!animalInfo) {
            return { erro: "Animal inválido" };
        }

        if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const recintosCompativeis = tabela.filter(recinto => {
            const biomaCompativel = animalInfo.bioma.toLowerCase().includes(recinto.bioma.toLowerCase());
            const outrasEspeciesPresentes = recinto.animal !== 'vazio' && !recinto.animal.toLowerCase().includes(animalInfo.animal.toLowerCase());

            return biomaCompativel && (!outrasEspeciesPresentes || this.verificarRegrasEspecies(recinto, animalInfo));
        });

        const resultados = recintosCompativeis.map(recinto => {
            const espacoOcupado = this.calcularEspacoOcupado(recinto);
            const espacoNecessario = this.calcularEspacoNecessario(animalInfo, quantidade, recinto);

            if (recinto.tamanhototal >= espacoOcupado + espacoNecessario) {
                const espacoLivre = recinto.tamanhototal - espacoOcupado - espacoNecessario;
                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhototal})`;
            } else {
                return null;
            }
        }).filter(resultado => resultado !== null);

        if (resultados.length > 0) {
            return { recintosViaveis: resultados };
        } else {
            return { erro: "Não há recinto viável" };
        }
    }

    calcularEspacoNecessario(animalInfo, quantidade, recinto) {
        let espacoNecessario = quantidade * animalInfo.tamanho;
        if (recinto.animal !== 'vazio') {
            espacoNecessario += 1; // Espaço extra para mais de uma espécie
        }
        return espacoNecessario;
    }

    calcularEspacoOcupado(recinto) {
        if (recinto.animal === "vazio") return 0;

        let espacoOcupado = 0;
        const animaisNoRecinto = recinto.animal.split(', ');

        animaisNoRecinto.forEach(animalDesc => {
            const partes = animalDesc.split(' ');
            const quantidade = parseInt(partes[0]);
            const nomeAnimal = partes.slice(1).join(' ');
            const animalInfo = tabelaAnimal.find(item => item.animal.toLowerCase() === nomeAnimal.toLowerCase());
            espacoOcupado += quantidade * (animalInfo ? animalInfo.tamanho : 0);
        });

        return espacoOcupado;
    }

    verificarRegrasEspecies(recinto, novoAnimal) {
        const animaisNoRecinto = recinto.animal.split(', ');

        if (this.ehCarnivoro(novoAnimal.animal)) {
            return animaisNoRecinto.every(animalDesc => {
                const nomeAnimal = animalDesc.split(' ').slice(1).join(' ');
                return nomeAnimal.toLowerCase() === novoAnimal.animal.toLowerCase();
            });
        }

        if (novoAnimal.animal.toLowerCase() === "hipopotamo" && recinto.bioma.toLowerCase() !== "savana e rio") {
            return false;
        }

        const macacosNoRecinto = animaisNoRecinto.some(animalDesc => animalDesc.toLowerCase().includes("macaco"));
        if (macacosNoRecinto && novoAnimal.animal.toLowerCase() === "macaco") {
            return true;
        }
        else if (macacosNoRecinto && novoAnimal.animal.toLowerCase() !== "macaco") {
            return true;
        }

        return true;
    }

    ehCarnivoro(animal) {
        const carnivoros = ["leao", "leopardo", "crocodilo"];
        return carnivoros.includes(animal.toLowerCase());
    }
}

export { RecintosZoo };
