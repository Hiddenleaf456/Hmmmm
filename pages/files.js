// pages/files.js
import { useEffect, useState } from 'react';

const FilesPage = () => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/files');
        if (!response.ok) {
          throw new Error('Failed to fetch files');
        }
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Uploaded Files</h1>
      {error && <p>Error: {error}</p>}
      <ul>
        {files.length === 0 ? (
          <p>No files uploaded yet.</p>
        ) : (
          files.map((file) => (
            <li key={file.name}>
              <a href={file.url} download>
                {file.name}
              </a>
            </li>
          ))
        )}
      </ul>
      <p>
        Want to upload more files? <Link href="/upload">Go back to Upload</Link>
      </p>
    </div>
  );
};

export default FilesPage;
