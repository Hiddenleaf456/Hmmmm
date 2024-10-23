
export default function ApiDocs() {
  return (
    <div>
      <header>
        <nav>
          <h1>Toxxic Tech API</h1>
          <ul>
            <li><a href="#overview">Overview</a></li>
            <li><a href="#authentication">Authentication</a></li>
            <li><a href="#endpoints">API Endpoints</a></li>
            <li><a href="#examples">Examples</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="overview">
          <h2>Overview</h2>
          <p>Welcome to the Toxxic Tech API. This API allows you to integrate our services into your applications. You can fetch data, create new entries, and more.</p>
        </section>

        <section id="authentication">
          <h2>Authentication</h2>
          <p>To use this API, you'll need an API key. Include it in your requests as a header:</p>
          <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
        </section>

        <section id="endpoints">
          <h2>API Endpoints</h2>

          <article>
            <h3>GET /api/v1/data</h3>
            <p>Fetches a list of data from the database.</p>
            <pre><code>GET https://api.toxxictech.com/v1/data</code></pre>
            <p><strong>Response:</strong></p>
            <pre><code>{
  "data": [
      { "id": 1, "name": "Example 1" },
      { "id": 2, "name": "Example 2" }
  ]
}</code></pre>
          </article>

          <article>
            <h3>POST /api/v1/create</h3>
            <p>Creates a new entry in the database.</p>
            <pre><code>POST https://api.toxxictech.com/v1/create</code></pre>
            <p><strong>Request Body:</strong></p>
            <pre><code>{
  "name": "New Entry"
}</code></pre>
            <p><strong>Response:</strong></p>
            <pre><code>{
  "message": "Entry created successfully",
  "entryId": 123
}</code></pre>
          </article>
        </section>

        <section id="examples">
          <h2>Examples</h2>
          <p>Here are some common examples for using the API:</p>

          <article>
            <h3>Fetching Data</h3>
            <pre><code>fetch('https://api.toxxictech.com/v1/data', {
  method: 'GET',
  headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
  }
}).then(response => response.json())
  .then(data => console.log(data));</code></pre>
          </article>

          <article>
            <h3>Creating an Entry</h3>
            <pre><code>fetch('https://api.toxxictech.com/v1/create', {
  method: 'POST',
  headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify({
      name: 'New Entry'
  })
}).then(response => response.json())
  .then(data => console.log(data));</code></pre>
          </article>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Toxxic Tech Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
