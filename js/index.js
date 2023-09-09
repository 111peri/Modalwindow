const tbody = document.getElementById('tbodyPosts');

const url = 'http://localhost:3030/posts'



async function getPosts() {

    tbody.innerHTML = '';
    try {
        const response = await axios.get(url);
        response.data.forEach((el, index) => {
            tbody.innerHTML += `
                <tr>
                    <th>${index + 1}</th>
                    <td>${el.title}</td>
                    <td>${el.body}</td>
                    <td>
                        <button  data-id="${el.id}" class="deleteBtn btn btn-danger">удалить</button>
                    </td>
                </tr>
            `
        })

        const deleteBtns = document.querySelectorAll('.deleteBtn');
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', deletePost)
        })
    } catch (error) {
        throw error
    }
}

getPosts()


async function deletePost(event) {
    try {
        const id = event.target.dataset.id;
        const response = await axios.delete(url + `/${id}`)
        getPosts()
        return response
    } catch (error) {
        throw error
    }
}





const openModalBtn = document.getElementById('openModalBtn');
const customModal = document.getElementById('customModal');
const closeModalBtns = document.querySelectorAll('#closeModalBtn');
const confirmBtn = document.getElementById('confirmBtn'); // Добавляем кнопку "Да"
const cancelBtn = document.getElementById('cancelBtn'); // Добавляем кнопку "Нет"

// Функция для открытия модального окна
function openModal() {
    customModal.style.display = 'block';
}

// Функция для закрытия модального окна
function closeModal() {
    customModal.style.display = 'none';
}

// Добавляем обработчики событий для кнопок

openModalBtn.addEventListener('click', openModal);

// Добавляем обработчики событий для кнопок закрытия модального окна
closeModalBtns.forEach(btn => {
    btn.addEventListener('click', closeModal);
});

// Закрыть модальное окно при клике вне его области
window.addEventListener('click', (event) => {
    if (event.target === customModal) {
        closeModal();
    }
});

// Добавляем обработчики событий для кнопок "Да" и "Нет"
confirmBtn.addEventListener('click', () => {
    const elementIdToDelete = confirmBtn.dataset.elementId; // Получаем id элемента для удаления из атрибута данных кнопки "Да"
    const elementToRemove = document.getElementById(elementIdToDelete);

    if (elementToRemove) {
        elementToRemove.remove('id');
    }

    closeModal(); // Закрыть модальное окно
});

cancelBtn.addEventListener('click', () => {
    closeModal(); // Закрыть модальное окно
});