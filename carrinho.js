        // Função para atualizar a quantidade total e o valor total
        function atualizarResultados() {
            let containers = document.querySelectorAll('.produto-container');
            let quantidadeTotal = 0;
            let valorTotal = 0;
        
            containers.forEach(container => {
                let input = container.querySelector('.produto');
                let addButton = container.querySelector('.add-button');
                let controls = container.querySelector('.controls');
                let quantidade = parseInt(input.value) || 0;
                let valor = parseFloat(input.dataset.valor);
        
                // Mostrar ou esconder o botão "Adicionar" com base no valor do input
                if (quantidade === 0) {
                    input.style.display = 'none';
                    addButton.style.display = 'inline-block';
                    controls.classList.remove('visible');
                } else {
                    input.style.display = 'inline-block';
                    addButton.style.display = 'none';
                    controls.classList.add('visible');
                }

                // Atualizar a quantidade total e o valor total
                if (quantidade > 0) {
                    quantidadeTotal += quantidade;
                    valorTotal += quantidade * valor;
                }
            });
        
            // Atualizar o display dos totais na página
            document.getElementById("somaTotal").textContent = quantidadeTotal;
            document.getElementById("valorTotal").textContent = valorTotal.toFixed(2).replace('.', ',');
        }
        
        // Adiciona eventos de input para atualizar resultados ao modificar o valor do input
        document.querySelectorAll('.produto').forEach(input => {
            input.addEventListener('input', atualizarResultados);
        });

        // Adiciona eventos de clique para os botões de "Mais"
        document.querySelectorAll('.plus').forEach(button => {
            button.addEventListener('click', function() {
                let container = this.closest('.produto-container');
                let input = container.querySelector('.produto');
                input.value = parseInt(input.value) + 1;
                input.dispatchEvent(new Event('input'));
            });
        });

        // Adiciona eventos de clique para os botões de "Menos"
        document.querySelectorAll('.minus').forEach(button => {
            button.addEventListener('click', function() {
                let container = this.closest('.produto-container');
                let input = container.querySelector('.produto');
                if (parseInt(input.value) > 0) {
                    input.value = parseInt(input.value) - 1;
                    input.dispatchEvent(new Event('input'));
                }
            });
        });

        // Adiciona eventos de clique para o botão "Adicionar"
        document.querySelectorAll('.add-button').forEach(button => {
            button.addEventListener('click', function() {
                let input = this.previousElementSibling;
                input.value = 1; // Define um valor inicial de 1 quando o botão é clicado
                input.style.display = 'inline-block';
                this.style.display = 'none';
                let controls = this.nextElementSibling;
                controls.classList.add('visible');
                input.dispatchEvent(new Event('input'));
            });
        });

        // Inicializa a visibilidade dos botões ao carregar a página
        atualizarResultados();