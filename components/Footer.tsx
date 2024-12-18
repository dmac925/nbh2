import Link from 'next/link';


export function Footer() {
    return (
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">New Build Homes</h3>
              <p className="text-sm text-muted-foreground">
                Discover your perfect new build home across the UK
              </p>
            </div>
  
            <div className="space-y-3">
              <h4 className="font-medium">Properties</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/for-sale" className="text-sm text-muted-foreground hover:text-primary">
                    For Sale
                  </Link>
                </li>
                <li>
                  <Link href="/shared-ownership" className="text-sm text-muted-foreground hover:text-primary">
                    Shared Ownership
                  </Link>
                </li>
                <li>
                  <Link href="/to-rent" className="text-sm text-muted-foreground hover:text-primary">
                    To Rent
                  </Link>
                </li>
              </ul>
            </div>
  
            <div className="space-y-3">
              <h4 className="font-medium">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/developers" className="text-sm text-muted-foreground hover:text-primary">
                    Developers
                  </Link>
                </li>
              </ul>
            </div>
  
            <div className="space-y-3">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} New Build Homes. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }