'use strict';

QUnit.module('Тестируем функцию minmax', function () {
	QUnit.test('minmax работает правильно на строках без чисел', function (assert) {
		assert.deepEqual(minmax(''), [ undefined, undefined ], 'Особый случай, когда в строке нет чисел');
		assert.deepEqual(minmax('мама мыла раму'), [ undefined, undefined ]);
	});

	QUnit.test('minmax правильно парсит отдельные числа', function (assert) {
		assert.deepEqual(minmax('0'), [ 0, 0 ]);
		assert.deepEqual(minmax('1'), [ 1, 1 ]);
		assert.deepEqual(minmax('Infinity'), [ Infinity, Infinity ]);
		assert.deepEqual(minmax('-Infinity'), [ -Infinity, -Infinity ]);
		assert.deepEqual(minmax('42'), [ 42, 42 ]);
		assert.deepEqual(minmax('.0'), [ .0, .0 ]);
		assert.deepEqual(minmax('1.1'), [ 1.1, 1.1 ]);
		assert.deepEqual(minmax('.01'), [ .01, .01 ]);
		assert.deepEqual(minmax('1.01'), [ 1.01, 1.01 ]);
		assert.deepEqual(minmax('1e5'), [ 1e5, 1e5 ]);
		assert.deepEqual(minmax('-1e-5'), [ -1e-5, -1e-5 ]);
		assert.deepEqual(minmax('-.1e-5'), [ -.1e-5, -.1e-5 ]);
	});

	QUnit.test('minmax правильно парсит несколько чисел', function (assert) {
		assert.deepEqual(minmax('0 0 0 0'), [ 0, 0 ]);
		assert.deepEqual(minmax('1 1 1 1'), [ 1, 1 ]);
		assert.deepEqual(minmax('1 2 3 4'), [ 1, 4 ]);
		assert.deepEqual(minmax('-Infinity -1 0 1 Infinity'), [ -Infinity, Infinity ]);
		assert.deepEqual(minmax('-.01 0 .01'), [ -.01, .01 ]);
	});

	QUnit.test('minmax игнорирует обычный текст', function (assert) {
		assert.deepEqual(minmax('1, -5.8 или 10, хотя 34 + -5.3 и 73'), [ -5.8, 73 ]);
	});

	QUnit.test('minmax правильно парсит слова с числами', function (assert) {
		assert.deepEqual(minmax('1, -5.8aa или 10, хотя 34 + -5.3 и 73bb'), [ -5.8, 73 ]);
	});

	QUnit.test('minmax правильно парсит сплошную строку', function (assert) {
		assert.deepEqual(minmax('яконечно7.8дикоизвиняюсь'), [ 7.8, 7.8 ]);
	});

	QUnit.test('minmax правильно парсит числа с символами между цифр числа', function (assert) {
		assert.deepEqual(minmax('-1.нокак2 ваше8дз8 вплане-1тестов4?ммм?непонял'), [ -14, 88 ]);
	});

	QUnit.test('minmax работает правильно с пустой строкой', function (assert) {
		assert.deepEqual(minmax(''), [ undefined, undefined ]);
	});

	QUnit.test('minmax правильно обрабатывает различные типы входных данных', function (assert) {
		assert.deepEqual(minmax( null ), null, 'null');
		assert.deepEqual(minmax( undefined ), null, 'undefined');
		assert.deepEqual(minmax( true ), null, 'boolean');
		assert.deepEqual(minmax( ["gde den'gi vzyat'?", 8, 800, 555, 35, 35] ), null, 'array');

		assert.deepEqual(minmax( {author: "Эдуард Асадов", 
								  _title: "Доброта",

								  line_1: "Если друг твой в словесном споре",
								  line_2: "Мог обиду тебе нанести,",
								  line_3: "Это горько, но это не горе,",
								  line_4: "Ты потом ему все же прости.",

								  line_5: "Если ты с любимою в ссоре,",
								  line_6: "А тоска по ней горяча,",
								  line_7: "Это тоже еще не горе,",
								  line_8: "Не спеши, не руби с плеча.",

								  line_9: "Пусть не ты явился причиной",
								  line_0: "Той размолвки и резких слов,",
								  line_1: "Встань над ссорою, будь мужчиной!",
								  line_2: "Это все же твоя любовь!",

								  line_3: "В жизни всякое может случиться,",
								  line_4: "И коль ваша любовь крепка,",
								  line_5: "Из-за глупого пустяка",
								  line_6: "Ты не должен ей дать разбиться.",

								  line_7: "И чтоб после себя не корить",
								  line_8: "В том, что сделал кому-то больно,",
								  line_9: "Лучше добрым на свете быть,",
								  line_0: "Злого в мире и так довольно.",

								  line_1: "Но в одном лишь не отступай,",
								  line_2: "На разрыв иди, на разлуку,",
								  line_3: "Только подлости не прощай",
								  line_4: "И предательства не прощай",
								  line_5: "Никому: ни любимой, ни другу"} ), null, 'object');

	});
});
