import React, { useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import ImageCropper from '../ImageCropper/ImageCropper'; // Импортируйте ваш компонент ImageCropper

const FaceDetection = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [detections, setDetections] = useState<any[]>([]);
  const [showCropper, setShowCropper] = useState<boolean>(false); // Состояние для управления отображением Cropper

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
    };

    loadModels();
  }, []);

  const detectFaces = async (imageElement: HTMLImageElement) => {
    const detectedFaces = await faceapi.detectAllFaces(
      imageElement,
      new faceapi.TinyFaceDetectorOptions(),
    );
    setDetections(detectedFaces);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = document.createElement('img');
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageSrc(img.src);
        detectFaces(img);
        setShowCropper(true); // Показываем Cropper после загрузки изображения
      };
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    // Здесь вы можете сохранить обрезанное изображение или использовать его в дальнейшем
    console.log('Обрезанное изображение:', croppedImage);
    setShowCropper(false); // Скрываем Cropper после обрезки
  };

  return (
    <div>
      <input type='file' accept='image/*' onChange={handleImageUpload} />
      {showCropper && imageSrc && (
        <ImageCropper imageSrc={imageSrc} onCropComplete={handleCropComplete} />
      )}
      {/* Здесь можно добавить код для отображения bounding box'ов и других функций */}
    </div>
  );
};

export default FaceDetection;
