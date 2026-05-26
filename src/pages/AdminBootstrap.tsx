
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle, CheckCircle, Lock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BootstrapResponse {
  success?: boolean;
  message?: string;
}

const AdminBootstrap = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [securityKey, setSecurityKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Security: Log all access attempts to this page
  useEffect(() => {
    console.log('[SECURITY] Admin bootstrap page accessed', {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      userId: user?.id || 'anonymous',
      url: window.location.href
    });
  }, [user]);

  const handleBootstrapAdmin = async () => {
    if (!user) {
      toast.error('You must be signed in to become an admin');
      return;
    }

    // Security validation
    if (!securityKey) {
      setShowKeyInput(true);
      toast.error('Security key required for admin bootstrap');
      return;
    }

    if (securityKey.length < 8) {
      toast.error('Security key must be at least 8 characters');
      return;
    }

    setLoading(true);
    
    // Enhanced security logging
    console.log('[SECURITY] Admin bootstrap attempt', {
      userId: user.id,
      email: user.email,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ipAddress: 'client-side', // Note: actual IP would be logged server-side
    });

    try {
      // Call edge function for secure bootstrap with additional validation
      const { data, error } = await supabase.functions.invoke('secure-admin-bootstrap', {
        body: {
          securityKey,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        }
      });
      
      if (error) {
        console.error('[SECURITY] Admin bootstrap failed:', error);
        toast.error(error.message || 'Bootstrap failed');
        return;
      }

      console.log('[SECURITY] Admin bootstrap result:', data);
      
      const response = data as BootstrapResponse;
      
      if (response && response.success) {
        setSuccess(true);
        toast.success('Admin access granted successfully!');
        // Refresh to update admin status
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (response && response.message) {
        toast.error(response.message);
      } else {
        toast.error('Failed to grant admin access');
      }
    } catch (err: any) {
      console.error('[SECURITY] Admin bootstrap unexpected error:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  // If user is already admin, redirect to admin page
  if (isAdmin) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="border-amber-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-amber-100 rounded-full w-fit">
              <Shield className="text-amber-600" size={32} />
            </div>
            <CardTitle className="text-xl text-amber-800">
              Secure Admin Bootstrap
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <Lock className="text-red-600" size={16} />
              <AlertDescription className="text-red-800">
                <strong>Security Notice:</strong> This is a one-time secure setup process. All attempts are logged and monitored.
              </AlertDescription>
            </Alert>

            {!user ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground text-center">
                  You must be signed in to bootstrap admin access.
                </p>
                <Button 
                  onClick={() => navigate('/auth')} 
                  className="w-full"
                  variant="outline"
                >
                  Sign In First
                </Button>
              </div>
            ) : success ? (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="text-green-600" size={16} />
                <AlertDescription className="text-green-800">
                  Admin access granted successfully! Redirecting to admin panel...
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-2">
                    Signed in as:
                  </p>
                  <p className="text-sm text-gray-600 break-all">
                    {user.email}
                  </p>
                </div>

                {showKeyInput && (
                  <div className="space-y-2">
                    <Label htmlFor="securityKey">Security Key</Label>
                    <Input
                      id="securityKey"
                      type="password"
                      value={securityKey}
                      onChange={(e) => setSecurityKey(e.target.value)}
                      placeholder="Enter security key"
                      className="border-amber-300"
                    />
                    <p className="text-xs text-gray-600">
                      Contact system administrator for the security key
                    </p>
                  </div>
                )}

                <Alert className="border-blue-200 bg-blue-50">
                  <AlertDescription className="text-blue-800 text-sm">
                    This function can only be used once when no admin users exist. All access attempts are logged for security purposes.
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handleBootstrapAdmin}
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-700"
                >
                  {loading ? 'Verifying Access...' : 'Request Admin Access'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminBootstrap;
