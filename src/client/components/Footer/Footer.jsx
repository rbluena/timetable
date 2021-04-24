import { format } from 'date-fns';
import Link from 'next/link';

const Footer = () => (
  <div className="max-w-7xl mx-auto text-center py-12">
    <div className="">
      <ul className="space-x-2">
        <li className="inline-block text-base underline">
          <Link href="/privacy">Privacy</Link>
        </li>
        <li className="inline-block text-base underline">
          <Link href="/terms">Terms</Link>
        </li>
        <li className="inline-block text-base underline">
          <Link href="https://discord.gg/guR7hYb9fH">Join Discord</Link>
        </li>
      </ul>
    </div>
    <p>
      <span className="font-secondary inline-block tracking-wide text-xl font-bold text-primary-600">
        asteyo&nbsp;
      </span>
      © Copyright {format(new Date(), 'yyyy')}. All rights reserved.
    </p>
  </div>
);

export default Footer;
