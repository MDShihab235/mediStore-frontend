import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-primary">MediStore</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Your trusted online pharmacy for safe, authentic, and affordable
              medicines.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/medicines" className="hover:text-primary">
                  Medicines
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                support@medistore.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +880 1234-567890
              </li>
              <li className="flex gap-4 pt-2">
                <Facebook className="h-5 w-5 cursor-pointer hover:text-primary" />
                <Twitter className="h-5 w-5 cursor-pointer hover:text-primary" />
                <Instagram className="h-5 w-5 cursor-pointer hover:text-primary" />
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-2 text-center text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} MediStore. All rights reserved.</p>
          <p>Built with ❤️ for safe healthcare</p>
        </div>
      </div>
    </footer>
  );
}
