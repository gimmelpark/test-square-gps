<template>
  <div class="d-flex justify-center">
    <VSheet class="mt-5 py-10 px-16" width="1000">
      <div class="text-h4">
        {{ $t("titles.title-1") }}
      </div>

      <div class="mt-3 text-h5">
        {{ $t("titles.title-2") }}
      </div>

      <div v-html="$t('contents.content-1')" />

      <div class="mt-3 text-h6">
        {{ $t("titles.title-3") }}
      </div>

      <div>
        {{ $t("contents.content-2") }}
      </div>

      <div class="mt-3 text-h6">
        {{ $t("titles.title-4") }}
      </div>

      <div v-html="$t('contents.content-3')" />

      <br />

      <div>
        {{ $t("contents.content-4") }}

        <a href="https://geocode.maps.co/">https://geocode.maps.co/</a>
      </div>

      <br />

      <div v-html="$t('contents.content-5')" />

      <br />

      <div>
        {{ $t("contents.content-6") }}
      </div>

      <div class="mt-3 text-h6">
        {{ $t("titles.title-5") }}
      </div>

      <div v-html="$t('contents.content-7')" />

      <br />

      <div v-html="$t('contents.content-8')" />

      <br />

      <div>
        {{ $t("contents.content-9") }}
      </div>

      <div class="d-flex justify-center">
        <img src="@/assets/task-img.png" />
      </div>
    </VSheet>
  </div>
</template>

<i18n>
{
  "en": {
    "titles": {
      "title-1": "Hello! Thank you for agreeing to take the test task for the position of Frontend Developer (VueJS). We hope to see you soon at a tech. interview",
      "title-2": "Test task SquareGPS",
      "title-3": "Section “About the task”",
      "title-4": "Section “Map”",
      "title-5": "Additionally:"
    },
    "contents": {
      "content-1": "You need to write an application using <b>Vuejs, Vuex, VueRouter, Vuetify</b>. The application header should contain a menu of 2 items: <b>About the task</b> and <b>Map</b>. The main part of the application should display the contents of the sections.",
      "content-2": "The section should contain the text of this assignment, laid out in a similar way.",
      "content-3": "There should be a map and a list on the screen (see example):<br>1. When you click on the add button, the map should go into the mode of adding a marker: a marker should appear at the click location, and an entry with the address of the point should appear in the list",
      "content-4": "To find an address, you can use any free geocoding API, for example:",
      "content-5": "If the address is not found, you must display an error and not add the marker to the list.<br><br>2. When you click on the marker, the entry in the list should be highlighted<br>3. When you click on an entry in the list, the map should be centered on the marker<br>4. Markers should be stored locally and not disappear after a page reload<br>5. The address bar should display the id of the selected marker",
      "content-6": "Local data storage should be organized in the form of a service that emulates the backend. (Requires a Backend class that pseudo-asynchronously stores data in localStorage)",
      "content-7": "1. Consider display on mobile devices<br>2. Provide localization<br>3. You need to use <b>jest</b> to write 1 unit test for any component",
      "content-8": "<b>Reminder:</b> The test task is designed to demonstrate the ability to write good modular code, as well as the ability to use the specified technologies and more. This is code to be proud of.",
      "content-9": "Example:"
    }
  },
  "ru": {
    "titles": {
      "title-1": "Привет! Спасибо, что согласился пройти тестовое задание на позицию Frontend-разработчика (VueJS). Надеемся на скорую встречу на тех. собесе",
      "title-2": "Тестовое задание SquareGPS",
      "title-3": "Раздел “О задании”",
      "title-4": "Раздел “Карта”",
      "title-5": "Дополнительно:"
    },
    "contents": {
      "content-1": "Необходимо с помощью <b>Vuejs, Vuex, VueRouter, Vuetify</b> написать приложение. Хэдер приложения должен содержать меню из 2-х пунктов: <b>О задании</b> и <b>Карта</b>. В основной части приложения должно отображаться содержимое разделов.",
      "content-2": "В разделе должен быть текст этого задания, сверстанный аналогично.",
      "content-3": "На экране должны быть карта и список (см пример):<br>1. При клике на кнопку добавления, карта должна перейти в режим добавления маркера: в месте клика должен появится маркер, а в списке - запись с адресом точки",
      "content-4": "Для поиска адреса можно использовать любое бесплатное API для геокодирования, например:",
      "content-5": "В случае, если адрес не найден, необходимо вывести ошибку и не добавлять маркер в список.<br><br>2. При клике на маркер должна подсвечиваться запись в списке<br>3. При клике на запись в списке карта должна центрироваться на маркере<br>4. Маркеры должны храниться локально и не пропадать после перезагрузки страницы<br>5. В адресной строке должен отображаться id выбранного маркера",
      "content-6": "Локальное хранение данных должно быть организовано в виде сервиса, эмулирующего бекенд. (Необходим класс Backend, который псевдо-асинхронно сохраняет данные в localStorage)",
      "content-7": "1. Продумать отображение на мобильных устройствах<br>2. Предусмотреть локализацию<br>3. Необходимо с помощью <b>jest</b> написть 1 модульный тест на любой компонент",
      "content-8": "<b>Напоминание:</b> тестовое задание призвано показать умение писать хороший модульный код, а также умение пользоваться указанными технологиями и не только. Этим кодом нужно гордиться.",
      "content-9": "Пример:"
    }
  }
}
</i18n>
