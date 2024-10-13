// import React, { useState } from 'react';
// import ImageUploader from './components/ImageUploader/ImageUploader';
import FaceDetection from './components/FaceDetection/FaceDetection';

const App: React.FC = () => {
  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const handleImageUpload = (files: File[]) => {
  //   const file = files[0];
  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file);
  //     setSelectedImage(imageUrl);
  //   }
  // };

  return (
    <div>
      {/* <h1>Photo Editor</h1>
      <ImageUploader onImageUpload={handleImageUpload} />
      {selectedImage && (
        <div>
          <h2>Загруженное изображение:</h2>
          <img src={selectedImage} alt='Uploaded' style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )} */}
      <div>
        <h1>Редактор фотографий с обнаружением лиц</h1>
        <FaceDetection />
      </div>
    </div>
  );
};

export default App;
