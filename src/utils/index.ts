const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);

    return formattedDate;
};

export { formatDate };
