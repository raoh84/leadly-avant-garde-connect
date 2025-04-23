
import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Edit, Phone, User } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

const countries = [
  { value: "ca", label: "Canada" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "in", label: "India" },
  // Add more countries as needed
];

const countryDialCodes = {
  ca: "+1",
  us: "+1",
  uk: "+44",
  au: "+61",
  in: "+91",
  // Add more country codes as needed
};

const formSchema = z.object({
  full_name: z.string().min(1, { message: "Name is required" }),
  phoneCountry: z.string(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  whatsappCountry: z.string(),
  whatsapp: z.string().min(1, { message: "WhatsApp number is required" }),
  email: z.string().email().min(1),
  company: z.string().optional(),
  country: z.string().min(1, { message: "Country is required" }),
});

type ProfileFormValues = z.infer<typeof formSchema>;

interface ProfileEditorProps {
  profile: any;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile.avatar_url);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Parse profile metadata for form defaults
  const userMeta = profile?.metadata || {};
  const phoneData = userMeta.phone || {};
  const whatsappData = userMeta.whatsapp || {};

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: profile.full_name || "",
      phoneCountry: phoneData.country || "ca",
      phone: phoneData.number || "",
      whatsappCountry: whatsappData.country || "ca",
      whatsapp: whatsappData.number || "",
      email: profile.email || "",
      company: profile.company || "",
      country: userMeta.country || "ca",
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      // Get a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // For demonstration, we're just setting the URL preview. In a real app,
      // you would upload the file to Supabase Storage or another service
      const objectUrl = URL.createObjectURL(file);
      setAvatarUrl(objectUrl);
      
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated successfully."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message,
      });
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      // Prepare the updated profile data
      const updatedProfile = {
        full_name: data.full_name,
        company: data.company || null,
        avatar_url: avatarUrl,
        metadata: {
          ...profile.metadata,
          country: data.country,
          phone: {
            country: data.phoneCountry,
            number: data.phone,
            full: `${countryDialCodes[data.phoneCountry as keyof typeof countryDialCodes]}${data.phone}`
          },
          whatsapp: {
            country: data.whatsappCountry,
            number: data.whatsapp,
            full: `${countryDialCodes[data.whatsappCountry as keyof typeof countryDialCodes]}${data.whatsapp}`
          }
        }
      };

      // Update the profile record in Supabase
      const { error } = await supabase
        .from('profiles')
        .update(updatedProfile)
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 mb-6">
              <div className="relative">
                <Avatar className="w-24 h-24 border-2 border-gray-200">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt={profile.full_name} />
                  ) : (
                    <AvatarFallback className="text-xl bg-leadly-soft-purple text-leadly-purple">
                      {getInitials(profile.full_name || "User")}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8 bg-white"
                  onClick={handleAvatarClick}
                >
                  <Edit className="w-4 h-4" />
                  <span className="sr-only">Change profile photo</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-900">Profile Picture</h3>
                <p className="text-sm text-gray-500">Upload a clear photo to personalize your account</p>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleAvatarClick}
                >
                  Change Photo
                </Button>
              </div>
            </div>

            {/* Full Name */}
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input {...field} placeholder="Your full name" className="pl-10" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Select
                        value={form.watch('phoneCountry')}
                        onValueChange={(value) => form.setValue('phoneCountry', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label} ({countryDialCodes[country.value as keyof typeof countryDialCodes]})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input {...field} placeholder="Phone number" className="pl-10" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* WhatsApp Number */}
            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Select
                        value={form.watch('whatsappCountry')}
                        onValueChange={(value) => form.setValue('whatsappCountry', value)}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label} ({countryDialCodes[country.value as keyof typeof countryDialCodes]})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input {...field} placeholder="WhatsApp number" className="pl-10" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className="bg-gray-100" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Name */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your company name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-leadly-purple hover:bg-leadly-dark-purple"
              >
                {isSubmitting ? "Saving..." : "SAVE"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileEditor;
