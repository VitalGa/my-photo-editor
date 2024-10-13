import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onImageUpload: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Вызываем функцию обратного вызова при загрузке изображения
      onImageUpload(acceptedFiles);
    },
    [onImageUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        cursor: 'pointer',
      }}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Отпустите файл сюда...</p>
      ) : (
        <p>Перетащите сюда файл или нажмите для выбора файла</p>
      )}
    </div>
  );
};

export default ImageUploader;
