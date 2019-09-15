export const formate = time => {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`
};
