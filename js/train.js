import { csvData } from "./data.js";
import * as tf from 'https://cdn.skypack.dev/@tensorflow/tfjs'
import * as sk from 'https://cdn.skypack.dev/scikitjs'
sk.setBackend(tf)

// Clean the data: fill in missing values and remove unusable columns.
const parsedData = Papa.parse(csvData, { header: true, dynamicTyping: true }).data;
for (let i = parsedData.length - 1; i >= 0; i--) {
    const passenger = parsedData[i];
    passenger.Age = (passenger.Age == undefined) ? 28 : passenger.Age; //28 is the Median
    passenger.Cabin = (passenger.Cabin == undefined) ? "N" : passenger.Cabin.charAt(0);
    if (passenger.Embarked == undefined) {
        parsedData.splice(i, 1);
    }
    delete passenger.PassengerId;
    delete passenger.Ticket;
}
const twoDimensionalData = parsedData.map((obj) => Object.values(obj));
const survivalLabels = twoDimensionalData.map((row) => row[0]);
const removedResultsData = twoDimensionalData.map((row) => row.slice(1));

const examplePassengerData = {
    Age: 123,
    Cabin: "D",    //N for none, 
    Embarked: "S", //S, C, Q
    Fare: 7.25,
    Name: "Braund, Mr. Owen Harris",
    Parch: 0,
    Pclass: 3,   //1, 2, 3
    Sex: "male", //male, female
    SibSp: 1,
}
export function didThePassengerSurvive(passenger) {
    passenger.Age = (passenger.Age == undefined) ? 28 : passenger.Age; //28 is the Median
    passenger.Cabin = (passenger.Cabin == undefined) ? "N" : passenger.Cabin.charAt(0);
    passenger.Embarked = (passenger.Embarked == undefined) ? "S" : passenger.Embarked;
    passenger.Fare = (passenger.Fare == undefined) ? 7.25 : passenger.Fare;
    passenger.Name = (passenger.Name == undefined) ? "John Doe" : passenger.Name;
    passenger.Parch = (passenger.Parch == undefined) ? 0 : passenger.Parch;
    passenger.Pclass = (passenger.Parch == undefined) ? 3 : passenger.Pclass;
    passenger.Sex = (passenger.Sex == undefined) ? "male" : passenger.Sex;
    passenger.SibSp = (passenger.Sex == undefined) ? 1 : passenger.SibSp;

    //CSV-Structure after cutting "Survived" column and converting Objects to Array:
    // 0: "Pclass"
    // 1: "Name"
    // 2: "Sex"
    // 3: "Age"
    // 4: "SibSp"
    // 5: "Parch"
    // 6: "Fare"
    // 7: "Cabin"
    // 8: "Embarked"
    const preparedPassengerData = [
        passenger.Pclass,
        passenger.Name,
        passenger.Sex,
        passenger.Age,
        passenger.SibSp,
        passenger.Parch,
        passenger.Fare,
        passenger.Cabin,
        passenger.Embarked
    ];
    removedResultsData.unshift(preparedPassengerData)
    survivalLabels.unshift(0)
    //Normalize columns with numeric data
    const selectedColumns = [0, 3, 4, 5, 6];
    const scaler = new sk.StandardScaler();
    const normalizedData = scaler.fitTransform(removedResultsData.map((row) =>
        selectedColumns.map((column) => row[column])
    ));
    const normalizedPassengerData = normalizedData.arraySync()[0]

    // Train the Bayesian classifier
    const bayes = new sk.GaussianNB();
    bayes.fit(normalizedData, survivalLabels);
    const result = bayes.predict([normalizedPassengerData])
    return Boolean(result.dataSync()[0]);
}
console.log(didThePassengerSurvive(examplePassengerData));

function testPerformanceOfAI() {
    const splitIndex = Math.floor(twoDimensionalData.length * 0.8);
    const trainData = twoDimensionalData.slice(0, splitIndex);
    const testData = twoDimensionalData.slice(splitIndex);
    const trainLabels = trainData.map((row) => row[0]);
    const testLabels = testData.map((row) => row[0]);

    // Remove the labels from the data
    const trainFeatures = trainData.map((row) => row.slice(1));
    const testFeatures = testData.map((row) => row.slice(1));

    //Normalize columns with numeric data
    const selectedColumns = [0, 3, 4, 5, 6];
    const scaler = new sk.StandardScaler();
    const normalizedTrainFeatures = scaler.fitTransform(trainFeatures.map((row) =>
        selectedColumns.map((column) => row[column])
    ));
    const normalizedTestFeatures = scaler.fitTransform(testFeatures.map((row) =>
        selectedColumns.map((column) => row[column])
    ));

    // Train the Bayesian classifier
    const bayes = new sk.GaussianNB();
    bayes.fit(normalizedTrainFeatures, trainLabels);

    // Calculate the accuracy of the predictions
    const predictedLabels = bayes.predict(normalizedTestFeatures);
    const confidenceLabels = bayes.predictProba(normalizedTestFeatures);
    const numCorrect = predictedLabels.dataSync().filter((label, i) => label === testLabels[i]).length;
    const accuracy = numCorrect / testLabels.length;

    // Log results
    console.log(`Accuracy: ${accuracy}`);
    const predictedLabelsArray = predictedLabels.arraySync();
    const confidenceLabelsArray = confidenceLabels.arraySync();
    console.log(confidenceLabelsArray)
    for (let i = 0; i < predictedLabelsArray.length; i++) {
        console.log(`Prediction: ${predictedLabelsArray[i]}, Confidence: ${confidenceLabelsArray[i][0] * 100} , Actual Value: ${testLabels[i]}, ${predictedLabelsArray[i] == testLabels[i]}`);
    }
}