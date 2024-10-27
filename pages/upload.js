// pages/upload.js
import { useState } from 'react';
import Link from 'next/link';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`File uploaded successfully: ${file.name}`);
        setFile(null); // Reset the file input
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setMessage('An error occurred while uploading the file.');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        Want to see your uploaded files?{' '}
        <Link href="/files">View Uploaded Files</Link>
      </p>
    </div>
  );
};

export default UploadPage;
