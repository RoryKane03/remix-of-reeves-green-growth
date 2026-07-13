import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Counts {
  phone7: number;
  phone30: number;
  email7: number;
  email30: number;
}

const ClickTrackingCard = () => {
  const [counts, setCounts] = useState<Counts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const now = Date.now();
      const d7 = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
      const d30 = new Date(now - 30 * 24 * 60 * 60 * 1000).toISOString();

      const countFor = async (table: 'phone_clicks' | 'email_clicks', since: string) => {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
          .gte('created_at', since);
        if (error) return 0;
        return count ?? 0;
      };

      const [phone7, phone30, email7, email30] = await Promise.all([
        countFor('phone_clicks', d7),
        countFor('phone_clicks', d30),
        countFor('email_clicks', d7),
        countFor('email_clicks', d30),
      ]);

      setCounts({ phone7, phone30, email7, email30 });
      setLoading(false);
    };

    load();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Click Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        {loading || !counts ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : (
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="font-medium text-muted-foreground">Action</div>
            <div className="font-medium text-muted-foreground text-right">Last 7 days</div>
            <div className="font-medium text-muted-foreground text-right">Last 30 days</div>

            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-forest-600" />
              <span>Phone clicks</span>
            </div>
            <div className="text-right font-semibold">{counts.phone7}</div>
            <div className="text-right font-semibold">{counts.phone30}</div>

            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-forest-600" />
              <span>Email clicks</span>
            </div>
            <div className="text-right font-semibold">{counts.email7}</div>
            <div className="text-right font-semibold">{counts.email30}</div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClickTrackingCard;
