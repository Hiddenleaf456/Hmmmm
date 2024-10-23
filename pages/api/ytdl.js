import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { query } = req;
  const searchQuery = query.query || '';  // Default to an empty string if no query is provided

  if (req.method === 'GET') {
    try {
      // Construct the URL for the external YouTube search API with the dynamic query
      const apiUrl = `https://itzpire.com/search/youtube?query=${encodeURIComponent(searchQuery)}`;

      // Make a request to the external YouTube search API
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch from the YouTube search API');
      }

      // Relay the response, but modify the author field to "Toxxic"
      res.status(200).json({
        status: data.status,
        author: "Toxxic", // Changing the author field to "Toxxic"
        code: data.code,
        data: data.data // Assuming the external API sends data within this field
      });

    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({
        status: "error",
        author: "Toxxic",
        code: 500,
        message: error.message || 'Internal Server Error'
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      status: "error",
      author: "Toxxic",
      code: 405,
      message: `Method ${req.method} Not Allowed`
    });
  }
}
