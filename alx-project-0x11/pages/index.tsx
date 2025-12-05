import ImageCard from "@/components/common/ImageCard";
import { ImageProps } from "@/interfaces";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [generatedImages, setGeneratedImages] = useState<ImageProps[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false)


  const handleGenerateImage = async () => {
    setIsLoading(true);
    const resp = await fetch('/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({
        prompt
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })


    if (!resp.ok) {
      setIsLoading(false)
      return;
    }

    const data = await resp.json()
    setIsLoading(false)
    setImageUrl(data?.message);
    setGeneratedImages((prev) => [...prev, { imageUrl: data?.message, prompt }])
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-linear-to-r from-green-600 to-indigo-700 p-4">
      <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-300"> Image Generation App</h1>
      <p className="text-lg text-gray-200 mb-4"> Generating stuning images based on your prompts!</p>
      <div>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt here..." className="w-full p-3 border-red-400 rounded-lg mb-4 text-gray-300"/>
        <button onClick={handleGenerateImage} className="w-full p-3 bg-linear-to-r from bg-indigo-600 to-red-600 text-white rounded-lg hover:bg-blue-700  font-semibold hover:scale-103 active:scale-100 transition duration-300"> 
          {isLoading ? 'Loading...': 'Generate Image'}
       </button>
      </div>

      {imageUrl && <ImageCard action={() => setImageUrl(imageUrl)} imageUrl={imageUrl} prompt={prompt}/>}
    </div>
      {
        generatedImages.length ? (
          <div className="">
            <h3 className="text-xl text-center mb-4">Generated Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 border max-w-full md:max-w-[1100px] p-2 overflow-y-scroll h-96">
              {generatedImages?.map(
                ({ imageUrl, prompt }: ImageProps, index) => (
                  <ImageCard
                    action={() => setImageUrl(imageUrl)}
                    imageUrl={imageUrl}
                    prompt={prompt}
                    key={index}
                    width="w-full"
                    height="h-40"
                  />
                )
              )}
            </div>
          </div>

        ) : ""
      }
    </div>
  );
};

export default Home;
