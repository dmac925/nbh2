'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">New Build Homes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Main Navigation */}
            <Link 
              href="/for-sale" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              For Sale
            </Link>
            <Link 
              href="/shared-ownership" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Shared Ownership
            </Link>
            <Link 
              href="/to-rent" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              To Rent
            </Link>

            {/* Secondary Navigation */}
            <Link 
              href="/developers" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Developers
            </Link>
            <Link 
              href="/blog" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Blog
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/for-sale"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                For Sale
              </Link>
              <Link 
                href="/shared-ownership"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shared Ownership
              </Link>
              <Link 
                href="/to-rent"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                To Rent
              </Link>
              <Link 
                href="/developers"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Developers
              </Link>
              <Link 
                href="/blog"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}