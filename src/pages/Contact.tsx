import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageSquare, AlertCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">Contact Us</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a question, suggestion, or want to report outdated information? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <Mail className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Email Us</h3>
              <p className="text-sm text-muted-foreground">support@greenglobe.com</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <MessageSquare className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9am-5pm EST</p>
            </Card>
            <Card className="p-6 bg-gradient-card border-border/50 text-center">
              <AlertCircle className="w-10 h-10 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-foreground mb-2">Report Issue</h3>
              <p className="text-sm text-muted-foreground">Help us stay accurate</p>
            </Card>
          </div>

          <Card className="p-8 md:p-12 bg-gradient-card border-border/50">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="bg-card border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-card border-border"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  placeholder="What's this about?" 
                  className="bg-card border-border"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Tell us more..." 
                  rows={6}
                  className="bg-card border-border resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
              >
                Send Message
              </Button>
            </form>
          </Card>

          <Card className="mt-8 p-6 bg-accent/5 border-accent/20">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Please note:</strong> We are an informational resource and do not provide 
              legal advice. For legal questions, please consult with a qualified attorney in your jurisdiction.
            </p>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
