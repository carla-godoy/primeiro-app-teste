document.addEventListener('DOMContentLoaded', () => {
  const vagaForm = document.getElementById('vagaForm');
  const modal = document.getElementById('modal');
  const modalBox = modal.querySelector('.modal-box');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalCloseX = document.getElementById('modalCloseX');

  // Evento ao enviar o formulário
  vagaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value, 10);
    const altura = parseFloat(document.getElementById('altura').value);

    // Validação dos critérios: Altura >= 1.70 E Idade >= 18
    const eApto = altura >= 1.70 && idade >= 18;

    exibirModal(eApto, nome);
  });

  // Função para configurar e abrir o Popup
  function exibirModal(apto, nome) {
    // Limpa estados anteriores
    modalBox.classList.remove('sucesso', 'erro');

    if (apto) {
      modalBox.classList.add('sucesso');
      modalIcon.textContent = '✓';
      modalTitle.textContent = 'Elegível!';
      modalMessage.textContent = `Parabéns ${nome}! Você pode prosseguir no processo para a vaga!`;
    } else {
      modalBox.classList.add('erro');
      modalIcon.textContent = '✕';
      modalTitle.textContent = 'Não Elegível';
      modalMessage.textContent = 'Infelizmente você não é apto à vaga.';
    }

    // Exibe o popup removendo a classe ocultadora
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }

  // Função para fechar o Popup
  function fecharModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  // Eventos para fechar o popup ao clicar no botão OK ou no X
  modalOkBtn.addEventListener('click', fecharModal);
  modalCloseX.addEventListener('click', fecharModal);

  // Fechar o popup ao clicar fora da caixa central
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      fecharModal();
    }
  });

  // Fechar o popup ao pressionar a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      fecharModal();
    }
  });
});