let currentPopup = null;
function toggleContent(event) {
    const element = event.target;

    // Kiểm tra nếu là ô có thuộc tính 'data-type="trun-display"' để hiển thị popup
    if (element.getAttribute('data-type') === 'trun-display') {
        if (currentPopup) {
            currentPopup.remove();
            currentPopup = null;
        }

        // Tạo popup mới
        const popup = document.createElement('div');
        popup.classList.add('popup');

        const content = document.createElement('div');
        content.classList.add('popup-content');
        content.innerText = element.innerText;
        popup.appendChild(content);

        // Đặt vị trí cho popup
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
        popup.style.top = `${rect.bottom + scrollTop}px`;
        popup.style.left = `${rect.left + scrollLeft}px`;

        document.body.appendChild(popup);
        popup.style.display = 'block';

        // Đóng popup khi click ra ngoài
        document.addEventListener('click', function outsideClickListener(event) {
            if (!popup.contains(event.target) && event.target !== element) {
                popup.remove();
                currentPopup = null;
                document.removeEventListener('click', outsideClickListener);
            }
        });

        currentPopup = popup;
    } else {
        // Toggle giữa 'truncate' và 'extended' cho các ô khác
        if (element.classList.contains('truncate')) {
            element.classList.remove('truncate');
            element.classList.add('extended');
        } else if (element.classList.contains('extended')) {
            element.classList.remove('extended');
            element.classList.add('truncate');
        }
    }
}

function setModel(model) {
    // console.log("Changing model to:", model);
    // Cập nhật nội dung của nút dropdown
    document.getElementById('model-selector').textContent = model;

    // Gửi yêu cầu AJAX đến máy chủ để thay đổi mô hình
    fetch('/change-model', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ model: model })
    })
    .then(response => response.json())
    .then(data => {
        // console.log("Response received:", data);
        if (data.message) {
            showAlert(data.message, 'success');
        } else if (data.error) {
            showAlert(data.error, 'danger');
        }
    })
    .catch(error => {
        // console.error('Error:', error);
        showAlert('An error occurred while changing the model.', 'danger');
    });
}
	
function showAlert(message, type) {
    // console.log("Showing alert:", message);
    
    // Tạo thẻ div chứa thông báo
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type} alert-dismissible fade show position-fixed text-center`;
    alertBox.role = 'alert';
    alertBox.style.zIndex = '9999'; // Đảm bảo thông báo nằm trên cùng các thành phần khác
    alertBox.style.maxWidth = '80%'; // Đảm bảo thông báo không quá rộng
    alertBox.style.left = '50%'; // Đặt vị trí chính giữa theo chiều ngang
    alertBox.style.top = '20%'; // Đặt vị trí cách đỉnh màn hình 20%
    alertBox.style.transform = 'translateX(-50%)'; // Điều chỉnh để chính giữa màn hình
    alertBox.innerHTML = `
        ${message}
    `;
    
    // Thêm thông báo vào body
    document.body.appendChild(alertBox);

    // Tự động tắt sau 2 giây
    setTimeout(() => {
        // Xóa thông báo sau khi ẩn
        alertBox.classList.remove('show');
        alertBox.addEventListener('transitionend', () => alertBox.remove());
    }, 1000);
}

$(document).ready(function() {
    $('#basic-datatables').DataTable({
    });

    $('#multi-filter-select').DataTable( {
        "ieLength": 4,
        initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<select class="form-control"><option value=""></option></select>')
                .appendTo( $(column.footer()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                        );

                    column
                    .search( val ? '^'+val+'$' : '', true, false )
                    .draw();
                } );

                column.data().unique().sort().each( function ( d, j ) {
                    select.append( '<option value="'+d+'">'+d+'</option>' )
                } );
            } );
        }
    });

    // Add Row
    $('#add-row').DataTable({
        "pageLength": 4,
    });

    var action = '<td> <div class="form-button-action"> <button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-primary btn-lg" data-original-title="Edit Task"> <i class="fa fa-edit"></i> </button> <button type="button" data-toggle="tooltip" title="" class="btn btn-link btn-danger" data-original-title="Remove"> <i class="fa fa-times"></i> </button> </div> </td>';

    $('#addRowButton').click(function() {
        $('#add-row').dataTable().fnAddData([
            $("#addName").val(),
            $("#addPosition").val(),
            $("#addOffice").val(),
            action
            ]);
        $('#addRowModal').modal('hide');

    });
});