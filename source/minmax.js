'use strict';

let minMax = (inputStr) => {
	// Валидация входных дынных (если не строка -> null)
	if (typeof inputStr !== "string") {
		return null;
	}	

	// Сплитим входную строку по пробелу
	const splitedStr = inputStr.split(" "); 

	let parsedArr = splitedStr.reduce((result, current) => {
		// Если элемент массива NaN
		if (Number.isNaN(parseFloat(current))) {
			 // Убираем из него все символы, отличные от чисел, с помощью регулярного выражения (божьей)
			current = current.replace(/[^-.\d]/g, ""); 	 	
			if (current.length === 0) {	
				return result;		 
			}
		}
		result.push(parseFloat(current));
		return result;			
	}, []);

	// Объявляем min и max перемнные	
	let min, max;	

	// Если массив не пустой -> ищем min & max элементы
	if (parsedArr.length !== 0) {
		max = Math.max(...parsedArr);
		min = Math.min(...parsedArr);
	}

	// Возвращаем min max
	return [min, max];
}
