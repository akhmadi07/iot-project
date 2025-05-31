export default async (request, context) => {
  const url = new URL(request.url);
  
  if (url.pathname.startsWith('/api/')) {
    const apiPath = url.pathname.replace('/api/', '');
    const vpsUrl = `http://203.194.114.58:1881/api/${apiPath}`;
    
    try {
      const response = await fetch(vpsUrl);
      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  return context.next();
};

export const config = {
  path: "/api/*"
};
