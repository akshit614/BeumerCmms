import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface ViewQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assetId: string;
  assetName: string | undefined;
}

export default function ViewQRDialog({ open, onOpenChange, assetId, assetName }: ViewQRDialogProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate the URL for the asset detail page
  const assetUrl = `${window.location.origin}${window.location.pathname}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(assetUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('asset-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `QR-${assetId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success('QR code downloaded!');
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Asset QR Code</DialogTitle>
          <DialogDescription>
            {assetName} ({assetId})
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6 space-y-6">
          {/* QR Code */}
          <div className="bg-white p-6 rounded-lg border-2 border-border">
            <QRCodeSVG
              id="asset-qr-code"
              value={assetUrl}
              size={200}
              level="H"
              includeMargin={false}
            />
          </div>

          {/* Asset Info */}
          <div className="text-center space-y-1">
            <p className="text-sm text-muted-foreground">Scan to view asset details</p>
            <p className="text-xs text-muted-foreground font-mono bg-muted px-3 py-1 rounded">
              {assetId}
            </p>
          </div>

          {/* URL Display */}
          <div className="w-full space-y-2">
            <label className="text-sm text-muted-foreground">Asset Link</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={assetUrl}
                readOnly
                className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-md text-foreground"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleDownloadQR}
            >
              <Download className="mr-2 h-4 w-4" />
              Download QR
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
