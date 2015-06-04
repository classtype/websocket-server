//--------------------------------------------------------------------------------------------------

require('app.init')(
    './Modules'
);

/*--------------------------------------------------------------------------------------------------
|
| -> Создаем сервер
|
|-------------------------------------------------------------------------------------------------*/

$.Socket.create({
/* Консоль
 * -> all = все запросы
 * -> body = только тело запросов
**/
    console: 'body',
    
// Адрес сервера
    host: [process.env.IP, process.env.PORT],
    
// Обработчик авторизации
    onAccess: function(onError, onComplete, userid, password) {
    // Пример асинхронного запроса к базе данных
        setTimeout(function() {
        // Ошибка авторизации
            return onError();
            
        // Успешная авторизация
            return onComplete(userid, {
                userid: userid,
                password: password
            });
        }, 1000);
    }
});

/*--------------------------------------------------------------------------------------------------
|
| -> Добавляем обработчик инициализации
|
|-------------------------------------------------------------------------------------------------*/

$.on('Init', function(id) {
// Указатель
    var t = this;
    
// Пример асинхронного запроса к базе данных
    setTimeout(function() {
    // Сообщение в консоли
        console.log('Init, id: ' + id);
        
    // Вызываем обработчик инициализации
        t.send('Init', 123);
    }, 1000);
});

/*--------------------------------------------------------------------------------------------------
|
| -> Добавляем обработчик GetName
|
|-------------------------------------------------------------------------------------------------*/

$.on('getName', function(id, name) {
    console.log('ID: ' + id);
    console.log('name: ' + name);
    console.log('this.getUserID(): ' + this.getUserID());
    this.send('setName', 1, 2, 3);
});

//--------------------------------------------------------------------------------------------------