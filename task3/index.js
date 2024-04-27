const axios = require('axios');

async function getInputData() {
    try {
        const response = await axios.get('https://share.shub.edu.vn/api/intern-test/input');
        return response.data;
    } catch (error) {
        console.error('Cannot retrieve input data', error);
        throw error;
    }
}

async function sendOutputData(outputData, token) {
    try {
        const response = await axios.post('https://share.shub.edu.vn/api/intern-test/output', outputData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Result sent successfully. ', response.data);
    } catch (error) {
        console.error('Cannot send the result. Error:', error);
        throw error;
    }
}

function sumInRange(data, l, r) {
    var sum = 0;
    for (var i = l; i <= r; i++) {
        sum += data[i];
    }
    return sum;
}

function sumEvenMinusOdd(data, l, r) {
    var result = 0;
    for (var i = l; i <= r; i++) {
        if (i % 2 === 0) {
            result += data[i];
        } else {
            result -= data[i];
        }
    }
    return result;
}

function processQueries(data, queries) {
    const results = [];
    for (const query of queries) {
        const [l, r] = query.range;
        var result;
        if (query.type === '1') {
            result = sumInRange(data, l, r);
        } else if (query.type === '2') {
            result = sumEvenMinusOdd(data, l, r);
        }
        results.push(result);
    }
    return results;
}

async function handleQueries() {
    try {
        const inputData = await getInputData();
        const { data, query, token } = inputData;

        const outputData = processQueries(data, query);

        await sendOutputData(outputData, token);
    } catch (error) {
        console.error('Error:', error);
    }
}

handleQueries();
