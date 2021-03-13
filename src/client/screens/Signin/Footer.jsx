import Link from 'next/link';

const Footer = () => (
  <div className="max-w-sm">
    <br />
    <div className="text-center">
      <p className="text-sm mb-2">Don&apos;t have an account?</p>
      <Link href="/signup" className="font-semibold">
        Create account
      </Link>
    </div>
  </div>
);

export default Footer;
