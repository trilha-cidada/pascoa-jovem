document.addEventListener('DOMContentLoaded', () => {
    const scheduleItems = document.querySelectorAll('.dia li');
    const STORAGE_KEY = 'pascoaJovemCompletedItems';

    // Função para carregar estados salvos do localStorage
    const loadCompletedItems = () => {
        const completed = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        scheduleItems.forEach(item => {
            const itemId = item.dataset.id;
            if (completed[itemId]) {
                item.classList.add('completed');
            }
        });
    };

    // Função para salvar estados no localStorage
    const saveCompletedItems = () => {
        const completed = {};
        document.querySelectorAll('.dia li.completed').forEach(item => {
            completed[item.dataset.id] = true;
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    };

    // Adicionar evento de clique para cada item da lista (ou no check-mark)
    scheduleItems.forEach(item => {
        const checkMark = item.querySelector('.check-mark');

        // Permite clicar tanto no texto quanto no check-mark (opcional, pode ser só no check)
        item.addEventListener('click', (event) => {
            // Evita múltiplos toggles se clicar exatamente no check-mark
            // (pois o evento borbulharia do check para o li)
            if (event.target !== checkMark) {
                 item.classList.toggle('completed');
                 saveCompletedItems();
            }
        });

        // Garante que o clique no check-mark funcione
         checkMark.addEventListener('click', () => {
             item.classList.toggle('completed');
             saveCompletedItems();
        });
    });

    // Carregar os itens marcados ao iniciar a página
    loadCompletedItems();

    // Animação de entrada para os dias (alternativa ao CSS puro se precisar de mais controle)
    // O CSS atual com animation-delay já faz isso de forma simples.
    // Se precisar de algo baseado em scroll, usaria Intersection Observer aqui.
    console.log("Cronograma Interativo Carregado!");

});
