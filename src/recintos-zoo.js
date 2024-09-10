const tabela = [
    { numero: 1, bioma: "savana", tamanhototal: 10, animal: "MACACO",peso: 1,quantidade: 3,Carnivoro: false,   objetivo1: false,  objetivo2: false, objetivoH: false,objetivoM: false,Livre: 0,possibilidadeE: false},
    { numero: 2, bioma: "floresta", tamanhototal: 5, animal: "vazio",peso: 1,quantidade: 0,Carnivoro: false,   objetivo1: false, objetivo2: false, objetivoH: false, objetivoM: false,Livre: 0,possibilidadeE: false},
    { numero: 3, bioma: "savana e rio", tamanhototal: 7, animal: "GAZELA",peso: 2,quantidade:1,Carnivoro: false,   objivo1: false, objetivo2: false, objetivoH: false,objetivoM: false,Livre: 0,possibilidadeE: false},
    { numero: 4, bioma: "rio", tamanhototal: 8, animal: "vazio",peso: 1,quantidade:0,Carnivoro: false,   objetivo1: false,  objetivo2: false, objetivoH: false,objetivoM: false,Livre: 0,possibilidadeE: false},
    { numero: 5, bioma: "savana", tamanhototal: 9, animal: "LEAO",peso:3,quantidade:1,Carnivoro: true,  objetivo1: false, objetivo2:false, objetivoH: false,objetivoM: false,Livre: 0,possibilidadeE: false},
];

const tabelaAnimal = [
    { animal: "LEAO", tamanho: 3, bioma: "savana",Carnivoro: true},
    { animal: "LEOPARDO", tamanho: 2, bioma: "savana",Carnivoro: true},
    { animal: "CROCODILO", tamanho: 3, bioma: "rio",Carnivoro: true},
    { animal: "MACACO", tamanho: 1, bioma: "savana ou floresta",Carnivoro: false},
    { animal: "GAZELA", tamanho: 2, bioma: "savana",Carnivoro: false},
    { animal: "HIPOPOTAMO", tamanho: 4, bioma: "savana ou rio",Carnivoro: false}
];




class RecintosZoo {
    analisaRecintos(animal, quantidade) {

        let _peso,_biome,_carnivoro;

        let objetivo0 = false;

        for(let i=0;i<tabelaAnimal.length;i++){
            let linha = tabelaAnimal[i];
            if(linha.animal == animal){

                _peso = linha.tamanho;
                _biome = linha.bioma;
                _carnivoro = linha.Carnivoro;

                objetivo0 = true;
                break;
            }
        }

        if(objetivo0 == false){
            return {erro:"Animal inválido"};
        }

        let espacoOcupado = (_peso * quantidade);


        if(isNaN(quantidade) == false && quantidade <= 0){
            return{erro: "Quantidade inválida"};
        }

        
        // condicao dos biomas
        // observação para possivel erro na variavel onde tabela[i] recebe um true o false        
        for(let i=0;i<tabela.length;i++){
            let linha = tabela[i];

            if(_biome.includes(linha.bioma) && linha.tamanhototal >= espacoOcupado){
                // console.log("cheguei aqui");
                tabela[i].objetivo1 = true;
            }

            else if(linha.bioma.includes("savana e rio") && linha.tamanhototal>= espacoOcupado && animal == "MACACO"){
                tabela[i].objetivo1 = true;
                // console.log("cheguei aqui 2");
            }

            else if(linha.bioma.includes("savana e rio") && linha.tamanhototal >= espacoOcupado && animal == "HIPOPOTAMO"){
                tabela[i].objetivo1 = true;
                // console.log("cheguei aqui3");
            }
            else{
                // console.log("cheguei no errado");
                tabela[i].objetivo1 = false;
            }
        }   


        // observação para possivel erro na variavel onde tabela[i] recebe um true o false
        // condicao de animal carnivoro e qual recinto ele pode entrar
        for(let i=0;i<tabela.length;i++){

            let linha = tabela[i];

            if(_carnivoro == false  && linha.Carnivoro == false){
                tabela[i].objetivo2 = true;
            }

            else if(animal == "LEOPARDO" || animal == "LEAO" && linha.animal == "LEAO"){
                tabela[i].objetivo2 = true;
            }

            else if(_carnivoro == true && linha.animal =="vazio"){
                tabela[i].objetivo2 = true;
                // console.log(tabela[i].objetivo2);
            }

            else{
                tabela[i].objetivo2 = false;
            }
        }

        // condicao do hipopotamo

        if(animal == "HIPOPOTAMO"){
            console.log("cheguei aqui")
            for(let i=0;i<tabela.length;i++){
                let linha = tabela[i];


                if(linha.bioma.includes("savana e rio") && linha.animal != "vazio"){
                    tabela[i].objetivoH = true;
                }

                else if(linha.animal == "vazio"){
                    tabela[i].objetivoH = true;
                }

                else{
                    tabela[i].objetivoH = false;
                }
            }
        }
        else{
            console.log("CHEGUEI AQUI SIM");

            for(let i=0;i<tabela.length;i++){
                tabela[i].objetivoH = true;
            }
        }

        // possibilidade do macaco 

        if(animal == "MACACO" && quantidade == 1){
            for(let i=0;i<tabela.length;i++){
                let linha = tabela[i];
                if(linha.animal == "vazio"){
                    tabela[i].objetivoM = false;
                }

                else{
                    tabela[i].objetivoM = true;
                }
            }
        }

        else{
            for(let i=0;i<tabela.length;i++){
                tabela[i].objetivoM = true;
            }
        }

        // verificando se ha outro animal no recinto para adicionar +1

        let espacoLivre;


        for(let i=0;i<tabela.length;i++){
            let linha = tabela[i];

            if(linha.animal =="vazio" || animal == linha.animal){
                espacoLivre = linha.tamanhototal - espacoOcupado - (linha.quantidade * linha.peso);
            }

            else{
                espacoLivre = linha.tamanhototal - (espacoOcupado+1) - (linha.quantidade* linha.peso);
            }
            tabela[i].Livre = espacoLivre;
        }

        for(let i=0;i<tabela.length;i++){
            let linha = tabela[i];
            if(quantidade <= linha.tamanhototal - (linha.quantidade*linha.peso)){
                tabela[i].possibilidadeE = true;
            }

            else{
                tabela[i].possibilidadeE = false;
            }
        }
        
        
        


        let recintosViaveis = []


        for(let i=0;i<tabela.length;i++){
            let linha = tabela[i];
            // console.log("1");
            // console.log(linha.objetivo1);
           
            // console.log("2");
            // console.log(linha.objetivo2);
           
            // console.log("3");
            // console.log(linha.objetivoH);
            
            // console.log("4");
            // console.log(linha.objetivoM);
            
            // console.log("5");
            // console.log(linha.possibilidadeE);



            if(linha.objetivo1 == true && linha.objetivo2 == true && linha.objetivoH == true && linha.objetivoM == true && linha.possibilidadeE == true ){
                let recintoInfo = `Recinto ${linha.numero} (espaço livre: ${linha.Livre} total: ${linha.tamanhototal})`;
                recintosViaveis.push(recintoInfo);
            }
        }

        if(recintosViaveis.length == 0){
            return{erro: "Não há recinto viável"};
        }

        return { recintosViaveis};

    }
}


// const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);


export { RecintosZoo as RecintosZoo };
