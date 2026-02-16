import { Link } from 'react-router';
import { FileCheck, Scale, AlertCircle, UserCheck, Award, Mail } from 'lucide-react';

export function TermsOfService() {
  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-6">
            <FileCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last Updated: February 16, 2026</p>
        </div>

        {/* Content */}
        <div className="bg-card border border-cyan-500/20 rounded-2xl p-8 md:p-12 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Scale className="w-6 h-6 text-cyan-500" />
              Agreement to Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms of Service ("Terms") constitute a legally binding agreement between you and Black Viral AC ("Company," "we," "our," or "us") regarding your use of our website, training programs, and services. By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Eligibility and Registration</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                To use our services, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years old, or have parental/guardian consent if under 18</li>
                <li>Provide accurate, complete, and current registration information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Be physically and medically fit for the training programs you enroll in</li>
                <li>Possess valid identification and residency status in the UAE</li>
              </ul>
              <p className="leading-relaxed mt-4">
                We reserve the right to refuse service, terminate accounts, or cancel registrations at our discretion, particularly if you violate these Terms or provide false information.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Award className="w-6 h-6 text-cyan-500" />
              Training Programs and Services
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <h3 className="text-lg font-semibold text-foreground">Program Offerings</h3>
              <p className="leading-relaxed">
                We provide training in aquatic sports, combat sports, team sports, gymnastics, first aid, rescue services, and related certifications. Program details, schedules, and availability are subject to change.
              </p>

              <h3 className="text-lg font-semibold text-foreground mt-6">Prerequisites and Requirements</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Certain programs require medical clearance or fitness assessments</li>
                <li>Swimming programs may require baseline swimming ability</li>
                <li>Combat sports require protective equipment and adherence to safety protocols</li>
                <li>Certification programs have specific attendance and performance requirements</li>
              </ul>

              <h3 className="text-lg font-semibold text-foreground mt-6">Attendance and Participation</h3>
              <p className="leading-relaxed">
                Regular attendance is required. Excessive absences may result in program dismissal without refund. You must actively participate, follow instructor guidance, and respect other participants.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Payment Terms</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <strong>Fees:</strong> All fees are listed in AED (UAE Dirhams) and are non-negotiable unless otherwise stated. Prices may change with 30 days' notice.
              </p>
              <p className="leading-relaxed">
                <strong>Payment:</strong> Payment is due at registration unless installment plans are agreed upon. We accept cash, credit cards, bank transfers, and approved payment methods.
              </p>
              <p className="leading-relaxed">
                <strong>Refund Policy:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Full refund if cancelled 14+ days before program start</li>
                <li>50% refund if cancelled 7-13 days before program start</li>
                <li>No refund if cancelled less than 7 days before start or after program begins</li>
                <li>Medical emergencies may be considered on a case-by-case basis with documentation</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-cyan-500" />
              Assumption of Risk and Liability
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">Inherent Risks:</strong> Sports training involves physical activity and carries inherent risks of injury, including but not limited to strains, sprains, fractures, drowning (in aquatic activities), and concussions (in combat sports).
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Voluntary Participation:</strong> You voluntarily assume all risks associated with participation and acknowledge that you are physically and mentally capable of participating.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Release of Liability:</strong> To the fullest extent permitted by UAE law, you release Black Viral AC, its affiliates, instructors, and partners from liability for any injury, loss, or damage arising from your participation, except in cases of gross negligence or willful misconduct.
              </p>
              <p className="leading-relaxed">
                <strong className="text-foreground">Insurance:</strong> We maintain appropriate liability insurance. You are responsible for your own health and accident insurance coverage.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Medical Information and Emergencies</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                You must disclose any medical conditions, allergies, or physical limitations that may affect your participation. In case of medical emergency, you authorize us to seek emergency medical treatment on your behalf and agree to be responsible for associated costs.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-cyan-500" />
              Code of Conduct
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              All participants must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
              <li>Treat instructors, staff, and fellow participants with respect</li>
              <li>Follow all safety rules and instructor directions</li>
              <li>Arrive on time with appropriate attire and equipment</li>
              <li>Refrain from violence, harassment, discrimination, or disruptive behavior</li>
              <li>Not be under the influence of alcohol or drugs during training</li>
              <li>Respect facility property and equipment</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Violation of our code of conduct may result in immediate dismissal from programs without refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All content, materials, logos, and course curricula are the intellectual property of Black Viral AC and our licensors. You may not reproduce, distribute, or create derivative works without written permission. Certifications and credentials issued by us or partner organizations remain their property and may be revoked for misconduct.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Photography and Media Release</h2>
            <p className="text-muted-foreground leading-relaxed">
              By participating in our programs, you consent to being photographed or recorded during training sessions for promotional, educational, and marketing purposes. If you do not consent, you must notify us in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Certifications and Credentials</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="leading-relaxed">
                Certifications are issued upon successful completion of program requirements and assessments. Certifications from international bodies (IWSF, ILS, CMAS, NEAMT, European Commissions) are subject to their respective standards and may require additional fees.
              </p>
              <p className="leading-relaxed">
                Certificates may be revoked if obtained fraudulently or if you violate professional standards after certification.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law and Jurisdiction</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms are governed by the laws of the United Arab Emirates. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of the UAE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Force Majeure</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are not liable for failure to perform obligations due to circumstances beyond our control, including natural disasters, government actions, pandemics, facility closures, or other force majeure events. In such cases, we will make reasonable efforts to reschedule or provide alternative arrangements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Modifications to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Changes will be posted on our website with an updated "Last Updated" date. Continued use of our services after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Severability</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section className="pt-6 border-t border-cyan-500/20">
            <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Mail className="w-6 h-6 text-cyan-500" />
              Contact Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-6 space-y-2">
              <p className="text-foreground"><strong>Black Viral AC</strong></p>
              <p className="text-muted-foreground">Email: admin@blackviral.club</p>
              <p className="text-muted-foreground">Phone: +971 56 848 8141</p>
              <p className="text-muted-foreground">Location: United Arab Emirates</p>
            </div>
          </section>

          <section className="mt-8 p-6 bg-cyan-500/5 border border-cyan-500/30 rounded-xl">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Acknowledgment:</strong> By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our Privacy Policy.
            </p>
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
