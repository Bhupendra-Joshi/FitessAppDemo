export const formatDate = (timeInMilliseconds: number) => {
    const date = new Date(timeInMilliseconds);
    const dayString = ('0' + date.getDate()).slice(-2);
    const monthString = ('0' + date.getMonth()).slice(-2);
    const yearString = date.getFullYear();

    return `${dayString}/${monthString}/${yearString}`;
}

