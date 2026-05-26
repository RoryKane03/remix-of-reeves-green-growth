
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Trash2, Shield, AlertTriangle, Activity, Eye, FileText } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from "@/components/ui/badge";
import { useAdminQuotes } from '@/hooks/useAdminQuotes';
import QuoteFilesCell from '@/components/admin/QuoteFilesCell';
import QuoteDetailsModal from '@/components/admin/QuoteDetailsModal';
import AdminFilters from '@/components/admin/AdminFilters';

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

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [selectedQuote, setSelectedQuote] = useState<QuoteWithFiles | null>(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const {
    quotes,
    securityMetrics,
    loading,
    searchTerm,
    setSearchTerm,
    serviceFilter,
    setServiceFilter,
    deleteQuote,
    downloadFile
  } = useAdminQuotes();

  if (!user || !isAdmin) {
    navigate('/auth');
    return null;
  }

  const handleDeleteQuote = async (id: string) => {
    if (!confirm('Are you sure you want to delete this quote? This action cannot be undone.')) {
      return;
    }
    await deleteQuote(id);
  };

  const handleViewDetails = (quote: QuoteWithFiles) => {
    setSelectedQuote(quote);
    setDetailsModalOpen(true);
  };

  const truncateMessage = (message: string | null, maxLength: number = 50) => {
    if (!message) return 'No message';
    return message.length > maxLength ? `${message.substring(0, maxLength)}...` : message;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-center">
          <div className="text-lg">Loading admin panel...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Admin Panel</h1>
        <Badge variant="outline" className="flex items-center gap-2">
          <Shield size={16} />
          Secure Admin Access
        </Badge>
      </div>

      {/* Security Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quotes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.totalQuotes}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Quotes</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.quotesToday}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {quotes.filter(q => q.files.length > 0).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityMetrics.suspiciousActivity}</div>
          </CardContent>
        </Card>
      </div>

      {/* Security Notice */}
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          All admin actions are logged and monitored for security purposes. User data is handled according to privacy policies.
        </AlertDescription>
      </Alert>

      {/* Search and Filters */}
      <AdminFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        serviceFilter={serviceFilter}
        onServiceFilterChange={setServiceFilter}
      />

      {/* Results Summary */}
      {(searchTerm || serviceFilter) && (
        <div className="text-sm text-muted-foreground">
          Showing {quotes.length} of {securityMetrics.totalQuotes} quotes
          {searchTerm && ` matching "${searchTerm}"`}
          {serviceFilter && ` filtered by "${serviceFilter}"`}
        </div>
      )}

      {/* Quotes Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quote Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Recent quote submissions with enhanced monitoring and file management.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Files</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-mono text-xs">
                    {quote.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="font-medium">{quote.name}</TableCell>
                  <TableCell>{quote.email}</TableCell>
                  <TableCell>{quote.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {quote.service || 'General'}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    <span className="text-sm text-muted-foreground">
                      {truncateMessage(quote.message)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[250px]">
                    <QuoteFilesCell files={quote.files} onDownload={downloadFile} />
                  </TableCell>
                  <TableCell>{new Date(quote.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(quote)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {quotes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || serviceFilter ? 'No quotes match your filters.' : 'No quotes found.'}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quote Details Modal */}
      <QuoteDetailsModal
        quote={selectedQuote}
        open={detailsModalOpen}
        onOpenChange={setDetailsModalOpen}
        onDownload={downloadFile}
      />
    </div>
  );
};

export default Admin;
