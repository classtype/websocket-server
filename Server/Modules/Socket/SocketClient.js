//--------------------------------------------------------------------------------------------------

$.SocketClient = $.CT.extend(
    
/*--------------------------------------------------------------------------------------------------
|
| -> Конструктор
|
|-------------------------------------------------------------------------------------------------*/

    {private: {constructor: function(id, ws) {
        this.id = id;// ID соединения
        this.ws = ws;// Экземпляр соединения
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Возвращает UserID
|
|-------------------------------------------------------------------------------------------------*/

    {public: {getUserID: function() {
        return this.userid;
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Задает UserID
|
|-------------------------------------------------------------------------------------------------*/

    {public: {setUserID: function(userid) {
        this.userid = userid;
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Возвращает информацию о юзере
|
|-------------------------------------------------------------------------------------------------*/

    {public: {getData: function() {
        return this.data;
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Задает информацию о юзере
|
|-------------------------------------------------------------------------------------------------*/

    {public: {setData: function(data) {
        this.data = data;
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Отправляет сообщение об ошибке и закрывает соединение
|
|-------------------------------------------------------------------------------------------------*/

    {public: {error: function(error_msg) {
    // Отправляем сообщение
        this.send('Error', {'error_msg': error_msg});
        
    // Закрываем соединение
        this.close();
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Отправляет сообщение
|
|-------------------------------------------------------------------------------------------------*/

    {public: {send: function() {
    // Создаем запрос
        var r = [];
        
    // Переводим аргументы в массив
        var args = Array.prototype.slice.call(arguments, 0);
        
    // Удаляем первый элемент
        args.shift();
        
    // Добавляем заголовок
        r.push(arguments[0]);
        
    // Добавляем тело запроса (по умолчанию пустой массив)
        r.push(args);
        
    // Конвертируем в JSON
        var json = JSON.stringify(r);
        
    // Отправляем сообщение
        try {
            this.ws.send(json);
        } catch(e) {
        }
        
    // Записываем в консоль
        $.SocketConsole['<-'](arguments[0], ($.Socket.isConsole == 'body' ? JSON.stringify(r[1]) : json));
    }}},
    
/*--------------------------------------------------------------------------------------------------
|
| -> Закрывает соединение
|
|-------------------------------------------------------------------------------------------------*/

    {public: {close: function() {
    // Закрываем соединение
        try {
            this.ws.close();
        } catch(e) {
        }
    }}}
);

//--------------------------------------------------------------------------------------------------