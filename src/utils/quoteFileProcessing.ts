import imageCompression from 'browser-image-compression';

const TARGET_MAX_BYTES = 1.2 * 1024 * 1024;
const FALLBACK_MAX_BYTES = 8 * 1024 * 1024;
const MAX_DIMENSIONS = [1600, 1280, 1024];
const JPEG_QUALITIES = [0.82, 0.74, 0.66, 0.58];

const COMPRESSED_PHOTO_OPTIONS = {
  maxSizeMB: 1.2,
  maxWidthOrHeight: 1600,
  useWebWorker: false,
  fileType: 'image/jpeg' as const,
  initialQuality: 0.82,
};

const imageTypeByExtension: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  heic: 'image/heic',
  heif: 'image/heif',
};

const getExtension = (fileName: string) => fileName.split('.').pop()?.toLowerCase() ?? '';

const inferImageType = (file: File) => file.type || imageTypeByExtension[getExtension(file.name)] || '';

const isHeicPhoto = (file: File) => {
  const type = inferImageType(file).toLowerCase();
  const extension = getExtension(file.name);
  return type === 'image/heic' || type === 'image/heif' || extension === 'heic' || extension === 'heif';
};

const toJpegFileName = (fileName: string) => {
  const cleaned = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const baseName = cleaned.replace(/\.[^.]+$/, '') || 'quote-photo';
  return `${baseName}.jpg`;
};

const withInferredType = (file: File) => {
  const inferredType = inferImageType(file);
  return file.type || !inferredType
    ? file
    : new File([file], file.name, { type: inferredType, lastModified: file.lastModified || Date.now() });
};

const isPreparedQuotePhoto = (file: File) => {
  return file.type === 'image/jpeg' && /\.jpe?g$/i.test(file.name) && file.size > 0 && file.size <= TARGET_MAX_BYTES;
};

const loadImageFromFile = (file: File) => new Promise<HTMLImageElement>((resolve, reject) => {
  const url = URL.createObjectURL(file);
  const image = new Image();

  image.onload = () => {
    URL.revokeObjectURL(url);
    resolve(image);
  };

  image.onerror = () => {
    URL.revokeObjectURL(url);
    reject(new Error(`Could not load ${file.name} as an image.`));
  };

  image.src = url;
});

const canvasToJpegBlob = (canvas: HTMLCanvasElement, quality: number) => new Promise<Blob>((resolve, reject) => {
  canvas.toBlob((blob) => {
    if (!blob || blob.size === 0) {
      reject(new Error('Canvas produced an empty image.'));
      return;
    }
    resolve(blob);
  }, 'image/jpeg', quality);
});

const compressWithCanvas = async (file: File, originalName: string): Promise<File> => {
  const image = await loadImageFromFile(file);
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;

  if (!sourceWidth || !sourceHeight) {
    throw new Error(`Could not read dimensions for ${file.name}.`);
  }

  let bestFile: File | null = null;

  for (const maxDimension of MAX_DIMENSIONS) {
    const scale = Math.min(1, maxDimension / Math.max(sourceWidth, sourceHeight));
    const width = Math.max(1, Math.round(sourceWidth * scale));
    const height = Math.max(1, Math.round(sourceHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Image compression is not available in this browser.');
    }

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    for (const quality of JPEG_QUALITIES) {
      const blob = await canvasToJpegBlob(canvas, quality);
      const compressedFile = new File([blob], toJpegFileName(originalName), {
        type: 'image/jpeg',
        lastModified: file.lastModified || Date.now(),
      });

      if (!bestFile || compressedFile.size < bestFile.size) {
        bestFile = compressedFile;
      }

      if (compressedFile.size <= TARGET_MAX_BYTES) {
        return compressedFile;
      }
    }
  }

  if (!bestFile) {
    throw new Error(`Could not compress ${file.name}.`);
  }

  return bestFile;
};

const compressWithLibrary = async (file: File, originalName: string): Promise<File> => {
  const compressedBlob = await imageCompression(file, COMPRESSED_PHOTO_OPTIONS);
  const compressedFile = new File([compressedBlob], toJpegFileName(originalName), {
    type: 'image/jpeg',
    lastModified: file.lastModified || Date.now(),
  });

  if (compressedFile.size <= 0) {
    throw new Error(`${file.name} compressed to an empty file.`);
  }

  return compressedFile;
};

const convertHeicToJpeg = async (file: File): Promise<File> => {
  const { default: heic2any } = await import('heic2any');
  const jpegBlob = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.82 });
  const blob = Array.isArray(jpegBlob) ? jpegBlob[0] : jpegBlob;

  if (!blob || blob.size === 0) {
    throw new Error(`${file.name} could not be converted. Please choose another photo.`);
  }

  return new File([blob], toJpegFileName(file.name), {
    type: 'image/jpeg',
    lastModified: file.lastModified || Date.now(),
  });
};

const normalisePhotoFile = async (file: File): Promise<File> => {
  const typedFile = withInferredType(file);
  const fileType = inferImageType(typedFile).toLowerCase();

  if (!fileType.startsWith('image/')) {
    throw new Error(`${file.name} is not a photo. Please upload image files only.`);
  }

  if (isPreparedQuotePhoto(typedFile)) {
    return typedFile;
  }

  const sourceFile = isHeicPhoto(typedFile) ? await convertHeicToJpeg(typedFile) : typedFile;

  try {
    const compressedFile = await compressWithCanvas(sourceFile, file.name);

    if (sourceFile.type === 'image/jpeg' && compressedFile.size > sourceFile.size) {
      return new File([sourceFile], toJpegFileName(file.name), {
        type: 'image/jpeg',
        lastModified: sourceFile.lastModified || Date.now(),
      });
    }

    return compressedFile;
  } catch (error) {
    console.warn('[quoteFileProcessing] Canvas compression failed, trying fallback compressor:', error);

    try {
      const fallbackFile = await compressWithLibrary(sourceFile, file.name);
      if (sourceFile.type === 'image/jpeg' && fallbackFile.size > sourceFile.size) {
        return new File([sourceFile], toJpegFileName(file.name), {
          type: 'image/jpeg',
          lastModified: sourceFile.lastModified || Date.now(),
        });
      }
      return fallbackFile;
    } catch (fallbackError) {
      console.warn('[quoteFileProcessing] Fallback compression failed:', fallbackError);

      if (sourceFile.size > 0 && sourceFile.size <= FALLBACK_MAX_BYTES && ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'].includes(sourceFile.type)) {
        return sourceFile.type === 'image/jpeg'
          ? new File([sourceFile], toJpegFileName(file.name), {
              type: 'image/jpeg',
              lastModified: sourceFile.lastModified || Date.now(),
            })
          : sourceFile;
      }
    }

    throw new Error(`Failed to process file: ${file.name}`);
  }
};

export const processQuoteFiles = async (files: File[]): Promise<File[]> => {
  if (files.length > 10) {
    throw new Error('You can upload a maximum of 10 photos per quote.');
  }

  const processedFiles: File[] = [];

  for (const file of files) {
    if (!(file instanceof File) || file.size === 0) {
      throw new Error(`${file?.name || 'Selected photo'} appears to be empty. Please choose the photo again.`);
    }

    processedFiles.push(await normalisePhotoFile(file));
  }

  return processedFiles;
};

export const formatQuoteFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10 * 1024 ? 1 : 0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
};