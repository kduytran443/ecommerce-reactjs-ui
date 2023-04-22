export const renderToDate = (timeData) => {
    let time = new Date(timeData);
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
};
export const renderToTime = (timeData) => {
    let time = new Date(timeData);
    return `${time.getDate()}/${
        time.getMonth() + 1
    }/${time.getFullYear()} - ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
};
export const inputNumber = (value, callback) => {
    if (!isNaN(value) && !value.includes(' ')) {
        callback(value);
    }
};
export const validDiscount = (discount) => {
    const date = new Date();
    if (discount.status && date.getTime() >= discount.startTime && date.getTime() <= discount.endTime) {
        return true;
    }
    return false;
};
