/**
 * Хук для отображения сегодняшней даты и дня недели
 */
export const useFormatDateAndGetWeekday = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const formattedDateFull = `${day}.${month}.${year}`;

    const weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    const weekday = weekdays[date.getDay()];

    return {
        dateFull: formattedDateFull,
        weekDay: weekday,
    };
};
