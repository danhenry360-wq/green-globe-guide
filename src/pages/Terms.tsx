import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service | BudQuest</title>
        <meta name="description" content="Terms of Service for BudQuest - Your trusted cannabis travel guide. Read our terms and conditions for using our services." />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-foreground via-accent to-gold bg-clip-text text-transparent">
            Terms of Service
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Last Updated: November 29, 2025
          </p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using BudQuest ("Website," "Service," "we," "us," or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any modifications.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Age Requirement</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 21 years of age to access and use BudQuest. By using this Service, you represent and warrant that you are at least 21 years old. We reserve the right to terminate your access if we have reason to believe you do not meet this age requirement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Informational Purposes Only</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content provided on BudQuest is for informational and educational purposes only. The information on this Website does not constitute legal advice, and we do not guarantee the accuracy, completeness, or timeliness of any information provided. Cannabis laws vary significantly by jurisdiction and are subject to change. You are solely responsible for verifying the current laws and regulations in any location you plan to visit or reside.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. No Endorsement of Illegal Activity</h2>
              <p className="text-muted-foreground leading-relaxed">
                BudQuest does not encourage, promote, or facilitate any illegal activity. Our Service provides information about cannabis laws and regulations in various jurisdictions. Users are responsible for complying with all applicable local, state, national, and international laws. We explicitly discourage any illegal purchase, possession, transportation, or consumption of cannabis.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account with BudQuest, you agree to provide accurate, current, and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. User-Generated Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                Users may submit reviews, comments, and other content ("User Content") to our Service. By submitting User Content, you grant BudQuest a non-exclusive, royalty-free, perpetual, and worldwide license to use, modify, display, and distribute such content. You represent that you own or have the necessary rights to submit such content and that it does not violate any third-party rights or applicable laws.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We reserve the right to moderate, edit, or remove any User Content that violates these Terms, contains false information, is defamatory, or is otherwise objectionable. All reviews are subject to our moderation process before publication.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality of BudQuest, including but not limited to text, graphics, logos, icons, images, audio clips, data compilations, and software, are the exclusive property of BudQuest or its licensors and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Links and Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Service may contain links to third-party websites, services, or businesses (including dispensaries, hotels, and tour operators). These links are provided for your convenience only. BudQuest does not endorse, guarantee, or assume responsibility for the content, products, services, or practices of any third party. Your interactions with third parties are solely between you and such third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS WILL BE CORRECTED.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                TO THE FULLEST EXTENT PERMITTED BY LAW, BUDQUEST AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE, REGARDLESS OF WHETHER SUCH DAMAGES ARE BASED ON CONTRACT, TORT, STRICT LIABILITY, OR ANY OTHER LEGAL THEORY.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to indemnify, defend, and hold harmless BudQuest and its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Service, your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved exclusively in the state or federal courts located within the United States.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">13. Severability</h2>
              <p className="text-muted-foreground leading-relaxed">
                If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">14. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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

export default Terms;
