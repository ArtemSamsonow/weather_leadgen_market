# Weather Leadgen.Market

Современное веб-приложение для получения данных о погоде с удобным пользовательским интерфейсом, построенное на React с использованием TypeScript и Vite.

## Технологии

- React 19
- TypeScript
- Vite
- Redux Toolkit
- TailwindCSS
- Framer Motion
- React Hook Form
- Axios

## Требования

- Node.js (версия 18.x или выше)
- npm (версия 8.x или выше)

## Установка и запуск

Следуйте этим шагам для настройки проекта на вашем локальном компьютере:

### 1. Клонирование репозитория

```bash
git clone https://github.com/ваш-репозиторий/weather_leadgen_market.git
cd weather_leadgen_market
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Настройка переменных окружения

Создайте файл `.env` в корневой директории проекта и добавьте необходимые переменные окружения:

```bash
API_KEY=ваш_ключ_api_погоды
```

### 4. Запуск в режиме разработки

```bash
npm run dev
```

Это запустит проект на локальном сервере (обычно http://localhost:5173) с горячей перезагрузкой.

### 5. Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут размещены в директории `dist`.

### 6. Предпросмотр продакшен-сборки

```bash
npm run preview
```

### 7. Деплой на GitHub Pages

```bash
npm run deploy
```

## Доступные скрипты

- `npm run dev` - запуск проекта в режиме разработки с автоматическим запуском линтеров
- `npm run build` - сборка проекта для продакшена
- `npm run preview` - локальный предпросмотр продакшен-сборки
- `npm run deploy` - деплой на GitHub Pages
- `npm run linters` - запуск всех линтеров
- `npm run lint-prettier` - форматирование кода с помощью Prettier
- `npm run lint-eslint` - проверка и исправление кода с помощью ESLint