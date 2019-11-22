const useDate = (date) => {
    let newDate = new Date(date);
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    let displayDate = newDate.toLocaleDateString("en-US", options);

    return displayDate;
};

export default useDate;