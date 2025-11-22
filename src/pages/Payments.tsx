import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { ArrowLeft, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export default function Payments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, [profile?.id]);

  const fetchPayments = async () => {
    if (!profile?.id) return;

    const { data } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', profile.id)
      .order('month', { ascending: false });

    setPayments(data || []);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pt-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Payments & Invoices</h1>
            <p className="text-sm text-muted-foreground">
              Your payment history
            </p>
          </div>
        </div>

        {/* Payments List */}
        {payments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No payment records yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {payments.map((payment) => (
              <Card key={payment.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-lg">{payment.month}</p>
                      <p className="text-2xl font-bold text-primary">
                        ${parseFloat(payment.amount).toFixed(2)}
                      </p>
                    </div>
                    <StatusBadge status={payment.status} />
                  </div>
                  {payment.invoice_url && (
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => window.open(payment.invoice_url, '_blank')}
                    >
                      View Invoice
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
