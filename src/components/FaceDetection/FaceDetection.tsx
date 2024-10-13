import React, { useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetection = () => {
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    loadModels();
  }, []);

  const detectFaces = async (imageElement: HTMLImageElement) => {
    const detections = await faceapi.detectAllFaces(
      imageElement,
      new faceapi.TinyFaceDetectorOptions(),
    );
    console.log(detections); // Здесь вы получите координаты bounding box'ов
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => detectFaces(img);
    }
  };

  return (
    <div>
      <input type='file' accept='image/*' onChange={handleImageUpload} />
      {/* Здесь можно добавить элемент <img> для отображения загруженного изображения */}
    </div>
  );
};

export default FaceDetection;
