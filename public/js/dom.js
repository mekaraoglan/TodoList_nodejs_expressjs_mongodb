document.addEventListener("DOMContentLoaded", () => {
    taskPopupShow();
    taskInputLenght();
});

function taskPopupShow() {
    const openPopupBtn = document.getElementById('openPopupBtn');
    const popup = document.getElementById('popup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    openPopupBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
    });

    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
};

function taskInputLenght() {
    const taskTitle = document.getElementById("task-title");
    const taskTitleLength = document.getElementById("task-title-length");
    const taskDescription = document.getElementById("task-description");
    const taskDescriptionLength = document.getElementById("task-description-length");

    if (taskTitle) {
        taskTitleLength.textContent = `${taskTitle.value.length}/50`;
    }
    if (taskDescription) {
        taskDescriptionLength.textContent = `${taskDescription.value.length}/1500`;
    }


    taskTitle.addEventListener("input", () => {
        const length = taskTitle.value.length;
        taskTitleLength.textContent = `${length}/50`;
    });

    taskDescription.addEventListener("input", ()=> {
        const length = taskDescription.value.length;
        taskDescriptionLength.textContent = `${length}/1500`;
    });
};