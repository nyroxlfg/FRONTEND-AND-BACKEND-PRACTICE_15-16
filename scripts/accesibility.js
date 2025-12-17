// Улучшение доступности для клавиатуры
document.addEventListener('DOMContentLoaded', function() {
    // Делаем все ссылки и кнопки доступными для Space
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], [tabindex="0"]');
    
    interactiveElements.forEach(element => {
        // Обработка Space для кнопок
        if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
            element.addEventListener('keydown', function(e) {
                if (e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
        
        // Обработка Enter для всех интерактивных элементов
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                // Для ссылок Enter работает по умолчанию
                if (this.tagName !== 'A') {
                    e.preventDefault();
                    this.click();
                }
            }
        });
    });
    
    // Автофокус на первом поле формы
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const firstInput = form.querySelector('input, textarea, select, button');
        if (firstInput) {
            form.addEventListener('submit', function() {
                setTimeout(() => {
                    firstInput.focus();
                }, 100);
            });
        }
    });
    
    // Улучшение фокуса для модальных окон (если есть)
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close-btn, [data-close]');
        if (closeBtn) {
            closeBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                    // Возвращаем фокус на элемент, который открыл модальное окно
                    const opener = document.activeElement;
                    if (opener) opener.focus();
                }
            });
        }
    });
    
    // Ловушка фокуса в модальных окнах
    function trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            modal.addEventListener('keydown', function(e) {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    }
    
    // Инициализация ловушек фокуса
    modals.forEach(trapFocus);
});