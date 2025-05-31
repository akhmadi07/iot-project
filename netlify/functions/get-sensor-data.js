// netlify/functions/get-sensor-data.js
exports.handler = async () => {
  try {
    const API_URL = 'http://203.194.114.58:1881/api/data';
    const response = await fetch(API_URL);
    const data = await response.json();
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" })
    };
  }
};
