
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download, Calendar, Mail, Phone, MessageSquare, Tag } from 'lucide-react';
import QuoteFilesCell from './QuoteFilesCell';

interface QuoteFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string | null;
}

interface QuoteWithFiles {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  service: string | null;
  message: string | null;
  files: QuoteFile[];
}

interface QuoteDetailsModalProps {
  quote: QuoteWithFiles | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDownload: (filePath: string, fileName: string) => void;
}

const QuoteDetailsModal = ({ quote, open, onOpenChange, onDownload }: QuoteDetailsModalProps) => {
  if (!quote) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Quote Details
            <Badge variant="outline" className="font-mono text-xs">
              {quote.id.substring(0, 8)}...
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Submitted:</span>
                  <span>{new Date(quote.created_at).toLocaleString()}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Name:</span>
                  <span>{quote.name}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Email:</span>
                  <span>{quote.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Phone:</span>
                  <span>{quote.phone}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Service:</span>
                  <Badge variant="secondary">
                    {quote.service || 'General'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Message */}
            {quote.message && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">Message:</span>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <p className="text-sm whitespace-pre-wrap">{quote.message}</p>
                </div>
              </div>
            )}

            {/* Files */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">Attached Files:</span>
              </div>
              <QuoteFilesCell files={quote.files} onDownload={onDownload} />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDetailsModal;
