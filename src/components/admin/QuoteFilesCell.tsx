
import { Download, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QuoteFile {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  mime_type: string | null;
}

interface QuoteFilesCellProps {
  files: QuoteFile[];
  onDownload: (filePath: string, fileName: string) => void;
}

const QuoteFilesCell = ({ files, onDownload }: QuoteFilesCellProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string | null) => {
    if (mimeType?.startsWith('image/')) {
      return <Image className="h-3 w-3" />;
    }
    return <FileText className="h-3 w-3" />;
  };

  if (!files || files.length === 0) {
    return <span className="text-muted-foreground text-sm">No files</span>;
  }

  return (
    <div className="space-y-1">
      <Badge variant="secondary" className="mb-2">
        {files.length} file{files.length !== 1 ? 's' : ''}
      </Badge>
      {files.map((file) => (
        <div key={file.id} className="flex items-center gap-2 p-2 border rounded-sm bg-muted/50">
          {getFileIcon(file.mime_type)}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate" title={file.file_name}>
              {file.file_name}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatFileSize(file.file_size)}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(file.file_path, file.file_name)}
            className="h-6 w-6 p-0"
          >
            <Download className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuoteFilesCell;
