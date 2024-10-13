import React, { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface ImageCropperProps {
  imageSrc: string;
  onCropComplete: (croppedImage: string) => void; // Функция для возврата обрезанного изображения
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete }) => {
  const cropperRef = useRef<Cropper>(null); // Убедитесь, что реф инициализируется правильно
  const [cropData, setCropData] = useState<string | null>(null);

  const getCropData = () => {
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.getCroppedCanvas(); // Используйте getCroppedCanvas на cropperRef
      setCropData(croppedCanvas.toDataURL());
      onCropComplete(croppedCanvas.toDataURL()); // Передача обрезанного изображения в родительский компонент
    }
  };

  return (
    <div>
      <Cropper
        ref={cropperRef}
        src={imageSrc}
        style={{ height: 400, width: '100%' }}
        initialAspectRatio={1}
        aspectRatio={1}
        guides={false}
        crop={getCropData} // Вызов getCropData при обрезке
      />
      <button onClick={getCropData}>Сохранить обрезанное изображение</button>
      {cropData && (
        <div>
          <h2>Обрезанное изображение:</h2>
          <img src={cropData} alt='Cropped' style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
