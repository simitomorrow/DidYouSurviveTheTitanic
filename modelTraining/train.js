import { csvData } from "./data.js";

const parsedData = Papa.parse(csvData, { header: true, dynamicTyping: true }).data;
for (let i = parsedData.length - 1; i >= 0; i--) {
    const passenger = parsedData[i];
    passenger.Age = (passenger.Age == undefined) ? 28 : passenger.Age; //28 is the Median
    passenger.Cabin = (passenger.Cabin == undefined) ? "N" : passenger.Cabin.charAt(0);
    if (passenger.Embarked == undefined) {
        parsedData.splice(i, 1);
    }
    delete passenger.Ticket;
}
console.log(parsedData)
