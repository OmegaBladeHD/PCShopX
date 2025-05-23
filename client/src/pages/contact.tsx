import { useState } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

// Validation schema for contact form
const contactFormSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom est requis" }),
  lastName: z.string().min(2, { message: "Le nom est requis" }),
  email: z.string().email({ message: "L'email n'est pas valide" }),
  subject: z.string().min(1, { message: "Le sujet est requis" }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type FaqItem = {
  question: string;
  answer: string;
  isOpen: boolean;
};

export default function Contact() {
  const { toast } = useToast();
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Les commandes sont généralement expédiées sous 24 à 48h. Le délai de livraison est de 2 à 5 jours ouvrés selon votre localisation et le mode de livraison choisi.",
      isOpen: false
    },
    {
      question: "Comment puis-je suivre ma commande ?",
      answer: "Une fois votre commande expédiée, vous recevrez un email contenant un numéro de suivi vous permettant de suivre votre colis. Vous pouvez également consulter l'état de votre commande dans votre espace client.",
      isOpen: false
    },
    {
      question: "Quelle est la durée de garantie ?",
      answer: "Tous nos ordinateurs sont garantis 2 ans pièces et main d'œuvre. Les PC configurés sur mesure bénéficient d'une garantie complète de 3 ans. La garantie est valable à partir de la date de livraison.",
      isOpen: false
    },
    {
      question: "Comment puis-je retourner un produit ?",
      answer: "Vous disposez d'un délai de 14 jours à compter de la réception de votre commande pour effectuer un retour. Pour initier un retour, connectez-vous à votre compte client et suivez la procédure indiquée, ou contactez notre service client.",
      isOpen: false
    }
  ]);

  // Initialize form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "Question sur un produit",
      message: ""
    }
  });

  const toggleFaqItem = (index: number) => {
    setFaqItems(prev => 
      prev.map((item, i) => i === index ? {...item, isOpen: !item.isOpen} : item)
    );
  };

  const onSubmit = (data: ContactFormValues) => {
    // Here we would send the form data to the server
    console.log(data);
    
    toast({
      title: "Message envoyé",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    // Reset form
    form.reset();
  };

  return (
    <div className="py-6">
      <PageTitle title="Contactez-nous / FAQ" />
      
      <div className="max-w-3xl mx-auto">
        {/* FAQ section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="font-poppins font-semibold text-xl mb-6 text-gray-900 dark:text-white">Questions fréquentes</h2>
            
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <button 
                    className="flex justify-between items-center w-full text-left font-medium text-gray-900 dark:text-white"
                    onClick={() => toggleFaqItem(index)}
                  >
                    <span>{item.question}</span>
                    {item.isOpen ? 
                      <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" /> : 
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    }
                  </button>
                  {item.isOpen && (
                    <div className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Contact form */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="font-poppins font-semibold text-xl mb-6 text-gray-900 dark:text-white">Contactez-nous</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Question sur un produit">Question sur un produit</SelectItem>
                          <SelectItem value="Service après-vente">Service après-vente</SelectItem>
                          <SelectItem value="Réclamation">Réclamation</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Envoyer
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
