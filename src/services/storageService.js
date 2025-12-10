import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

// Configuration flag - Set to false to use real Firebase Storage
const USE_SIMULATION = true;

/**
 * Uploads a file to storage (or simulates it)
 * @param {File} file - The file to upload
 * @param {string} path - The storage path (e.g., 'products/images')
 * @param {function} onProgress - Callback for upload progress (0-100)
 * @returns {Promise<string>} - The download URL
 */
export const uploadFile = (file, path, onProgress) => {
    return new Promise((resolve, reject) => {
        if (USE_SIMULATION) {
            simulateUpload(file, onProgress, resolve);
        } else {
            uploadToFirebase(file, path, onProgress, resolve, reject);
        }
    });
};

/**
 * Simulates a large file upload with realistic progress
 */
const simulateUpload = (file, onProgress, resolve) => {
    let progress = 0;
    const totalSize = file.size;
    // Calculate speed based on file size to make it look realistic
    // Larger files take longer
    const chunkSpeed = totalSize > 5 * 1024 * 1024 ? 2 : 10; // Slower for > 5MB

    const interval = setInterval(() => {
        progress += Math.random() * chunkSpeed;
        if (progress > 100) progress = 100;

        if (onProgress) onProgress(Math.round(progress));

        if (progress === 100) {
            clearInterval(interval);
            // Return a local object URL for immediate preview
            // Note: In a real app, this URL expires when the session ends
            const url = URL.createObjectURL(file);
            setTimeout(() => resolve(url), 500); // Small delay at 100%
        }
    }, 200);
};

/**
 * Uploads to real Firebase Storage
 */
const uploadToFirebase = (file, path, onProgress, resolve, reject) => {
    try {
        const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                if (onProgress) onProgress(Math.round(progress));
            },
            (error) => {
                console.error("Upload error:", error);
                reject(error);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                resolve(downloadURL);
            }
        );
    } catch (error) {
        reject(error);
    }
};
