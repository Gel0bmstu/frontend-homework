'use strict';

function minmax(input_str) {
	// Сплитим входную строку по пробелу
	var splited_str = input_str.split(" "), 
		parsed_arr = [];

	// Пушим в конец инициализированного массива числа != NaN
	splited_str.forEach(function(item, i, splited_str) {
		if (isNaN(parseFloat(item))) {				 // Если элемент массива NaN
			item = item.replace(/[^\d|/.|/-]/g, ""); // Убираем из него все символы, отличные от чисел, с помощью регулярного выражения (божьей)
			if (item.length != 0)
				parsed_arr.push(parseFloat(item));	 // Если длина получившегося выражения != 0, пушим его в массив чисел 
		}
		else parsed_arr.push(parseFloat(item));			
	})

	// Иницилизируем min и max перемнные
	var min, max;	

	// Если массив не пустой -> ищем min & max элементы
	if (parsed_arr.length != 0) {
		max = Math.max(...parsed_arr);
		min = Math.min(...parsed_arr);
	}

	// Возвращаем min max
	return [min,max];
}
