
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { logAdminAction, logSecurityEvent } from '@/utils/security';
import { toast } from 'sonner';

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

interface SecurityMetrics {
  totalQuotes: number;
  quotesToday: number;
  suspiciousActivity: number;
  failedUploads: number;
}

export const useAdminQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteWithFiles[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<QuoteWithFiles[]>([]);
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetrics>({
    totalQuotes: 0,
    quotesToday: 0,
    suspiciousActivity: 0,
    failedUploads: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');
  const { user, isAdmin } = useAuth();

  const fetchQuotes = async () => {
    if (!user || !isAdmin) return;

    try {
      setLoading(true);
      
      // Fetch quotes with files using a more complex query
      const { data: quotesData, error: quotesError } = await supabase
        .from('quotes')
        .select(`
          id,
          created_at,
          name,
          email,
          phone,
          service,
          message
        `)
        .order('created_at', { ascending: false });

      if (quotesError) throw quotesError;

      // Fetch all files for all quotes
      const { data: filesData, error: filesError } = await supabase
        .from('quote_files')
        .select('*')
        .order('created_at', { ascending: false });

      if (filesError) throw filesError;

      // Combine quotes with their files
      const quotesWithFiles: QuoteWithFiles[] = (quotesData || []).map(quote => ({
        ...quote,
        files: (filesData || []).filter(file => file.quote_id === quote.id)
      }));

      setQuotes(quotesWithFiles);
      setFilteredQuotes(quotesWithFiles);
      
      logSecurityEvent({
        userId: user?.id,
        action: 'ADMIN_QUOTES_FETCHED',
        metadata: { quotesCount: quotesWithFiles.length, filesCount: filesData?.length || 0 }
      });
    } catch (error: any) {
      console.error('Error fetching quotes:', error);
      toast.error('Failed to fetch quotes');
    } finally {
      setLoading(false);
    }
  };

  const fetchSecurityMetrics = async () => {
    try {
      const { data: allQuotes } = await supabase
        .from('quotes')
        .select('created_at');

      const today = new Date().toISOString().split('T')[0];
      const quotesToday = allQuotes?.filter(q => 
        q.created_at.startsWith(today)
      ).length || 0;

      setSecurityMetrics({
        totalQuotes: allQuotes?.length || 0,
        quotesToday,
        suspiciousActivity: 0,
        failedUploads: 0
      });
    } catch (error) {
      console.error('Error fetching security metrics:', error);
    }
  };

  const deleteQuote = async (id: string) => {
    if (!user || !isAdmin) {
      toast.error('Unauthorized');
      return false;
    }

    logAdminAction(user.id, 'DELETE_QUOTE', 'quotes', id, {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });

    try {
      const { error } = await supabase
        .from('quotes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Quote deleted successfully');
      logSecurityEvent({
        userId: user.id,
        action: 'ADMIN_QUOTE_DELETED',
        resourceId: id,
        severity: 'medium'
      });
      
      await fetchQuotes();
      await fetchSecurityMetrics();
      return true;
    } catch (error: any) {
      console.error('[Admin] Error deleting quote:', error);
      logSecurityEvent({
        userId: user.id,
        action: 'ADMIN_DELETE_FAILED',
        resourceId: id,
        metadata: { error: error.message },
        severity: 'high'
      });
      toast.error('Failed to delete quote');
      return false;
    }
  };

  const downloadFile = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase
        .storage
        .from('quote-photos')
        .download(filePath);

      if (error) throw error;

      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);

      logSecurityEvent({
        userId: user?.id,
        action: 'ADMIN_FILE_DOWNLOADED',
        metadata: { fileName, filePath }
      });
    } catch (error: any) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const filterQuotes = () => {
    let filtered = quotes;

    if (searchTerm) {
      filtered = filtered.filter(quote =>
        quote.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.phone.includes(searchTerm) ||
        (quote.message && quote.message.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (serviceFilter) {
      filtered = filtered.filter(quote => quote.service === serviceFilter);
    }

    setFilteredQuotes(filtered);
  };

  useEffect(() => {
    if (user && isAdmin) {
      logAdminAction(user.id, 'ACCESS_PANEL', 'admin_panel');
      fetchQuotes();
      fetchSecurityMetrics();
    }
  }, [user, isAdmin]);

  useEffect(() => {
    filterQuotes();
  }, [searchTerm, serviceFilter, quotes]);

  return {
    quotes: filteredQuotes,
    securityMetrics,
    loading,
    searchTerm,
    setSearchTerm,
    serviceFilter,
    setServiceFilter,
    deleteQuote,
    downloadFile,
    refetch: fetchQuotes
  };
};
