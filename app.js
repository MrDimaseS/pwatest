// Проверяем, поддерживает ли браузер функцию "Добавить на главный экран"
if ('serviceWorker' in navigator && 'SettableServiceWorker' in window) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js').then(function(registration) {
            console.log('Service worker зарегистрирован: ', registration);
        }).catch(function(error) {
            console.log('Ошибка при регистрации service worker: ', error);
        });
    });

    window.addEventListener('beforeinstallprompt', (event) => {
        // Отменяем стандартное поведение браузера
        event.preventDefault();
        // Сохраняем событие для использования его позже
        deferredPrompt = event;
        // Показываем кнопку "Добавить на главный экран"
        document.getElementById('installButton').style.display = 'block';
    });

    // Обработчик нажатия кнопки "Добавить на главный экран"
    document.getElementById('installButton').addEventListener('click', () => {
        // Показываем запрос на добавление на главный экран
        deferredPrompt.prompt();
        // Ждем результата
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Пользователь добавил PWA на главный экран');
            } else {
                console.log('Пользователь отклонил запрос на добавление на главный экран');
            }
            // Очищаем событие
            deferredPrompt = null;
        });
    });
}
