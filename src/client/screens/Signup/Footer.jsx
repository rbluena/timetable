import Link from 'next/link';

const Footer = () => (
  <div className="max-w-xs border-t border-neutral-400">
    <p className="text-xs font-light text-center">
      By creating an account, you are agreeing to our&nbsp;
      <Link href="/terms" className="font-normal">
        Terms of Service
      </Link>{' '}
      and <Link href="/privacy">Privacy Policy</Link>.
    </p>
    <br />
    <div className="text-center">
      <p className="text-sm mb-2">Already have an account?</p>
      <Link href="/signin" className="font-semibold">
        Sign in
      </Link>
    </div>
  </div>
);

export default Footer;
