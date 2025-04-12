"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { FaQrcode, FaKeyboard, FaCameraRetro, FaInfoCircle } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import jsQR from 'jsqr';

const ScanOrSearchPage = () => {
  const [activeTab, setActiveTab] = useState<'scan' | 'code'>('scan');
  const [codeInput, setCodeInput] = useState('');
  const [scanError, setScanError] = useState('');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
 
  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        if (navigator.permissions) {
          const permissionStatus = await navigator.permissions.query({
            name: 'camera' as any
          });
          setHasPermission(permissionStatus.state === 'granted');
          
          permissionStatus.onchange = () => {
            setHasPermission(permissionStatus.state === 'granted');
          };
        } else {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          setHasPermission(true);
        }
      } catch (error) {
        setHasPermission(false);
      }
    };

    checkCameraPermission();
  }, []);
 
  useEffect(() => {
    if (activeTab !== 'scan') return;
    let stream: MediaStream | null = null;
    let animationFrameId: number;
    const scanQRCode = () => {
      if (!videoRef.current || !canvasRef.current || 
          videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
        animationFrameId = requestAnimationFrame(scanQRCode);
        return;
      }
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (!context) return;
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        setScanResult(code.data);
        handleCodeDetected(code.data);
        return;
      }
      animationFrameId = requestAnimationFrame(scanQRCode);
    };

    const initScanner = async () => {
      try {
        setIsScanning(true);
        setScanError('');
        setScanResult('');
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
          animationFrameId = requestAnimationFrame(scanQRCode);
        }
      } catch (err) {
        console.error('Camera error:', err);
        setIsScanning(false);
        setHasPermission(false);
        if (err.name === 'NotAllowedError') {
          setScanError('Camera access was denied. Please enable camera permissions in your browser settings.');
        } else if (err.name === 'NotFoundError') {
          setScanError('No camera device found. Please check your device has a camera.');
        } else if (err.name === 'NotReadableError') {
          setScanError('Camera is already in use by another application.');
        } else if (err.name === 'OverconstrainedError') {
          setScanError('Camera constraints could not be satisfied. Try a different device.');
        } else {
          setScanError('Could not access camera. Please check browser settings and try again.');
        }
      }
    };

    if (hasPermission !== false) {
      initScanner();
    }

    return () => {
      setIsScanning(false);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab, hasPermission]);

  const handleCodeDetected = (code: string) => {
    router.push(`/participant/${encodeURIComponent(code)}`);
  };

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeInput.trim()) return;
    handleCodeDetected(codeInput.trim());
  };

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setHasPermission(true);
        setActiveTab('scan');
      }
    } catch (err) {
      console.error('Failed to get camera access:', err);
      setScanError('Failed to get camera access. Please ensure your browser has camera permissions.');
    }
  };

  return (
    <div className="min-h-screen p-4 mt-24">
      <div className="mx-auto max-w-md rounded-xl bg-dark-card-bg-light p-6 shadow-lg">
        <p className="mb-6 text-center text-2xl font-bold text-secondary-200">
          Participant Lookup
        </p>

        
        <div className="mb-6 flex border-b border-primary-600">
          <button
            className={`flex-1 py-2 font-medium ${activeTab === 'scan' ? 'border-b-2 border-primary-400 text-primary-300' : 'text-secondary-200'}`}
            onClick={() => setActiveTab('scan')}
          >
            <div className="flex items-center justify-center gap-2">
              <FaQrcode />
              Scan QR Code
            </div>
          </button>
          <button
            className={`flex-1 py-2 font-medium ${activeTab === 'code' ? 'border-b-2 border-primary-400 text-primary-300' : 'text-secondary-200'}`}
            onClick={() => setActiveTab('code')}
          >
            <div className="flex items-center justify-center gap-2">
              <FaKeyboard />
              Enter Code
            </div>
          </button>
        </div>

        
        {activeTab === 'scan' && (
          <div className="space-y-4">
            {hasPermission === false ? (
              <div className="space-y-4 text-center">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black flex flex-col items-center justify-center p-4">
                  <QRCodeSVG 
                    value="camera_access_required" 
                    size={128}
                    level="H"
                    bgColor="transparent"
                    className="opacity-20 mb-4"
                  />
                  <div className="bg-primary-600/20 p-4 rounded-lg max-w-full">
                    <FaInfoCircle className="mx-auto text-primary-300 text-2xl mb-2" />
                    <p className="text-white mb-4">{scanError || 'Camera access is required to scan QR codes'}</p>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={requestCameraAccess}
                        className="flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-4 py-2 font-medium text-white hover:bg-primary-400"
                      >
                        <FaCameraRetro />
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="h-full w-full object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-64 w-64 border-4 border-primary-400 opacity-50"></div>
                  </div>
                  {isScanning && !scanResult && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-pulse text-white text-lg bg-black bg-opacity-50 px-4 py-2 rounded-full">
                        Scanning...
                      </div>
                    </div>
                  )}
                  {scanResult && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
                      <div className="text-white text-lg bg-primary-500 px-4 py-2 rounded-full">
                        Found: {scanResult.substring(0, 20)}...
                      </div>
                    </div>
                  )}
                </div>
                {scanError && (
                  <div className="rounded-lg bg-primary-600 p-3 text-center text-white">
                    {scanError}
                  </div>
                )}
              </>
            )}
            <p className="text-center text-secondary-200">
              Point your camera at a participant's QR code
            </p>
          </div>
        )}

        
        {activeTab === 'code' && (
          <form onSubmit={handleSubmitCode} className="space-y-4">
            <div>
              <label htmlFor="code" className="mb-1 block text-sm font-medium text-secondary-200">
                Enter Participant Code
              </label>
              <input
                type="text"
                id="code"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="w-full rounded-lg border border-primary-600 bg-dark-card-bg-dark px-4 py-2 text-white focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="e.g. sahat8536"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={!codeInput.trim()}
              className={`w-full rounded-lg py-2 font-medium ${codeInput.trim() ? 'bg-primary-500 text-white hover:bg-primary-400' : 'cursor-not-allowed bg-primary-700 text-primary-300'}`}
            >
              Lookup Participant
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ScanOrSearchPage;