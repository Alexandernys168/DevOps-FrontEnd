export const countOccurrences = (events) => {
    return events.reduce((countMap, event) => {
        const key = event.result; // You can use a different key based on your counting criteria
        countMap[key] = (countMap[key] || 0) + 1;
        return countMap;
    }, {});
};
