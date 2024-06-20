// import { useCallback, useEffect, useState } from 'react';
// import { FileWithPath, useDropzone } from 'react-dropzone';
// import { Button } from '../ui/button';
// import { useUploadImage } from '@/lib/react-query/QueriesAndMutatins';

// type FileUpLoaderProps = {
//   fieldChange: (FILES: File[]) => void;
//   mediaUrl: string;
// };

// type FileWithPreview = File & {
//   preview: string;
// };

// const FileUpLoader = ({ fieldChange, mediaUrl }: FileUpLoaderProps) => {
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState(mediaUrl);
//   const uploadImageMutation = useUploadImage();

//   console.log('file:', file);
//   console.log('media Url:', mediaUrl);

//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       if (acceptedFiles.length > 0) {
//         const filesWithPreview: FileWithPreview[] = acceptedFiles.map(file =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           }),
//         );
//         setFile(filesWithPreview);
//         fieldChange(acceptedFiles);
//         previewImage(acceptedFiles[0]);
//         handleUpload(acceptedFiles[0]);
//       }
//     },

//     [fieldChange],
//   );

//   useEffect(() => {
//     return () => {
//       file.forEach(file =>
//         URL.revokeObjectURL((file as FileWithPreview).preview),
//       );
//     };
//   }, [file]);

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       'image/*': ['.png', '.jpg', '.jpeg', '.svg'],
//     },
//   });

//   const previewImage = (file: File) => {
//     const fileObjectUrl = URL.createObjectURL(file);
//     setFileUrl(fileObjectUrl);
//     return () => {
//       URL.revokeObjectURL(fileObjectUrl);
//     };
//   };

//   const handleUpload = async (file: File) => {
//     try {
//       if (!file) {
//         console.log('No file selected');
//       }
//       const formData = new FormData();
//       formData.append('image', file);
//       const response = await uploadImageMutation.mutateAsync(
//         { formData },
//         {
//           onSuccess: () => {
//             console.log('Image uploaded successfully');
//           },
//           onError: (error: Error) => {
//             console.log('Error uploading image:' + error.message);
//           },
//         },
//       );

//       const uploadedFileUrl = response.data;
//       setFileUrl(uploadedFileUrl);
//       console.log('uploadedFileUrl:', uploadedFileUrl);
//       return uploadedFileUrl;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//     }
//     return fileUrl;
//   };

//   console.log('fileUrl:', fileUrl);

//   return (
//     <div
//       {...getRootProps()}
//       className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
//     >
//       <input
//         {...getInputProps()}
//         id="fileInput"
//         type="file"
//         formMethod="POST"
//         name="image"
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//           const selectedFile = e.target.files?.[0];
//           console.log('selectedFile:', selectedFile);
//           if (selectedFile) {
//             setFile([selectedFile]);
//             fieldChange([selectedFile]);
//             previewImage(selectedFile);
//             handleUpload(selectedFile);
//           }
//         }}
//         className="cursor-pointer"
//       />

//       {fileUrl ? (
//         <>
//           <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
//             <img
//               src={fileUrl}
//               alt="image-preview"
//               loading="lazy"
//               className="file_uploader-img"
//             />
//           </div>
//           <p className="file_uploader-label">Click or drag photo to replace</p>
//         </>
//       ) : (
//         <div className="file_uploader-box">
//           <img
//             src="/assets/icons/file-upload.svg"
//             alt="file-upload"
//             loading="lazy"
//             width={96}
//             height={77}
//           />
//           <h3 className="base-medium text-light-2 mb-2 mt-6">
//             Drag photo here
//           </h3>
//           <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
//           <Button
//             type="button"
//             onClick={e => {
//               e.stopPropagation();
//               document.getElementById('fileInput')?.click();
//               handleUpload;
//             }}
//             className="shad-button_dark_4"
//           >
//             Browse Files
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpLoader;
