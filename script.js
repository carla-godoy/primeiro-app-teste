document.addEventListener('DOMContentLoaded', () => {
  const vagaForm = document.getElementById('vagaForm');
  const modal = document.getElementById('modal');
  const modalBox = modal.querySelector('.modal-box');
  const modalIcon = document.getElementById('modalIcon');
  const modalTitle = document.getElementById('modalTitle');
  const modalMessage = document.getElementById('modalMessage');
  const modalOkBtn = document.getElementById('modalOkBtn');
  const modalCloseX = document.getElementById('modalCloseX');
  const bloomOverlay = document.getElementById('bloomOverlay');
  const sunflowerCursor = document.getElementById('sunflowerCursor');

  // 1. SEGUIDOR DE MOUSE (GIRASSOL QUE SEGUE O PONTEIRO)
  document.addEventListener('mousemove', (e) => {
    sunflowerCursor.style.left = `${e.clientX}px`;
    sunflowerCursor.style.top = `${e.clientY}px`;
  });

  // 2. SUBMISSÃO DO FORMULÁRIO E ANIMAÇÃO DE FLORESCIMENTO
  vagaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const idade = parseInt(document.getElementById('idade').value, 10);
    const altura = parseFloat(document.getElementById('altura').value);

    // Critério: Altura >= 1.70 e Idade >= 18
    const eApto = altura >= 1.70 && idade >= 18;

    // Exibe o overlay do girassol florescendo
    bloomOverlay.classList.remove('hidden');

    // Aguarda a animação do girassol florescer (1.2 segundos) para exibir o Popup
    setTimeout(() => {
      bloomOverlay.classList.add('hidden');
      exibirModal(eApto, nome);
    }, 1200);
  });

  // 3. EXIBIÇÃO DO POPUP / MODAL
  function exibirModal(apto, nome) {
    modalBox.classList.remove('sucesso', 'erro');

    if (apto) {
      modalBox.classList.add('sucesso');
      modalIcon.textContent = '🌻';
      modalTitle.textContent = 'Aprovado(a)!';
      modalMessage.textContent = 'Parabéns! Você pode prosseguir no processo para a vaga!';
    } else {
      modalBox.classList.add('erro');
      modalIcon.textContent = '🥀';
      modalTitle.textContent = 'Não Elegível';
      modalMessage.textContent = 'Infelizmente você não é apto à vaga';
    }

    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }

  // 4. FECHAR MODAL
  function fecharModal() {
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
  }

  modalOkBtn.addEventListener('click', fecharModal);
  modalCloseX.addEventListener('click', fecharModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      fecharModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      fecharModal();
    }
  });
});