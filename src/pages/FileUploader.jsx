import React, { useState, useEffect } from 'react';

const FileUploader = () => {
  const [uploads, setUploads] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!paused && uploads.length > 0) {
      const currentUpload = uploads[0];
      const uploadTask = setTimeout(() => {
        currentUpload.progress = Math.min(currentUpload.progress + 10, 100);
        setUploads([...uploads]);
        if (currentUpload.progress === 100) {
          setUploadedFiles([...uploadedFiles, currentUpload]);
          setUploads(uploads.slice(1));
        }
      }, 1000);

      return () => clearTimeout(uploadTask);
    }
  }, [uploads, uploadedFiles, paused]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newUploads = files.map((file) => ({
      file,
      name: file.name,
      progress: 0,
    }));
    setUploads([...uploads, ...newUploads]);
  };

  const handlePauseResume = () => {
    setPaused(!paused);
  };

  const handleCancel = () => {
    setUploads([]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);
    const newUploads = files.map((file) => ({
      file,
      name: file.name,
      progress: 0,
    }));
    setUploads([...uploads, ...newUploads]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-gray-100 border border-gray-300 rounded">
      <div
        className="border border-dashed border-gray-300 rounded p-4 mb-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <p className="text-center text-gray-500">
          Drag and drop files here or click to select files.
        </p>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handlePauseResume}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Upload Queue</h2>
        <div className="border border-gray-300 rounded p-4">
          <ul>
            {uploads.map((upload, index) => (
              <li key={index} className="mb-2">
                {upload.name} - {upload.progress}%
                <div className="h-2 bg-blue-500 mt-1">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${upload.progress}%` }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Uploaded Files</h2>
        <div className="border border-gray-300 rounded p-4">
          <ul>
            {uploadedFiles.map((uploadedFile, index) => (
              <li key={index} className="mb-2">
                {uploadedFile.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

