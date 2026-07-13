import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, RefreshCw, ExternalLink, Shield } from 'lucide-react';

interface Counts {
  today: number;
  week: number;
  month: number;
  all: number;
}

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
};
const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

const AdminAnalytics = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const base = () =>
        supabase.from('phone_clicks').select('*', { count: 'exact', head: true });

      const [allRes, monthRes, weekRes, todayRes] = await Promise.all([
        base(),
        base().gte('created_at', daysAgo(30)),
        base().gte('created_at', daysAgo(7)),
        base().gte('created_at', startOfToday()),
      ]);

      if (allRes.error) throw allRes.error;

      setCounts({
        all: allRes.count ?? 0,
        month: monthRes.count ?? 0,
        week: weekRes.count ?? 0,
        today: todayRes.count ?? 0,
      });
      setLastUpdated(new Date());
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load analytics';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user || !isAdmin) {
      navigate('/auth');
      return;
    }
    load();
  }, [authLoading, user, isAdmin, navigate, load]);

  if (authLoading || !user || !isAdmin) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center text-muted-foreground">Loading…</div>
      </div>
    );
  }

  const stats: { label: string; value: number | undefined; hint: string }[] = [
    { label: 'Today', value: counts?.today, hint: 'Since midnight' },
    { label: 'Last 7 days', value: counts?.week, hint: 'Rolling week' },
    { label: 'Last 30 days', value: counts?.month, hint: 'Rolling month' },
    { label: 'All-time', value: counts?.all, hint: 'Since tracking started' },
  ];

  return (
    <div className="container mx-auto py-10 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-semibold flex items-center gap-2">
            <Phone className="h-7 w-7" /> Call Click Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every tap on a "Call" button across the website is logged here.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="flex items-center gap-1">
            <Shield size={14} /> Admin only
          </Badge>
          <Button onClick={load} disabled={loading} variant="outline" size="sm">
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6 text-sm text-destructive">{error}</CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-semibold">
                {loading && s.value === undefined ? '—' : (s.value ?? 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{s.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        {lastUpdated
          ? `Last updated ${lastUpdated.toLocaleString('en-GB')}`
          : 'Loading data…'}
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deeper analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            The numbers above come straight from our own database. For device breakdown,
            geography, ad attribution and full funnel reports, use the platforms below.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm">
                Google Analytics 4 <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </a>
            <a
              href="https://ads.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm">
                Google Ads <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </a>
            <a
              href="https://business.facebook.com/events_manager"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm">
                Meta Events Manager <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalytics;
