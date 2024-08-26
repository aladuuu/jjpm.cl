fetch('/certs/certs.json')
  .then(response => response.json())
  .then(data => {
    const galleryContainer = document.getElementById('gallery');

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'col-md-4 mb-4';

      card.innerHTML = `
        <div class="card" onclick="showIframe('${item.iframeUrl}')">
          <img src="${item.imageUrl}" class="card-img-top" alt="Imagen">
        </div>
      `;

      galleryContainer.appendChild(card);
    });
  });

function showIframe(iframeUrl) {
  const modalContent = `
    <div class="modal fade" id="iframeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <iframe src="${iframeUrl}" width="100%" height="400px" frameborder="0"></iframe>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalContent);

  $('#iframeModal').modal('show');

  $('#iframeModal').on('hidden.bs.modal', function () {
    $(this).remove();
  });
}

var year = new Date().getFullYear();
document.getElementById("year").innerText = year;