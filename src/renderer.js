document.addEventListener('DOMContentLoaded', () => {
  const setupView = document.getElementById('setup-view');
  const tokenInput = document.getElementById('token-input');
  const btnSaveToken = document.getElementById('btn-save-token');
  const setupError = document.getElementById('setup-error');

  const mainView = document.getElementById('main-view');
  const btnBuscar = document.getElementById('btn-buscar');
  const btnDeleteToken = document.getElementById('btn-delete-token');
  const tableBody = document.getElementById('table-body');
  const messageArea = document.getElementById('message-area');
  const statusFilter = document.getElementById('status-filter');

  const paginationControls = document.getElementById('pagination-controls');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const pageInfo = document.getElementById('page-info');

  let currentPage = 1;
  let totalPages = 1;
  const limit = 20;

  const fetchAndDisplaySubscriptions = async () => {
      tableBody.innerHTML = '';
      messageArea.textContent = 'Buscando datos en la API de Mercado Pago...';
      messageArea.classList.remove('hidden', 'error');
      paginationControls.classList.add('hidden');

      const offset = (currentPage - 1) * limit;
      const status = statusFilter.value;

      const resultado = await window.electronAPI.buscarSuscripciones({ status, limit, offset });

      messageArea.classList.add('hidden');

      if (resultado.error) {
          messageArea.textContent = `Error: ${resultado.message}`;
          messageArea.classList.add('error');
          messageArea.classList.remove('hidden');
          return;
      }

      if (!resultado.results || resultado.results.length === 0) {
          messageArea.textContent = 'No se encontraron suscripciones con los filtros aplicados.';
          messageArea.classList.remove('hidden');
          return;
      }

      paginationControls.classList.remove('hidden');
      const totalResults = resultado.paging.total;
      totalPages = Math.ceil(totalResults / limit);
      pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
      btnPrev.disabled = currentPage === 1;
      btnNext.disabled = currentPage === totalPages;

      resultado.results.forEach(sub => {
          const row = tableBody.insertRow();
          row.insertCell().textContent = sub.reason || 'N/A';
          row.insertCell().textContent = sub.payer_email || 'No disponible';
          const amount = sub.auto_recurring?.transaction_amount || 0;
          const currency = sub.auto_recurring?.currency_id || '';
          row.insertCell().textContent = `${amount.toFixed(2)} ${currency}`;
          const statusCell = row.insertCell();
          statusCell.textContent = sub.status;
          statusCell.className = `status status-${sub.status}`;
          const nextPaymentDate = sub.next_payment_date ? new Date(sub.next_payment_date).toLocaleDateString() : 'Finalizado';
          row.insertCell().textContent = nextPaymentDate;
      });
  };

  const mostrarVistaPrincipal = (mostrar) => {
      if (mostrar) {
          mainView.classList.remove('hidden');
          setupView.classList.add('hidden');
          fetchAndDisplaySubscriptions();
      } else {
          mainView.classList.add('hidden');
          setupView.classList.remove('hidden');
          tokenInput.value = '';
          tableBody.innerHTML = '';
          messageArea.classList.add('hidden');
          paginationControls.classList.add('hidden');
      }
  };

  const inicializarApp = async () => {
      const tokenExistente = await window.electronAPI.obtenerToken();
      if (tokenExistente) {
          mostrarVistaPrincipal(true);
      } else {
          mostrarVistaPrincipal(false);
      }
  };

  btnSaveToken.addEventListener('click', async () => {
      const token = tokenInput.value;
      if (!token) {
          setupError.textContent = 'El token no puede estar vacío.';
          setupError.classList.remove('hidden');
          return;
      }
      const resultado = await window.electronAPI.guardarToken(token);
      if (resultado.success) {
          mostrarVistaPrincipal(true);
      } else {
          setupError.textContent = 'No se pudo guardar el token.';
          setupError.classList.remove('hidden');
      }
  });

  btnDeleteToken.addEventListener('click', async () => {
      await window.electronAPI.borrarToken();
      mostrarVistaPrincipal(false);
  });

  btnBuscar.addEventListener('click', () => {
      currentPage = 1;
      fetchAndDisplaySubscriptions();
  });

  btnPrev.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          fetchAndDisplaySubscriptions();
      }
  });



  btnNext.addEventListener('click', () => {
      if (currentPage < totalPages) {
          currentPage++;
          fetchAndDisplaySubscriptions();
      }
  });

  inicializarApp();
});