// Write string preparation function, which fill template in with data from 
// specified object 

// Data object 
// user: { 
// id: 20 
// type_id: 'test' 
// } 

// Template: /api/items/%id%/%type_id% 
// Expected result: /api/items/20/test 

const user = { 
id: 20, 
name: "John Dow", 
role: "QA", 
salary: 100 
};

const apiTemplatesSet1 = [ 
"/api/items/%id%/%name%", 
"/api/items/%id%/%role%", 
"/api/items/%id%/%salary%" 
];

const apiPathes = apiTemplatesSet1.map(apiPathTemplate => { 
    return getApiPath(user, apiPathTemplate); 
    });

function getApiPath(obj, template) {     
    let result = '';
    
    // Функция для очистки шаблона от символа
    cleanSymbol = (symbol = '%') => {
        result = template.replace(new RegExp(symbol,'g'), '');
        return result
    };     

    replacer = (static, ...dynamic) => {        
        
        //Убираем знак процента
        cleanSymbol();        
        
        //Первый аргумент для замены одинаковой части по всех строках
        result = result.replace(static, obj[static]);
        
        //Перебор следующих аргументов для замены в шаблоне
        dynamic.forEach(function(item) {            
            result = result.replace(item, obj[item]);            
        });
        
        //Заменям в готовом результате пробелы на спец.символы
        result = result.replace(/ /g, '%20');

        return result;
    }    
    
    result = replacer('id', 'name', 'role', 'salary');   
    
    return result; 
}

console.log(JSON.stringify(apiPathes));  

// expected: 
// ["/api/items/20/John%20Dow","/api/items/20/QA","/api/items/20/100"] 
