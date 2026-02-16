import { Link } from 'react-router';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last Updated: February 16, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-card border border-cyan-500/20 rounded-2xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <FileText className="w-6 h-6 text-cyan-500" />
              Introduction
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Black Viral AC ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. By accessing or using our services, you agree to this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                <p className="leading-relaxed">
                  We may collect personal information that you voluntarily provide when registering for courses, including:
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                  <li>Full name and date of birth</li>
                  <li>Email address and phone number</li>
                  <li>Physical address and Emirates ID</li>
                  <li>Payment information</li>
                  <li>Medical information relevant to training programs</li>
                  <li>Emergency contact details</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Usage Data</h3>
                <p className="leading-relaxed">
                  We automatically collect certain information when you visit our website, including IP address, browser type, pages visited, and time spent on pages.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Eye className="w-6 h-6 text-cyan-500" />
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>To process course registrations and manage your account</li>
              <li>To provide and maintain our training services</li>
              <li>To communicate with you about courses, schedules, and updates</li>
              <li>To process payments and prevent fraudulent transactions</li>
              <li>To ensure safety during training activities</li>
              <li>To comply with UAE legal and regulatory requirements</li>
              <li>To improve our services and develop new programs</li>
              <li>To send promotional materials (with your consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Protection and Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Encryption of sensitive data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication measures</li>
              <li>Secure payment processing through certified providers</li>
              <li>Staff training on data protection practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Information Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We may share your information with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li><strong>International Certification Bodies:</strong> IWSF, ILS, NEAMT, CMAS, and European Commissions for certification purposes</li>
              <li><strong>Service Providers:</strong> Payment processors, email service providers, and hosting services</li>
              <li><strong>Business Partners:</strong> Leejam Sports Company, Fitness Time, Future Champions Academy when relevant to your training</li>
              <li><strong>Legal Authorities:</strong> When required by UAE law or to protect our rights</li>
              <li><strong>Medical Professionals:</strong> In case of emergencies during training</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6 text-cyan-500" />
              Your Rights Under UAE Law
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Under UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Access your personal information we hold</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data (subject to legal obligations)</li>
              <li>Object to processing of your personal data</li>
              <li>Withdraw consent for marketing communications</li>
              <li>Lodge a complaint with the UAE Data Protection Office</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Training and certification records are maintained for a minimum of 7 years as required by international sports federation standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are available to minors under 18 with parental or guardian consent. We require guardian information and consent forms for all participants under 18 years of age. Parents have the right to access, correct, or delete their child's information at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings. Essential cookies required for site functionality cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries outside the UAE for certification purposes. We ensure appropriate safeguards are in place to protect your data in accordance with UAE law and international standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section className="pt-6 border-t border-cyan-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-500" />
              Contact Us
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 space-y-2">
              <p className="text-foreground"><strong>Black Viral AC</strong></p>
              <p className="text-muted-foreground">Email: privacy@blackviral.club</p>
              <p className="text-muted-foreground">Phone: +971 56 848 8141</p>
              <p className="text-muted-foreground">Location: United Arab Emirates</p>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
