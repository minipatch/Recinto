// tabela do recinto
const tabela = [
    { numero: 1, bioma: "savana", tamanhototal: 10, animal: "MACACO", peso: 1, quantidade: 3, Carnivoro: false, Livre: 0, possibilidadeE: false },
    { numero: 2, bioma: "floresta", tamanhototal: 5, animal: "vazio", peso: 1, quantidade: 0, Carnivoro: false, Livre: 0, possibilidadeE: false },
    { numero: 3, bioma: "savana e rio", tamanhototal: 7, animal: "GAZELA", peso: 2, quantidade: 1, Carnivoro: false, Livre: 0, possibilidadeE: false },
    { numero: 4, bioma: "rio", tamanhototal: 8, animal: "vazio", peso: 1, quantidade: 0, Carnivoro: false, Livre: 0, possibilidadeE: false },
    { numero: 5, bioma: "savana", tamanhototal: 9, animal: "LEAO", peso: 3, quantidade: 1, Carnivoro: true, Livre: 0, possibilidadeE: false },
];

// tabela animal
const tabelaAnimal = [
    { animal: "LEAO", tamanho: 3, bioma: "savana", Carnivoro: true },
    { animal: "LEOPARDO", tamanho: 2, bioma: "savana", Carnivoro: true },
    { animal: "CROCODILO", tamanho: 3, bioma: "rio", Carnivoro: true },
    { animal: "MACACO", tamanho: 1, bioma: "savana ou floresta", Carnivoro: false },
    { animal: "GAZELA", tamanho: 2, bioma: "savana", Carnivoro: false },
    { animal: "HIPOPOTAMO", tamanho: 4, bioma: "savana ou rio", Carnivoro: false }
];

class RecintosZoo {
    analisaRecintos(animal, quantidade) {
        let espacoOcupado, _biome, _carnivoro;

        // Verifica se o animal é válido
        const animalData = tabelaAnimal.find(linha => linha.animal === animal);
        if (!animalData) {
            return { erro: "Animal inválido" };
        }

        const { tamanho, bioma, Carnivoro } = animalData;
        espacoOcupado = tamanho * quantidade;
        _biome = bioma;
        _carnivoro = Carnivoro;

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        tabela.forEach(recinto => {
            // Condição dos biomas
            recinto.objetivo1 = (_biome.includes(recinto.bioma) && recinto.tamanhototal >= espacoOcupado) ||
                (recinto.bioma.includes("savana e rio") && recinto.tamanhototal >= espacoOcupado && (animal === "MACACO" || animal === "HIPOPOTAMO"));

            // Condição de animal carnívoro
            if (!_carnivoro && !recinto.Carnivoro) {
                recinto.objetivo2 = true;
            }
            // condicao para verificar o leão
            else if (animal === "LEAO" && recinto.animal === "LEAO") {
                recinto.objetivo2 = true;
            } else if (_carnivoro && recinto.animal === "vazio") {
                recinto.objetivo2 = true;
            } else {
                recinto.objetivo2 = false;
            }

            // Condição do hipopótamo
            if (animal === "HIPOPOTAMO") {
                recinto.objetivoH = recinto.bioma.includes("savana e rio") || recinto.animal === "vazio";
            } else {
                recinto.objetivoH = true;
            }

            // Possibilidade para o macaco
            if (animal === "MACACO" && quantidade === 1) {
                recinto.objetivoM = recinto.animal !== "vazio";
            } else {
                recinto.objetivoM = true;
            }

            // Calcula espaço livre
            recinto.Livre = recinto.animal === "vazio" || animal === recinto.animal
                ? recinto.tamanhototal - espacoOcupado - (recinto.quantidade * recinto.peso)
                : recinto.tamanhototal - espacoOcupado - 1 - (recinto.quantidade * recinto.peso);

            // Verifica possibilidade de entrada
            recinto.possibilidadeE = quantidade <= recinto.tamanhototal - (recinto.quantidade * recinto.peso);
        });

        // Monta a lista de recintos viáveis
        const recintosViaveis = tabela.filter(recinto =>
            recinto.objetivo1 && recinto.objetivo2 && recinto.objetivoH && recinto.objetivoM && recinto.possibilidadeE
        ).map(recinto => `Recinto ${recinto.numero} (espaço livre: ${recinto.Livre} total: ${recinto.tamanhototal})`);

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
