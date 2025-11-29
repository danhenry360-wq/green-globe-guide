import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Legal Disclaimer | BudQuest</title>
        <meta name="description" content="Legal disclaimer for BudQuest - Important information about the use of our cannabis travel guide and legal information." />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
            Legal Disclaimer
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Last Updated: November 29, 2025
          </p>

          <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Important Notice</h2>
                <p className="text-muted-foreground">
                  The information provided on BudQuest is for general informational and educational purposes only. It is not intended as legal advice and should not be relied upon as such. Always consult with qualified legal professionals and verify current laws before making any decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. No Legal Advice</h2>
              <p className="text-muted-foreground leading-relaxed">
                BudQuest provides general information about cannabis laws, regulations, and travel considerations in various jurisdictions. This information does not constitute legal advice, nor does it create an attorney-client relationship. The content on this website should not be used as a substitute for professional legal counsel. Laws regarding cannabis vary significantly between jurisdictions and change frequently. You should always consult with a licensed attorney in the relevant jurisdiction for advice on specific legal matters.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Accuracy of Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive to provide accurate and up-to-date information, BudQuest makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on this website. Cannabis laws are complex and subject to frequent changes at local, state, national, and international levels. The information presented may not reflect the most current legal developments.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We strongly recommend that you independently verify all information, especially before traveling or making decisions based on the content provided. Any reliance you place on such information is strictly at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. No Endorsement of Illegal Activities</h2>
              <p className="text-muted-foreground leading-relaxed">
                BudQuest does not encourage, promote, endorse, or facilitate any illegal activity. The purpose of this website is to provide informational resources about cannabis laws and regulations. Users are solely responsible for ensuring their compliance with all applicable laws in their jurisdiction. The presence of information about cannabis laws in a particular location does not imply that cannabis use is legal or advisable in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Content and Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites, businesses, or services for your convenience. BudQuest does not control, endorse, or assume responsibility for the content, products, services, or practices of any third-party websites or businesses. Inclusion of any third-party link does not imply endorsement or recommendation. Your use of third-party websites is at your own risk and subject to the terms and conditions of those websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User Responsibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You are solely responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-2">
                <li>Verifying the accuracy and applicability of any information before acting upon it</li>
                <li>Understanding and complying with all applicable laws in your jurisdiction</li>
                <li>Seeking professional legal advice when necessary</li>
                <li>Making informed decisions based on your own research and due diligence</li>
                <li>Any consequences arising from your use of information from this website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BUDQUEST AND ITS OWNERS, OPERATORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THIS WEBSITE OR ANY INFORMATION CONTAINED HEREIN, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This limitation applies regardless of whether such damages are based on contract, tort (including negligence), strict liability, or any other legal theory, and whether or not BudQuest has been advised of the possibility of such damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless BudQuest and its owners, operators, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising from or related to your use of this website, your violation of this disclaimer, or your violation of any applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Changes to This Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                BudQuest reserves the right to modify this disclaimer at any time without prior notice. Changes will be effective immediately upon posting to this website. Your continued use of the website following any changes constitutes your acceptance of the revised disclaimer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this disclaimer, please contact us at:
              </p>
              <p className="text-muted-foreground mt-2">
                <strong className="text-foreground">BudQuest</strong><br />
                Email: legal@budquest.com
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Disclaimer;
