window.onload = function () {
    var textToChange = document.getElementsByClassName('changeText')[0].innerHTML;
    textToChange = textToChange.replace(/\r*\n/g, '<br>');
    textToChange = textToChange.replace(/\'/g,  '"');
    document.getElementsByClassName('changeText')[0].innerHTML = textToChange.replace(/(\w)\"(\w)/g,  "$1'$2");
    
    function insertAfter(newElem, elem) {
        elem.parentElement.insertBefore(newElem, elem.nextSibling);
    }
    function deleteError() {
        if (this.classList.contains('fieldError')) {
            this.parentElement.removeChild(this.nextSibling);
            this.classList.remove('fieldError');
        }
    }
    function deleteErrorByName(name) {
        deleteError.call(document.getElementsByName(name)[0]);
    }
    function checkError(errText, fieldName, regularExp) {
        var field = document.getElementsByName(fieldName)[0];
        if ((!field.classList.contains('fieldError')) && (!regularExp.test(field.value))) {
            field.classList.add('fieldError');
            var errorElem = document.createElement('div');
            errorElem.className = "error";
            errorElem.innerHTML = errText;
            insertAfter(errorElem, field);
            formIsCorrect = false;
        }
    }
    
    
    document.getElementsByClassName('submit')[0].onclick = function () {
        formIsCorrect = true;
        event.preventDefault();
        deleteErrorByName('name');
        checkError('Это поле обязательно для заполнения', 'name', /^.+$/);
        checkError('В этом поле должны быть только буквы.', 'name', /^[a-zA-Zа-яёА-ЯЁ]+$/);
        deleteErrorByName('phone');
        checkError('Это поле обязательно для заполнения', 'phone', /^.+$/);
        checkError('Это поле должно соответствовать шаблону +7(000)000-0000 .', 'phone', /^\+7\(\d{3}\)\d{3}-\d{4}$/);
        deleteErrorByName('eMail');
        checkError('Это поле обязательно для заполнения', 'eMail', /^.+$/);
        checkError('Поле должно соответствовать одному из шаблонов: mymail@mail.ru my.mail@mail.ru my-mail@mail.ru', 'eMail', /^[a-z]+(|\.|-)[a-z]+@[a-z]+\.[a-z]{2,3}$/); // /^[a-z]+(|\.|-)[a-z]+@[a-z]+\.[a-z]{2,3}$/
        deleteErrorByName('someText');
        checkError('Это поле обязательно для заполнения', 'someText', /^.+$/);
        if (formIsCorrect) {
            var ollKorrect = document.createElement('div');
            ollKorrect.className = "ollKorrect";
            ollKorrect.innerHTML = "Форма заполнена правильно!";
            this.parentElement.appendChild(ollKorrect);
        }
    };
    document.getElementsByName('name')[0].onfocus = deleteError;
    document.getElementsByName('phone')[0].onfocus = deleteError;
    document.getElementsByName('eMail')[0].onfocus = deleteError;
    document.getElementsByName('someText')[0].onfocus = deleteError;
}