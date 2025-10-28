import { useState, useEffect } from "react";
import { getAssetUrl } from "@/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function LazyImage({ src, alt, className }: LazyImageProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const url = await getAssetUrl(src);
        setImageUrl(url);
      } catch (error) {
        console.warn(`Failed to load image: ${src}`);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src]);

  if (isLoading) {
    return <div className={className} />;
  }

  return imageUrl ? <img src={imageUrl} alt={alt} className={className} /> : null;
}
