import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-foreground">
          <p>Welcome to EVE BLUE. By accessing or using our concierge services platform, you agree to be bound by these Terms of Service.</p>

          <h2>1. Services</h2>
          <p>EVE BLUE provides luxury concierge services including, but not limited to, restaurant reservations, yacht charters, hotel bookings, transportation arrangements, event planning, and lifestyle experiences in Dubai and surrounding areas.</p>

          <h2>2. Eligibility</h2>
          <p>You must be at least 18 years old and capable of forming a binding contract to use our services. By creating an account, you represent that all information provided is accurate and complete.</p>

          <h2>3. Account Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You agree to notify us immediately of any unauthorized access</li>
            <li>You are responsible for all activities under your account</li>
          </ul>

          <h2>4. Bookings and Reservations</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>All bookings are subject to availability and confirmation by the respective service provider</li>
            <li>Prices displayed are indicative and may vary based on dates, availability, and specific requirements</li>
            <li>Cancellation policies vary by service provider; specific terms will be communicated at the time of booking</li>
            <li>We act as an intermediary between you and service providers; final terms are between you and the provider</li>
          </ul>

          <h2>5. Payments</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Payments are processed securely through our platform</li>
            <li>Deposits may be required for certain services</li>
            <li>All prices are in AED (UAE Dirham) unless otherwise specified</li>
            <li>Refund policies are governed by individual service provider terms</li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>EVE BLUE acts as a concierge intermediary. While we strive to ensure the highest quality of service:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>We are not liable for the quality or safety of third-party services</li>
            <li>Our liability is limited to the fees paid directly to EVE BLUE</li>
            <li>We are not responsible for force majeure events, including weather, political situations, or pandemics</li>
          </ul>

          <h2>7. Intellectual Property</h2>
          <p>All content on our platform — including logos, designs, text, and images — is the property of EVE BLUE and protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.</p>

          <h2>8. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use our services for any illegal purpose</li>
            <li>Provide false or misleading information</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Interfere with the platform's operation or other users' experiences</li>
          </ul>

          <h2>9. Termination</h2>
          <p>We reserve the right to suspend or terminate your account if you violate these terms or engage in conduct that we deem harmful to our platform or other users.</p>

          <h2>10. Governing Law</h2>
          <p>These Terms are governed by the laws of the United Arab Emirates. Any disputes shall be resolved through the courts of Dubai, UAE.</p>

          <h2>11. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms.</p>

          <h2>12. Contact</h2>
          <p>For questions about these Terms:</p>
          <ul className="list-none space-y-1">
            <li>📧 Email: <a href="mailto:legal@evebleu.vip" className="text-primary hover:underline">legal@evebleu.vip</a></li>
            <li>📞 Phone: +971 55 152 3121</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
