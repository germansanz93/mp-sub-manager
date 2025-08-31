document.addEventListener('DOMContentLoaded', () => {
  const setupView = document.getElementById('setup-view');
  const tokenInput = document.getElementById('token-input');
  const btnSaveToken = document.getElementById('btn-save-token');
  const setupError = document.getElementById('setup-error');

  const mainView = document.getElementById('main-view');
  const btnBuscar = document.getElementById('btn-buscar');
  const btnDeleteToken = document.getElementById('btn-delete-token');
  const tableBody = document.getElementById('table-body');
  const tableContainer = document.getElementById('table-container');
  const messageArea = document.getElementById('message-area');
  const statusFilter = document.getElementById('status-filter');
  const emailSearchInput = document.getElementById('email-search-input');
  const amountSearchInput = document.getElementById('amount-search-input');

  const paginationControls = document.querySelectorAll('.pagination-controls');
  const prevButtons = document.querySelectorAll('.btn-prev');
  const nextButtons = document.querySelectorAll('.btn-next');
  const pageInfoSpans = document.querySelectorAll('.page-info');

  let currentPage = 1;
  let totalPages = 1;
  const limit = 20;

  // Función para crear el formulario de actualización
  const createUpdateForm = (subscriptionId, reason, currentAmount) => {
    console.log('Creando formulario para:', subscriptionId, reason, currentAmount); // Debug
    
    const formDiv = document.createElement('div');
    formDiv.className = 'update-form';
    formDiv.style.display = 'block'; // Forzar que sea visible
    formDiv.style.border = '2px solid red'; // Debug visual
    
    formDiv.innerHTML = `
      <div class="update-form-row">
        <label><strong>Actualizar monto para: ${reason}</strong></label>
        <input type="number" 
               class="new-amount-input" 
               placeholder="Nuevo monto" 
               step="0.01" 
               min="0" 
               value="${currentAmount}">
        <div class="update-form-buttons">
          <button class="btn-save-update button-small">Guardar</button>
          <button class="btn-cancel-update button-secondary button-small">Cancelar</button>
        </div>
      </div>
      <div class="update-result" style="display: none;"></div>
    `;

    // Event listeners para el formulario
    const saveBtn = formDiv.querySelector('.btn-save-update');
    const cancelBtn = formDiv.querySelector('.btn-cancel-update');
    const amountInput = formDiv.querySelector('.new-amount-input');
    const resultDiv = formDiv.querySelector('.update-result');

    saveBtn.addEventListener('click', () => {
      const newAmount = parseFloat(amountInput.value);
      
      if (!newAmount || newAmount <= 0) {
        showUpdateResult(resultDiv, 'Por favor, ingresa un monto válido mayor a 0.', false);
        return;
      }

      if (newAmount === currentAmount) {
        showUpdateResult(resultDiv, 'El nuevo monto debe ser diferente al actual.', false);
        return;
      }

      // Mostrar el resultado (por ahora solo simulación)
      showUpdateResult(resultDiv, `Monto actualizado: ${currentAmount} → ${newAmount.toFixed(2)}`, true);
      
      // Ocultar el formulario después de 2 segundos
      setTimeout(() => {
        formDiv.remove();
      }, 2000);
    });

    cancelBtn.addEventListener('click', () => {
      formDiv.remove();
    });

    return formDiv;
  };

  // Función para mostrar resultados de actualización
  const showUpdateResult = (resultElement, message, isSuccess) => {
    resultElement.textContent = message;
    resultElement.style.display = 'block';
    
    if (isSuccess) {
      resultElement.className = 'update-result success';
    } else {
      resultElement.className = 'update-result error';
    }
  };

  const fetchAndDisplaySubscriptions = async () => {
      tableBody.innerHTML = '';
      messageArea.textContent = 'Buscando datos en la API de Mercado Pago...';
      messageArea.classList.remove('hidden', 'error');
      paginationControls.forEach(c => c.classList.add('hidden'));

      const offset = (currentPage - 1) * limit;
      const status = statusFilter.value;
      const email = emailSearchInput.value.trim();
      const amount = amountSearchInput.value.trim();

      const resultado = await window.electronAPI.buscarSuscripciones({ status, limit, offset, email, amount });

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

      paginationControls.forEach(c => c.classList.remove('hidden'));
      const totalResults = resultado.paging.total;
      totalPages = Math.ceil(totalResults / limit);

      pageInfoSpans.forEach(span => span.textContent = `Página ${currentPage} de ${totalPages}`);
      prevButtons.forEach(btn => btn.disabled = currentPage === 1);
      nextButtons.forEach(btn => btn.disabled = currentPage === totalPages);

      resultado.results.forEach(sub => {
          const row = tableBody.insertRow();
          row.insertCell().textContent = sub.reason || 'N/A';
          row.insertCell().textContent = sub.payer_first_name || 'No disponible';
          row.insertCell().textContent = sub.payer_last_name || 'No disponible';
          const subAmount = sub.auto_recurring?.transaction_amount || 0;
          const currency = sub.auto_recurring?.currency_id || '';
          row.insertCell().textContent = `${subAmount.toFixed(2)} ${currency}`;
          const statusCell = row.insertCell();
          statusCell.textContent = sub.status;
          statusCell.className = `status status-${sub.status}`;
          const nextPaymentDate = sub.next_payment_date ? new Date(sub.next_payment_date).toLocaleDateString() : 'Finalizado';
          row.insertCell().textContent = nextPaymentDate;
          
          // Columna de acciones
          const actionsCell = row.insertCell();
          const updateButton = document.createElement('button');
          updateButton.textContent = 'Actualizar';
          updateButton.className = 'button-update';
          updateButton.addEventListener('click', () => {
            console.log('Botón actualizar clickeado para:', sub.id); // Debug
            
            // Ocultar cualquier formulario existente
            const existingForms = document.querySelectorAll('.update-form');
            existingForms.forEach(form => form.remove());
            
            // Crear y mostrar el nuevo formulario
            const updateForm = createUpdateForm(sub.id, sub.reason || 'N/A', subAmount);
            
            // Insertar después de la fila actual
            row.parentNode.insertBefore(updateForm, row.nextSibling);
            
            console.log('Formulario insertado:', updateForm); // Debug
          });
          actionsCell.appendChild(updateButton);
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
          paginationControls.forEach(c => c.classList.add('hidden'));
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

  const triggerSearch = () => {
      currentPage = 1;
      fetchAndDisplaySubscriptions();
  };

  btnBuscar.addEventListener('click', triggerSearch);
  emailSearchInput.addEventListener('keyup', (event) => { if (event.key === 'Enter') triggerSearch(); });
  amountSearchInput.addEventListener('keyup', (event) => { if (event.key === 'Enter') triggerSearch(); });

  prevButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
          if (currentPage > 1) {
              currentPage--;
              await fetchAndDisplaySubscriptions();
              tableContainer.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  nextButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
          if (currentPage < totalPages) {
              currentPage++;
              await fetchAndDisplaySubscriptions();
              tableContainer.scrollIntoView({ behavior: 'smooth' });
          }
      });
  });

  inicializarApp();
});