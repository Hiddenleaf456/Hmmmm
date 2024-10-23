
export default function handler(req, res) {
  const { token } = req.headers;

  // Check if token exists and is valid (replace with real validation)
  if (token === 'fake-jwt-token') {
    // Detailed response about the dashboard
    return res.status(200).json({ 
      success: true, 
      data: {
        welcomeMessage: "Welcome to the TOXXIC TECH Dashboard!",
        description: "Your hub for managing all API interactions and monitoring usage.",
        features: [
          "🔍 API Usage Statistics: Track your API requests and performance.",
          "📊 User Activity Reports: Get insights into your API usage patterns.",
          "⚙️ API Documentation: Access comprehensive guides and references.",
          "🔒 Security Settings: Manage your API keys and permissions."
        ],
        usageStatistics: {
          totalRequests: 1200,
          activeUsers: 350,
          averageResponseTime: "150ms",
          peakUsageTime: "2 PM - 3 PM",
        },
        tips: [
          "Explore our extensive API documentation for tips on how to optimize your usage.",
          "Check out the User Activity Reports to gain insights into your API consumption.",
          "Keep your API keys secure and regenerate them if you suspect any compromise."
        ],
        resources: [
          { name: "API Documentation", url: "https://docs.toxxictech.com" },
          { name: "Support", url: "https://support.toxxictech.com" },
          { name: "Community Forum", url: "https://forum.toxxictech.com" }
        ],
      } 
    });
  }

  return res.status(403).json({ success: false, message: 'Access Denied' });
}