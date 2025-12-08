import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | BudQuest</title>
        <meta name="description" content="Privacy Policy for BudQuest - Learn how we collect, use, and protect your personal information." />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Last Updated: December 8, 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                BudQuest ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this policy carefully. By using BudQuest, you consent to the data practices described in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">2.1 Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may collect personal information that you voluntarily provide when using our Service, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Email address (when creating an account or contacting us)</li>
                <li>Username or display name</li>
                <li>Profile information you choose to provide</li>
                <li>Reviews and comments you submit</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">2.2 Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you access our Service, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Device information (browser type, operating system, device identifiers)</li>
                <li>IP address and approximate geographic location</li>
                <li>Pages visited and time spent on our Service</li>
                <li>Referring website or source</li>
                <li>Clickstream data and browsing patterns</li>
              </ul>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">2.3 Cookies and Tracking Technologies</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can control cookie preferences through your browser settings, though some features may not function properly without cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>To provide, maintain, and improve our Service</li>
                <li>To create and manage your account</li>
                <li>To process and moderate user-generated content</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send administrative information and service updates</li>
                <li>To personalize your experience and deliver relevant content</li>
                <li>To analyze usage trends and optimize our Service</li>
                <li>To detect, prevent, and address technical issues or fraudulent activity</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. We may share your information in the following circumstances:
              </p>
              
              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">4.1 Service Providers</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may share information with third-party vendors and service providers who perform services on our behalf, such as hosting, analytics, email delivery, and customer support.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">4.2 Legal Requirements</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may disclose your information if required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">4.3 Business Transfers</h3>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
              </p>

              <h3 className="text-xl font-medium text-foreground mb-3 mt-6">4.4 Public Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Any content you post publicly on our Service (such as reviews or comments) may be visible to other users and the public.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When your information is no longer needed, we will securely delete or anonymize it.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Your Rights and Choices</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li><strong className="text-foreground">Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal information</li>
                <li><strong className="text-foreground">Portability:</strong> Request transfer of your data in a structured format</li>
                <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong className="text-foreground">Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. California Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to request deletion, and the right to opt-out of the sale of personal information. We do not sell personal information as defined under the CCPA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from your country. By using our Service, you consent to the transfer of your information to the United States and other jurisdictions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                BudQuest is not intended for individuals under 21 years of age. We do not knowingly collect personal information from anyone under 21. If we become aware that we have collected personal information from someone under 21, we will take steps to delete that information immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of the Service after such modifications constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                <strong className="text-foreground">BudQuest</strong><br />
                Email: legal@budquest.guide
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
