import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { QrCode, Camera, CheckCircle2 } from 'lucide-react';
// import { toast } from 'sonner@2.0.3';
import AddWorkOrderDialog from './AddWorkOrderDialog';

interface QRScanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QRScanDialog({ open, onOpenChange }: QRScanDialogProps) {
  const [step, setStep] = useState<'scan' | 'create' | 'success'>('scan');
  const [scannedAssetId, setScannedAssetId] = useState('');
  const [scannedAssetName, setScannedAssetName] = useState('');
  const [showWorkOrderDialog, setShowWorkOrderDialog] = useState(false);

  const handleScan = () => {
    // Simulate QR code scan
    const assetId = 'COMP-A-001';
    const assetName = 'Compressor Unit A-1';
    setScannedAssetId(assetId);
    setScannedAssetName(assetName);
    
    // Close the QR scan dialog and open work order dialog
    onOpenChange(false);
    setShowWorkOrderDialog(true);
    
    // Reset state
    setTimeout(() => {
      setStep('scan');
    }, 300);
  };

  const handleWorkOrderDialogClose = (open: boolean) => {
    setShowWorkOrderDialog(open);
    if (!open) {
      // Reset scanned data when closing
      setScannedAssetId('');
      setScannedAssetName('');
    }
  };

  const handleDialogClose = (open: boolean) => {
    onOpenChange(open);
    if (!open) {
      setStep('scan');
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          {step === 'scan' && (
            <>
              <DialogHeader>
                <DialogTitle>Scan QR Code</DialogTitle>
                <DialogDescription>
                  Scan the asset QR code to create a work order
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <Camera className="h-24 w-24 text-muted-foreground" />
                </div>
                <Button onClick={handleScan} className="bg-blue-600 hover:bg-blue-700">
                  <QrCode className="mr-2 h-4 w-4" />
                  Simulate Scan
                </Button>
              </div>
            </>
          )}

          {step === 'success' && (
            <>
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <DialogTitle>Work Order Created!</DialogTitle>
                <DialogDescription className="text-center">
                  Your work order has been created and assigned to the maintenance team.
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AddWorkOrderDialog
        open={showWorkOrderDialog}
        onOpenChange={handleWorkOrderDialogClose}
        defaultAssetId={scannedAssetId}
        defaultAssetName={scannedAssetName}
      />
    </>
  );
}
