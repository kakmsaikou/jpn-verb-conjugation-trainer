import dayjs from 'dayjs';

export const useDailyRecord = () => {
  const record = JSON.parse(localStorage.getItem('daily_record') || 'null') || {
    day: dayjs().format('DD/MM/YYYY'),
    correct: 0,
    answer: 0,
  };
  if (dayjs().format('DD/MM/YYYY') !== record.day) {
    Object.assign(record, {
      day: dayjs().format('DD/MM/YYYY'),
      correct: 0,
      answer: 0,
    });
  }
  const updateRecord = (isCorrect: boolean) => {
    record.answer++;
    if (isCorrect) {
      record.correct++;
    }
    localStorage.setItem('daily_record', JSON.stringify(record));
  };
  return {
    record,
    updateRecord
  };
};
