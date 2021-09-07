/* Amplify Params - DO NOT EDIT
	API_REACTAMPLIFIED_GRAPHQLAPIENDPOINTOUTPUT
	API_REACTAMPLIFIED_GRAPHQLAPIIDOUTPUT
	API_REACTAMPLIFIED_TODOTABLE_ARN
	API_REACTAMPLIFIED_TODOTABLE_NAME
	AUTH_REACTAMPLIFIED8BF14A148BF14A14_USERPOOLID
	ENV
	REGION
	STORAGE_TODOS_BUCKETNAME
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
