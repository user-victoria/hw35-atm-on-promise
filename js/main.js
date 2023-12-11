/*  Необхідно реалізувати алгоритм запиту у банкомату:
    1. балансу на карті
    2. видачі готівки
*/

// Вхідні дані:
const userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100
};

const bankData = {
    USD: {
        max: 3000,
        min: 100,
        img: '💵'
    },
    EUR: {
        max: 1000,
        min: 50,
        img: '💶'
    },
    UAH: {
        max: 0,
        min: 0,
        img: '💴'
    },
    GBP: {
        max: 10000,
        min: 100,
        img: '💷'
    }
}

/*  Для цього пишемо функцію getMoney, яка:
    повертає new Promise, у якому умовою переходу у перший .then є відповідь користувача на питання
    'Подивитися баланс на карті?'.

    - Якщо користувач погоджується, то викликаємо функцію resolve()
      - У функції resolve, залежно від доступних користувачеві валют (userData), пропонуємо користувачеві
        ввести валюту, за якою буде виведено баланс.
      - Якщо користувач вводить в prompt назву НЕдоступної для нього валюти, то продовжуємо запитувати валюту,
        доки не буде введена доступна.
      - При введенні користувачем назви допустимої йому валюти – виводимо дані про баланс цієї валюти в консоль,
        наприклад: 'Баланс становить: 1000 USD'.

    - Якщо користувач не погоджується, то викликаємо функцію reject()
      - У функції reject, залежно від доступних користувачеві валют (userData) і доступних валют у поточному
        банкоматі bankData (з НЕ нульовим значенням властивості max, що говорить про відсутність у даний момент
        купюр цієї валюти в банкоматі), пропонуємо користувачеві ввести валюту, за якою буде проведено зняття
        готівки та суму зняття.
      - Якщо користувач вводить в prompt назву НЕдоступної для нього та для банкомату валюти, продовжуємо
        запитувати валюту, доки не буде введена доступна.
      - Якщо користувач вводить в prompt суму, що перевищує max для даної валюти, або суму, що перевищує його
        особисті кошти по даній валюті, то виводимо в консоль повідомлення: `Введена сума більша за доступну.
        Максимальна сума зняття: … Повторний запит на доступну валюту НЕ робимо.
      - Якщо користувач вводить в prompt суму меншу за min для даної валюти, виводимо в консоль повідомлення:
        `Введена сума менша за доступну. Мінімальна сума зняття: … Повторний запит на доступну валюту НЕ робимо.
      - При введенні користувачем доступної йому та банкомату назви валюти та суми – виводимо повідомлення про
        успішне зняття готівки в консоль, наприклад: 'От Ваші гроші 200 USD 💵'.

    - Фінальне повідомлення, яке незалежно від вибору операції повинен отримати користувач у консолі -
      'Дякую, гарного дня 😊'.
*/

function getMoney() {
    return new Promise(function (resolve, reject) {
        const seeBalanceCard = confirm('Подивитися баланс на карті?');
        seeBalanceCard ? resolve() : reject();
    });
}

getMoney()
    // resolve()
    .then(
        function () {
            let askCurrency;
            do {
                askCurrency = prompt('Виберіть одну з наступних валют: USD, EUR, UAH, BIF, AOA');
                if (userData.hasOwnProperty(askCurrency)) {
                    console.log(`Баланс становить: ${userData[askCurrency]} ${askCurrency}`);
                }
            } while (!userData.hasOwnProperty(askCurrency) || (askCurrency === null || askCurrency === ''));
        }
    )
    // reject()
    .catch(
        function () {
            let askBankCurrency;
            do {
                askBankCurrency = prompt('У якій валюті Ви хочете зняти гроші: USD, EUR, UAH, BIF, AOA, GBP?');
            } while ((!userData.hasOwnProperty(askBankCurrency) || !bankData.hasOwnProperty(askBankCurrency)) || (askBankCurrency === null || askBankCurrency === '') || bankData[askBankCurrency].max === 0);

            let askBankQuantity = +prompt('Введіть суму, яку Ви хочете зняти');
            if (askBankQuantity > bankData[askBankCurrency].max || askBankQuantity > userData[askBankCurrency]) {
                console.log(`Введена сума більша за доступну. Максимальна сума зняття: ${bankData[askBankCurrency].max} ${askBankCurrency}`);
            }
            else if (askBankQuantity < bankData[askBankCurrency].min) {
                console.log(`Введена сума менша за доступну. Мінімальна сума зняття: ${bankData[askBankCurrency].min} ${askBankCurrency}`);
            }
            else {
                console.log(`От Ваші гроші ${askBankQuantity} ${askBankCurrency} ${bankData[askBankCurrency].img}`);
            }
        }
    )
    .finally(
        function () {
            console.log('Дякую, гарного дня 😊');
        }
    )