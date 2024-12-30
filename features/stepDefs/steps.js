import { Given, When, Then } from '@cucumber/cucumber';
import supertest from 'supertest';
import assert from 'assert';
import { expect } from 'chai';
import axios from 'axios';

const request = supertest('https://testapi.io');

Given('I am a user', function () {
    // No-op for now
});

When('I send a GET request to {string}', async function (endpoint) {
    const startTime = performance.now(); // Start timing
    this.response = await request.get(endpoint); // Make the GET request
    const endTime = performance.now(); // End timing
    this.responseTime = endTime - startTime; // Store response time in shared context
});

Then('the response time of the request is below {string} milliseconds', function (threshold) {
    // Convert the threshold to a number
    const numericThreshold = parseInt(threshold, 10);

    // Ensure responseTime is defined
    expect(this.responseTime).to.not.be.undefined;

    // Check if the response time is less than the threshold
    expect(this.responseTime).to.be.lessThan(numericThreshold, `Response time exceeded ${numericThreshold} ms`);
});

Then('the ID field is never null or empty for all 4 items present in the data array', function () {
    const jsonResponse = this.response.body; // Assuming the response body contains the JSON

    // Check if schedule and elements exist
    if (jsonResponse.schedule && Array.isArray(jsonResponse.schedule.elements)) {
        const elements = jsonResponse.schedule.elements;

        // Check each element for a non-null, non-empty 'id'
        const invalidIdElements = elements.filter((element, index) => {
            // Check if the 'id' is valid (non-null and non-empty)
            if (!element || !Object.hasOwn(element, 'id') || element.id === null || element.id === '') {
                console.log(`Element ${index} has an invalid 'id':`, element.id); // Log the invalid 'id'
                return true; // Mark this element as invalid
            }

            // Print confirmation for valid 'id'
            console.log(`Element ${index} has a valid 'id': ${element.id}`);
            return false; // This element has a valid 'id'
        });

        // If there are any invalid elements, throw an error with the count
        if (invalidIdElements.length > 0) {
            throw new Error(`Found ${invalidIdElements.length} element(s) with invalid 'id'.`);
        }

        // If all elements are valid, confirm at the end
        console.log(`All elements have valid, non-null, non-empty 'id'`);
    } else {
        throw new Error('Response does not contain a valid schedule or elements array');
    }
});

Then('the Type in Episode for every item is always Episode', function () {
    // Ensure the response body exists and is an object
    const body = this.response.body;
    if (!body || typeof body !== 'object') {
        console.error('Response body is missing or invalid:', body);
        throw new Error('Response body is missing or invalid.');
    }

    // Locate the `schedule.elements` array
    const elementsArray = body?.schedule?.elements;
    if (!Array.isArray(elementsArray)) {
        console.error('`schedule.elements` is not found or is not an array:', elementsArray);
        throw new Error('`schedule.elements` is not found or is not an array.');
    }

    // Verify that each item in elements has the correct 'episode.type' and handle title and id correctly
    elementsArray.forEach((item, index) => {
        const episodeType = item?.episode?.type;
        const title = item?.episode?.title; // Get the title (which is a string in this case)
        const id = item?.id; // Get the ID field

        // Check if the episode type is 'episode'
        if (episodeType !== 'episode') {
            console.error(`Invalid type in episode at index ${index}:`, item);
            throw new Error(`Item at index ${index} has an invalid episode type: ${episodeType}`);
        }

        // Check if title exists and is a non-empty string (since title is not an object but a string in this case)
        if (!title || typeof title !== 'string' || title.trim() === '') {
            console.error(`Missing or invalid title at index ${index}:`, item);
            throw new Error(`Item at index ${index} has a missing or invalid title. Item: ${JSON.stringify(item)}`);
        }

        // Check if the ID is valid (non-null and non-empty string)
        if (!id || typeof id !== 'string' || id.trim() === '') {
            console.error(`Missing or invalid ID at index ${index}:`, item);
            throw new Error(`Item at index ${index} has a missing or invalid ID. Item: ${JSON.stringify(item)}`);
        }

        // Log the episode type, title, and ID for each item
        console.log(`Item ${index + 1}:`);
        console.log(`  ID = ${id}`);
        console.log(`  Episode type = ${episodeType}`);
        console.log(`  Title = ${title}`);
    });

    // Final confirmation log after all validation passes
    console.log('All items in `schedule.elements` have "type" in "episode" set to "episode", a valid title, and a valid ID.');
});

Then('the Title field in Episode is never null or empty for any schedule item', function () {
    // Access the response body
    const body = this.response.body;

    // Ensure the response body exists and is an object
    if (!body || typeof body !== 'object') {
        console.error('Response body is missing or invalid:', body);
        throw new Error('Response body is missing or invalid.');
    }

    // Locate the `schedule.elements` array
    const elementsArray = body?.schedule?.elements;
    if (!Array.isArray(elementsArray)) {
        console.error('`schedule.elements` is not found or is not an array:', elementsArray);
        throw new Error('`schedule.elements` is not found or is not an array.');
    }

    // Verify that each item in elements has a valid `episode.title` and `id`
    elementsArray.forEach((item, index) => {
        const title = item?.episode?.title; // Get the title field
        const id = item?.id; // Get the id field

        // Check if the title exists and is a non-empty string
        if (!title || typeof title !== 'string' || title.trim() === '') {
            console.error(`Item ${index + 1} has an invalid or missing title:`, item);
            throw new Error(`The title field in episode is null, empty, or invalid for schedule item ${index + 1}. Item: ${JSON.stringify(item)}`);
        }

        // Check if the id exists and is a non-empty string
        if (!id || typeof id !== 'string' || id.trim() === '') {
            console.error(`Item ${index + 1} has an invalid or missing id:`, item);
            throw new Error(`The id field in schedule item ${index + 1} is null, empty, or invalid. Item: ${JSON.stringify(item)}`);
        }

        // Log the title and id for each valid item
        console.log(`Item ${index + 1}:`);
        console.log(`  ID = ${id}`);
        console.log(`  Title = "${title}"`);
    });

    // Final confirmation log after all validation passes
    console.log('All Title fields in `schedule.elements` have a valid, non-null, and non-empty.');
});

Then('the only one episode in the list has Live field in Episode as true', function () {
    // Access the response body
    const body = this.response.body;
    if (!body || typeof body !== 'object') {
        console.error('Response body is missing or invalid:', body);
        throw new Error('Response body is missing or invalid.');
    }

    // Locate the `schedule.elements` array
    const elementsArray = body?.schedule?.elements;
    if (!Array.isArray(elementsArray)) {
        console.error('`schedule.elements` is not found or is not an array:', elementsArray);
        throw new Error('`schedule.elements` is not found or is not an array.');
    }

    // Count the number of episodes with live = true
    let liveCount = 0;
    let liveTitle = '';
    let liveId = '';

    elementsArray.forEach((item) => {
        const isLive = item?.episode?.live;
        const title = item?.episode?.title;
        const id = item?.id; // Extract the id field

        if (isLive === true) {
            liveCount++;
            liveTitle = title; // Store the title of the live episode
            liveId = id; // Store the id of the live episode
        }
    });

    // Verify only one episode has live = true
    if (liveCount === 1) {
        console.log(`Verified: Only one episode has live set to true. Title = "${liveTitle}", ID = "${liveId}"`);
    } else {
        console.error(`Failed: Expected only one episode with live set to true, but found ${liveCount}.`);
        throw new Error(`Expected only one episode with live set to true, but found ${liveCount}.`);
    }
});


Then('the Transmission_start date value is before the Transmission_end date', function () {
    // Access the response body
    const body = this.response.body;
    if (!body || typeof body !== 'object') {
        console.error('Response body is missing or invalid:', body);
        throw new Error('Response body is missing or invalid.');
    }

    // Locate the `schedule.elements` array
    const elementsArray = body?.schedule?.elements;
    if (!Array.isArray(elementsArray)) {
        console.error('`schedule.elements` is not found or is not an array:', elementsArray);
        throw new Error('`schedule.elements` is not found or is not an array.');
    }

    // Verify all schedule items and print transmission times with titles and ids
    const allValid = elementsArray.every((item, index) => {
        const transmissionStart = item?.transmission_start;
        const transmissionEnd = item?.transmission_end;
        const title = item?.episode?.title;
        const id = item?.id;

        if (!transmissionStart || !transmissionEnd) {
            console.error(`Item at index ${index} is missing transmission_start or transmission_end.`);
            throw new Error(`Item at index ${index} is missing transmission_start or transmission_end.`);
        }

        const startDate = new Date(transmissionStart);
        const endDate = new Date(transmissionEnd);

        // Check if transmission_start is before transmission_end
        const isValid = startDate < endDate;

        // If valid, print the details
        if (isValid) {
            console.log(`Item ${index + 1}:`);
            console.log(`  ID = ${id}`);
            console.log(`  Title = "${title}"`);
            console.log(`  Transmission Start = ${startDate.toISOString()}`);
            console.log(`  Transmission End = ${endDate.toISOString()}`);
            console.log('  Valid: transmission_start is before transmission_end');
        } else {
            console.error(`Item ${index + 1}:`);
            console.error(`  ID = ${id}`);
            console.error(`  Title = "${title}"`);
            console.error(`  Transmission Start = ${startDate.toISOString()}`);
            console.error(`  Transmission End = ${endDate.toISOString()}`);
            console.error('  Invalid: transmission_start is NOT before transmission_end');
        }

        return isValid;
    });

    // Print final confirmation if all items are valid
    if (allValid) {
        console.log('All schedule items have transmission_start before transmission_end.');
    } else {
        throw new Error('Not all schedule items have transmission_start before transmission_end.');
    }
});

Then('the response headers verify the Date value', function () {
    // Ensure the response object exists
    if (!this.response || !this.response.headers) {
        throw new Error('Response object or headers are missing.');
    }

    // Access the Date header
    const responseDate = this.response.headers['date'];

    // Check if the Date header exists
    if (!responseDate) {
        throw new Error('Date header is not present in the response.');
    }

    // Verify the Date format (RFC1123 format)
    const dateRegex = /^[A-Za-z]{3}, \d{2} [A-Za-z]{3} \d{4} \d{2}:\d{2}:\d{2} GMT$/;
    if (!dateRegex.test(responseDate)) {
        throw new Error(`Date header value "${responseDate}" is not in a valid RFC1123 format.`);
    }

    console.log('Date header is valid:', responseDate);
});

When('I make a GET request to "\\/api\\/RMSTest\\/ibltest\\/2023-09-11"', async function () {
    const fullUrl = 'https://testapi.io/api/RMSTest/ibltest/2023-09-11';
    console.log('Testing URL:', fullUrl);

    try {
        // Make the GET request using axios
        const response = await axios.get(fullUrl);

        // Store the response in Cucumber's context (this.response)
        this.response = response;
        console.log('Response received:', response.data);
    } catch (error) {
        // In case of an error, log it and store the error response
        console.error('Error making GET request:', error.message);

        // Store the error response structure for later assertions
        this.response = {
            status: error.response?.status || 500,  // Default to 500 if no status code is provided
            data: error.response?.data || {}        // Default to empty object if no error data is available
        };
    }
});

Then('the HTTP status code of the response is {string}', function (responseCode) {
    assert(this.response, 'Response object is undefined');
    assert.equal(this.response.status, parseInt(responseCode, 10), `Expected status code ${responseCode}, but got ${this.response.status}`);
});

Then('the error object had the properties "details" and "http_response_code"', function () {
    const { data } = this.response;

    // Log the full response to understand its structure
    console.log('Response data:', data);

    // Check if the error object has "details" and "http_response_code"'
    expect(data.error).to.have.property('details');
    expect(data.error).to.have.property('http_response_code');

});