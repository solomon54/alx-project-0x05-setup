import { ImageProps } from "@/interfaces";
import { useState } from "react";

const useFetchData = <T, R>() => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [responseData, setResponseData] = useState<T |null>(null);
    const [error, setError] = useState<string | null>(null);
    const [generatedImages, setGeneratedImage] = useState<ImageProps[] >([]);

    const fetchData = async (endpoint: string, body: R) => {
        setIsLoading(true);
        setError(null);
        try{
            const resp = await fetch(endpoint, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'contont-Type': 'application/json'
                }
            });
            if(!resp.ok){
                throw new Error('Failed to Fetch Data');
            }
            const result = await resp.json();
            setResponseData(result);
            setGeneratedImage((prev) => [...prev, {imageUrl: result?.message, prompt: body?.prompt}]);
        }catch(err){
            setError((err as Error).message)
        }finally{
            setIsLoading(false);
        }
    }
    return{
        isLoading,
        responseData,
        error,
        fetchData,
        generatedImages
    }

}

export default useFetchData;